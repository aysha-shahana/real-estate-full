from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('login/', views.user_login, name='login'),
    path('logout/' , views.user_logout, name='logout'),
    path('', views.index, name='index'),
    path('propertylist/', views.propertylist, name='propertylist'),
    path('addgroup/', views.addgroup, name='addgroup'),
    path('grouplist/', views.grouplist, name='grouplist'),
    path('adduser/', views.adduser, name='adduser'),
    path('userlist/', views.userlist, name='userlist'),
    path('login/', views.login, name='login'),
    path('child/<int:child_id>/', views.child_view, name='child_view'),   
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)