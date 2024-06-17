from django.shortcuts import render, HttpResponse
from django.views.generic import View
from telegram.models import TelegramProfile
from .models import Invoice
import requests, json

# Create your views here.
class BotVerifyPayment(View):
    def get(self, request):
        try:
            status = request.GET.get('Status')

            authority = request.GET.get('Authority')
            bot_url = "https://t.me/traidassistant_bot"

            if status == "OK":
                try:
                    invoice = Invoice.objects.get(authority=authority)
                except:
                    return HttpResponse(content="سفارشی با این کد رهگیری پیدا نشد! در صورت پرداخت از طریق ربات با پشتیبانی این موضوع را در میان بگذارید")


                if invoice.status != "Active":
                    return HttpResponse(content="کد نامعتبر")

                invoice.status = "Paid"
                telegram_id = invoice.telegram_profile.telegram_id
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

                update_url = "https://api.telegram.org/bot7111711383:AAH5xL-FunByrIZvV_HyWr2y7d5e1UqKELo/getUpdates"
                url = f"https://api.telegram.org/bot7111711383:AAH5xL-FunByrIZvV_HyWr2y7d5e1UqKELo/sendMessage"
                delete_url = f"https://api.telegram.org/bot7111711383:AAH5xL-FunByrIZvV_HyWr2y7d5e1UqKELo/deleteMessage"


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
