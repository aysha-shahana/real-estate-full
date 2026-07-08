from django import forms
from my_app.models import Blog ,  BlogCategory , PropertyListing


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
        



class PropertyForm(forms.ModelForm):

    class Meta:
        model = PropertyListing

        fields = [
            "title",
            "price",
            "address",
            "description",
            "beds",
            "baths",
            "sqft",
            "image",
            "listing_type",
            "property_type",
            "status",
            "furnishing",
            "ownership",
            "year_built",
            "nearby_places",
            "amenities",
            "is_featured",
            "approval_status",
        ]

       widgets = {

    "title": forms.TextInput(attrs={"class":"form-control"}),

    "price": forms.NumberInput(attrs={"class":"form-control"}),

    "address": forms.TextInput(attrs={"class":"form-control"}),

    "description": forms.Textarea(attrs={
        "class":"form-control",
        "rows":5
    }),

    "beds": forms.NumberInput(attrs={"class":"form-control"}),

    "baths": forms.NumberInput(attrs={"class":"form-control"}),

    "sqft": forms.NumberInput(attrs={"class":"form-control"}),

    "listing_type": forms.Select(attrs={"class":"form-select"}),

    "property_type": forms.Select(attrs={"class":"form-select"}),

    "status": forms.Select(attrs={"class":"form-select"}),

    "furnishing": forms.Select(attrs={"class":"form-select"}),

    "ownership": forms.Select(attrs={"class":"form-select"}),

    "year_built": forms.NumberInput(attrs={"class":"form-control"}),

    "image": forms.ClearableFileInput(attrs={"class":"form-control"}),

    "nearby_places": forms.Textarea(attrs={
        "class":"form-control",
        "rows":3
    }),

    "amenities": forms.CheckboxSelectMultiple(),

    "approval_status": forms.Select(attrs={"class":"form-select"}),
}