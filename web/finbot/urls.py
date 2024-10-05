from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from filebrowser.sites import site
from django.conf.urls.static import static

urlpatterns = [
    path('api/accounts/', include('accounts.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/payment/', include('payment.urls')),
    path('api/telegram/', include('telegram.urls')),
    path('api/main/', include('main.urls')),
    path('admin/filebrowser/', site.urls),
    path('grappelli/', include('grappelli.urls')),
    path('admin/', admin.site.urls),
    path('tinymce/', include('tinymce.urls')),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)