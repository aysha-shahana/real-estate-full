from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("login/", views.login_view, name="login"),
    path("signup/", views.signup_view, name="signup"),
    path("logout/", views.logout_view, name="logout"),
    path("", views.index, name="index"),
    path("admin/", views.index, name="index"),
    path("propertylist/", views.propertylist, name="property-list"),
    path("add-group/", views.addgroup, name="add-group"),
    path("group-list/", views.grouplist, name="group-list"),
    path("delete-group/<int:id>/", views.deletegroup, name="delete-group"), 
    path("user/add/", views.adduser_view, name="add-user"),
    path("userlist/", views.userlist, name="user-list"),
    path("user/edit/<int:user_id>/", views.edit_user, name="edit-user"),
    path("user/delete/<int:user_id>/", views.delete_user, name="delete-user"),
    path("child/<int:child_id>/", views.child_view, name="child-view"),
    path('userdashboard/', views.user_dashboard, name='user-dashboard'),
    path("visit-requests/", views.visit_requests, name="visit-requests"),
    path("accept-visit/<int:pk>/",views.accept_visit,name="accept-visit"),

    path(
        "reject-visit/<int:pk>/",
        views.reject_visit,
        name="reject-visit"
    ),
  
    # urls.py

    path(
        "admin-profile/",
        views.admin_profile,
        name="admin-profile"
    ),
    path(
        "edit-group/<int:id>/",
        views.edit_group,
        name="edit-group"
    ),
    path(
        "blog-list/",
        views.blog_list,
        name="blog-list"
    ),
    path("add-blog/", views.add_blog, name="add-blog"),
    path(
    "edit-blog/<int:id>/",
    views.edit_blog,
    name="edit-blog"
),

path(
    "delete-blog/<int:id>/",
    views.delete_blog,
    name="delete-blog"
),
path(
    "blog-categories/",
    views.blog_category_list,
    name="blog_category_list",
),
path(
    "add-blog-category/",
    views.add_blog_category,
    name="add-blog-category",
),
path("blog-categories/edit/<int:id>/", views.edit_blog_category, name="edit-blog-category"),
path("blog-categories/delete/<int:id>/", views.delete_blog_category, name="delete-blog-category"),
path(
    "add-property/",
    views.add_property,
    name="add-property",
),
path(
    "edit-property/<int:id>/",
    views.edit_property,
    name="edit-property",
),

path(
    "delete-property/<int:id>/",
    views.delete_property,
    name="delete-property",
),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
