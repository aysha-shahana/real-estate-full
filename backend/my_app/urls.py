from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/login/", views.login_view, name="login"),
    path("admin/signup/", views.signup_view, name="signup"),
    path("admin/logout/", views.logout_view, name="logout"),
    path("", views.index, name="index"),
    path("admin/", views.index, name="index"),
    path("admin/propertylist/", views.propertylist, name="property-list"),
    path("admin/add-group/", views.addgroup, name="add-group"),
    path("admin/group-list/", views.grouplist, name="group-list"),
    path("admin/delete-group/<int:id>/", views.deletegroup, name="delete-group"), 
    path("admin/user/add/", views.adduser_view, name="add-user"),
    path("admin/userlist/", views.userlist, name="user-list"),
    path("admin/user/edit/<int:user_id>/", views.edit_user, name="edit-user"),
    path("admin/user/delete/<int:user_id>/", views.delete_user, name="delete-user"),
    path("admin/child/<int:child_id>/", views.child_view, name="child-view"),
    path('admin/userdashboard/', views.user_dashboard, name='user-dashboard'),
    path("admin/visit-requests/", views.visit_requests, name="visit-requests"),
    path("admin/accept-visit/<int:pk>/",views.accept_visit,name="accept-visit"),

    path(
        "admin/reject-visit/<int:pk>/",
        views.reject_visit,
        name="reject-visit"
    ),
  
    # urls.py

    path(
        "admin/admin-profile/",
        views.admin_profile,
        name="admin-profile"
    ),
    path(
        "admin/edit-group/<int:id>/",
        views.edit_group,
        name="edit-group"
    ),
    path(
        "admin/blog-list/",
        views.blog_list,
        name="blog-list"
    ),
    path("admin/add-blog/", views.add_blog, name="add-blog"),
    path(
    "admin/edit-blog/<int:id>/",
    views.edit_blog,
    name="edit-blog"
),

path(
    "admin/delete-blog/<int:id>/",
    views.delete_blog,
    name="delete-blog"
),
path(
    "admmin/blog-categories/",
    views.blog_category_list,
    name="blog_category_list",
),
path(
    "admin/add-blog-category/",
    views.add_blog_category,
    name="add-blog-category",
),
path("admin/blog-categories/edit/<int:id>/", views.edit_blog_category, name="edit-blog-category"),
path("admin/blog-categories/delete/<int:id>/", views.delete_blog_category, name="delete-blog-category"),
path(
    "admin/add-property/",
    views.add_property,
    name="add-property",
),
path(
    "admin/edit-property/<int:id>/",
    views.edit_property,
    name="edit-property",
),

path(
    "admin/delete-property/<int:id>/",
    views.delete_property,
    name="delete-property",
),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
