from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("login/", views.login_view, name="login"),
    path("signup/", views.signup_view, name="signup"),
    path("logout/", views.logout_view, name="logout"),
    path("", views.index, name="index"),
    path("propertylist/", views.propertylist, name="propertylist"),
    path("add-group/", views.addgroup, name="addgroup"),
    path("group-list/", views.grouplist, name="grouplist"),
    path("delete-group/<int:id>/", views.deletegroup, name="deletegroup"), 
    path("user/add/", views.adduser_view, name="adduser"),
    path("userlist/", views.userlist, name="userlist"),
    path("user/edit/<int:user_id>/", views.edit_user, name="edituser"),
    path("user/delete/<int:user_id>/", views.delete_user, name="deleteuser"),
    path("child/<int:child_id>/", views.child_view, name="child_view"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
