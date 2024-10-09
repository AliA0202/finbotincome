from django.contrib import admin
from accounts.models import User, Referrals

class ReferralsAdminInline(admin.TabularInline):
    model = Referrals
    fields = ["sub"]

    extra = 1

    fk_name = "user"




@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    fieldsets = (
        ("اطلاعات کاربری", {
            "fields": (
                [('username', 'first_name', 'last_name', 'user_type'), ('phone', 'email', 'image')]
            ),
        }),
        
        ("وضعیت حساب", {
            "fields": (
                [('is_superuser', 'is_staff', 'is_active'), ('last_login', 'date_joined')]
            ),
        }),

        ("رفرال", {
            "fields": (
                [('referral_code', 'score')]
            ),
        }),
    )
    
    exclude = ['password', 'groups', 'user_permissions']

    @admin.display(description="نام و نام خانوادگی")
    def showName(self, obj):
        try:
            return f"{obj.first_name} {obj.last_name}"
        except:
            return ""

    list_display = ["username", 'showName', 'user_type', "phone", "email"]
    
    inlines = [
        ReferralsAdminInline
    ]
