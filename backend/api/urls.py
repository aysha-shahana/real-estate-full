from django.urls import path
from .views import signup
from .views import (
    rent_properties,
    buy_properties,
    add_property,
    property_search,
    my_properties,
    CurrentUserView,
    schedule_visit,
    visit_requests,
    submit_offer,
    apply_for_rent,
)
from .views import (
    featured_properties,
    rent_property_search,
    buy_property_search,
    user_dashboard,
    delete_property,
    edit_property,
    property_detail,
    ChangePasswordView,
    update_profile,
    click_property_detail,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("add-property/", add_property),
    path("buy-properties/", buy_properties),
    path("rent-properties/", rent_properties),
    path("property-search/", property_search, name="property-search"),
    path("featured-properties/", featured_properties),
    path("rent-property-search/", rent_property_search),
    path("buy-property-search/", buy_property_search),
    path("signup/", signup),
    path("token/", TokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("user-dashboard/", user_dashboard),
    path("my-properties/", my_properties),
    path("current-user/", CurrentUserView.as_view(), name="current-user"),
    path("properties/<int:pk>/delete/", delete_property),
    path("properties/<int:pk>/edit/", edit_property),
    path("properties/<int:pk>/", property_detail),
    path("change-password/", ChangePasswordView.as_view()),
    path("update-profile/", update_profile, name="update-profile"),
    path("property-details/<int:id>/", click_property_detail, name="property_detail"),
    path("schedule-visit/", schedule_visit),
    path("visit-requests/", visit_requests),
path(
    "submit-offer/",
    submit_offer,
    name="submit_offer"
),

path(
    "apply-for-rent/<int:property_id>/",
    apply_for_rent,
),
]
