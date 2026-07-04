from django import forms
from my_app.models import Blog ,  BlogCategory


class BlogForm(forms.ModelForm):

    class Meta:
        model = Blog
        fields = [
            'title',
            'slug',
            'category',
            'featured_image',
            'excerpt',
            'content',
            'status',
            'meta_title',
            'meta_description',
            'meta_keywords',
        ]

        widgets = {
            "title": forms.TextInput(attrs={"class": "form-control"}),

            "slug": forms.TextInput(attrs={"class": "form-control"}),

            "category": forms.Select(attrs={"class": "form-select"}),

            "featured_image": forms.ClearableFileInput(
                attrs={"class": "form-control"}
            ),

            "excerpt": forms.Textarea(
                attrs={
                    "class": "form-control",
                    "rows": 4,
                }
            ),

            "status": forms.Select(attrs={"class": "form-select"}),

            "meta_title": forms.TextInput(
                attrs={"class": "form-control"}
            ),

            "meta_description": forms.Textarea(
                attrs={
                    "class": "form-control",
                    "rows": 3,
                }
            ),

            "meta_keywords": forms.TextInput(
                attrs={
                    "class": "form-control",
                    "placeholder": "villa, apartment, real estate, kerala",
                }
            ),
        }
        


class BlogCategoryForm(forms.ModelForm):
    class Meta:
        model = BlogCategory
        fields = ["name"]