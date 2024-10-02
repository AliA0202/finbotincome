from django.contrib import admin
from accounts.models import User, Referrals

class ReferralsAdminInline(admin.TabularInline):
    model = Referrals
    fields = ["sub"]

    extra = 1

    fk_name = "user"

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    fields = []
    exclude = ['password', 'groups', 'user_permissions']

    list_display = ['id', 'first_name', 'last_name', 'username', 'user_type']
    
    inlines = [
        ReferralsAdminInline
    ]
