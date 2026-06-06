from django import forms
from .models import RentalApplication


class RentalApplicationForm(forms.ModelForm):

    class Meta:
        model = RentalApplication
        fields = ['move_in_date', 'message']

        widgets = {
            'move_in_date': forms.DateInput(
                attrs={'type': 'date'}
            ),

            'message': forms.Textarea(
                attrs={'rows': 4}
            )
        }