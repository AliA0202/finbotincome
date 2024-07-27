from django.shortcuts import render, HttpResponse
from django.views.generic import View
from telegram.models import TelegramProfile, VipAccountAmount, BotConfig
from .models import Invoice
import requests, json
import datetime
from datetime import timedelta
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
# Create your views here.
class BotVerifyPayment(View):
    def get(self, request):
        try:
            status = request.GET.get('Status')

            authority = request.GET.get('Authority')
            bc = BotConfig.objects.last()

            try:
                bot_username = bc.username
                bot_token = bc.token
            except:
                bot_username, bot_token = ""

            bot_url = f"https://t.me/{bot_username}"

            if status == "OK":
                try:
                    invoice = Invoice.objects.get(authority=authority)
                except:
                    return HttpResponse(content="سفارشی با این کد رهگیری پیدا نشد! در صورت پرداخت از طریق ربات، این موضوع را با پشتیبانی در میان بگذارید")


                if invoice.status != "Active":
                    return HttpResponse(content="کد نامعتبر")


                invoice.status = "Paid"
                telegram_id = invoice.telegram_profile.telegram_id
                
                try:
                    account_detail = VipAccountAmount.objects.last()
                    if account_detail.expired:
                        expired = invoice.created_at + timedelta(int(account_detail.expired))
                        invoice.expired_at = expired
                except:
                    pass

                invoice.save()
                msg_id = invoice.msg_id

                tele_account = TelegramProfile.objects.get(telegram_id=telegram_id)
                tele_account.access_level = "Allowed"
                tele_account.save()
                success_message = "پرداخت شما موفقیت آمیز بود، برای شروع استفاده از سرویس ها از گزینه های زیر دستور منو را انتخاب کنید"

                data = {
                    "chat_id" : telegram_id,
                    "text" : success_message
                }

                delete_data = {
                    "chat_id" : telegram_id,
                    "message_id" : msg_id,
                }

                data = json.dumps(data)
                delete_data = json.dumps(delete_data)

                headers = {
                    "Content-Type": "application/json"
                }

                update_url = f"https://api.telegram.org/bot{bot_token}/getUpdates"
                url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
                delete_url = f"https://api.telegram.org/bot{bot_token}/deleteMessage"


                requests.post(url=url, data=data, headers=headers)
                requests.post(url=update_url)
                requests.post(url=delete_url, data=delete_data, headers=headers)
            
            context = {
                'status' : status,
                'url' : bot_url
            }

            return render(request, "payment/verify.html", context=context)
        except:
            return HttpResponse(content="خطایی رخ داد!")

class VerifyPayment(APIView):
    permissions_classes = [IsAuthenticated]

    def get(self, request):
        try:
            status = request.GET.get('Status')

            authority = request.GET.get('Authority')

            if status == "OK":
                try:
                    invoice = Invoice.objects.get(authority=authority)
                except:
                    return Response({"error" : "سفارشی با این کد رهگیری پیدا نشد! در صورت پرداخت از طریق ربات، این موضوع را با پشتیبانی در میان بگذارید"}, status=404)


                if invoice.status != "Active":
                    return Response({"error" : "کد نامعتبر"}, status=400)


                invoice.status = "Paid"
                
                try:
                    account_detail = VipAccountAmount.objects.last()
                    if account_detail.expired:
                        expired = invoice.created_at + timedelta(int(account_detail.expired))
                        invoice.expired_at = expired
                except:
                    pass
                
                invoice.save()
                user = invoice.user
                user.user_type = "V"
                user.save()
                success_message = "پرداخت شما موفقیت آمیز بود. اکنون میتوانید از تمامی امکانات وبسایت استفاده کنید"

                return Response({"success" : success_message}, status=200)
            
            return Response({"error" : "خطایی رخ داد"}, status=500)
        except:
            return Response({"error" : "خطایی رخ داد" } ,status=500)

class GetAuthority(APIView):
    permissions_classes = [IsAuthenticated]

    def get(self, request, description: str = "Fin Bot Income, VIP Account", mobile: str = "NaN", email: str = "NaN", order_id : str = ""):
        try:
            amount = VipAccountAmount.objects.latest().amount
        except:
            amount = 10000

        data = {
            "merchant_id" : "03418ead-550f-43e3-ae3a-37f4d9d85a2a",
            "amount" : amount,
            "description" : description,
            "callback_url" : 'http://127.0.0.1:1337/payment/verify/',
            "metadata" : {
                "mobile" : mobile,
                "email" : email,
            },
            "order_id" : order_id
        }

        data = json.dumps(data)
        headers = {
            "Content-Type": "application/json",
            "Accept" : "application/json"
        }

        url = "https://api.zarinpal.com/pg/v4/payment/request.json"
        result = requests.post(url=url, headers=headers, data=data)

        print(result)

        if result.status_code == 200:
            result = result.json()
    
        print(result)
        #If is request is not valid
        try:
            if result['data']['code'] != 100:
                return Response({"error" : "مشکلی در ارتباط با درگاه پرداخت بوجود آمد. لطفا دوباره امتحان کنید و درصورت تکرار آن، این موضوع را به پشتیبانی اطلاع دهید"}, status=503)
        except:
            return Response({"error" : "مشکلی در ارتباط با درگاه پرداخت بوجود آمد. لطفا دوباره امتحان کنید و درصورت تکرار آن، این موضوع را به پشتیبانی اطلاع دهید"}, status=503)

        authority = result['data']['authority']

        url = f"https://www.zarinpal.com/pg/StartPay/{authority}"
        user = Token.objects.get(key=request.auth.key).user
        data = json.loads(data)
        Invoice.objects.create(amount=data['amount'] ,status="Active", user=user, authority=authority)
        return Response({"success" : "اکنون از طریق لینک زیر میتوانید پرداخت خود را نهایی کنید", "url" : url}, status=200)
