from django.db import models


class Module(models.Model):
    name = models.CharField(max_length=100)
    url_name = models.CharField(max_length=100, blank=True, null=True)
    icon = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name


class Child(models.Model):
    module = models.ForeignKey(
        Module,
        on_delete=models.CASCADE,
        related_name='children'
    )
    name = models.CharField(max_length=100)
    url_name = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name


class PropertyListing(models.Model):

    PROPERTY_CHOICES = (
        ('buy', 'Buy'),
        ('rent', 'Rent'),
    )

    title = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    address = models.CharField(max_length=200)

    beds = models.PositiveIntegerField()
    baths = models.PositiveIntegerField()
    sqft = models.PositiveIntegerField(
        null=True,
        blank=True
    )

    image = models.ImageField(
        upload_to='properties/',
        blank=True,
        null=True
    )

    listing_type = models.CharField(
        max_length=10,
        choices=PROPERTY_CHOICES
    )
    is_featured = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.title