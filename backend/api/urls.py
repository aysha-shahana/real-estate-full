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
    property_details,
    update_visit_status,
    ContactMessageView,
    ContactInfoView,
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
    create_contact_lead, 
    my_property_visits,
    my_contact_leads,
    BlogListView, 
    BlogDetailView
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
    path("property-details-seller/<int:id>/",property_details,),
    path(
    "contact-leads/",
    create_contact_lead,
    ),
    path(
        "my-property-visits/",
        my_property_visits,
    ),

    path(
        "my-contact-leads/",
        my_contact_leads,
    ),
    path(
    "visit-request/<int:visit_id>/status/",
    update_visit_status
),
    path(
        "contact/",
        ContactMessageView.as_view(),
        name="contact-message"
    ),

    path(
        "contact-info/",
        ContactInfoView.as_view(),
        name="contact-info"
    ),
    path(
    "blogs/",
    BlogListView.as_view(),
    name="blog-list"
),

path(
    "blogs/<slug:slug>/",
    BlogDetailView.as_view(),
    name="blog-detail"
),



]
