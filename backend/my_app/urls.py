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
    path('userdashboard/', views.user_dashboard, name='user_dashboard'),
    path("visit-requests/", views.visit_requests, name="visit_requests"),
    path("accept-visit/<int:pk>/",views.accept_visit,name="accept_visit"),

    path(
        "reject-visit/<int:pk>/",
        views.reject_visit,
        name="reject_visit"
    ),

    path(
        "admin/offers/",
        views.offer_list,
        name="offer_list"
    ),

    path(
        "offer/accept/<int:offer_id>/",
        views.accept_offer,
        name="accept_offer"
    ),

    path(
        "offer/reject/<int:offer_id>/",
        views.reject_offer,
        name="reject_offer"
    ),
    path(
    "rent-applications/",
    views.rent_applications,
    name="rent_applications"
),
    


]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
