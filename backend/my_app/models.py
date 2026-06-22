from django.db import models
from django.contrib.auth.models import User



class Module(models.Model):
    name = models.CharField(max_length=100)
    url_name = models.CharField(max_length=100, blank=True, null=True)
    icon = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name


class Child(models.Model):
    module = models.ForeignKey(
        Module, on_delete=models.CASCADE, related_name="children"
    )

    name = models.CharField(max_length=100)

    url_name = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name
    
class Amenity(models.Model):

    name = models.CharField(
        max_length=100,
        unique=True
    )

    def __str__(self):
        return self.name
    
    
class PropertyListing(models.Model):


    PROPERTY_CHOICES = (
        ("buy", "Buy"),
        ("rent", "Rent"),
    )

    PROPERTY_TYPE_CHOICES = (
        ("villa", "Villa"),
        ("apartment", "Apartment"),
        ("house", "House"),
        ("plot", "Plot"),
    )

    STATUS_CHOICES = (
        ("available", "Available"),
        ("sold", "Sold"),
        ("rented", "Rented"),
    )
    
    FURNISHING_CHOICES = (
        ("unfurnished", "Unfurnished"),
        ("semi_furnished", "Semi Furnished"),
        ("fully_furnished", "Fully Furnished"),
    )
    
    OWNERSHIP_CHOICES = (
        ("freehold", "Freehold"),
        ("leasehold", "Leasehold"),
    )
    APPROVAL_CHOICES = (
        ("pending", "Pending"),
        ("Accepted", "Accepted"),
        ("rejected", "Rejected"),
    )

    approval_status = models.CharField(
        max_length=20,
        choices=APPROVAL_CHOICES,
        default="pending"
    )
    
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="properties"
    )

    title = models.CharField(max_length=200)

    price = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    address = models.CharField(max_length=200)

    description = models.TextField(
        blank=True,
        null=True
    )

    beds = models.PositiveIntegerField(
        null=True,
        blank=True
    )

    baths = models.PositiveIntegerField(
        null=True,
        blank=True
    )

    sqft = models.PositiveIntegerField(
        null=True,
        blank=True
    )

    image = models.ImageField(
        upload_to="properties/",
        blank=True,
        null=True
    )
    
    furnishing = models.CharField(
        max_length=50,
        choices=FURNISHING_CHOICES,
        blank=True,
        null=True
    )
      
    ownership = models.CharField(
        max_length=50,
        choices=OWNERSHIP_CHOICES,
        blank=True,
        null=True
    )

    year_built = models.PositiveIntegerField(
        blank=True,
        null=True
    )

    nearby_places = models.TextField(
        blank=True,
        null=True,
        help_text="School, Hospital, Mall"
    )

    amenities = models.ManyToManyField(
        Amenity,
        blank=True,
        related_name="properties"
    )

    listing_type = models.CharField(
        max_length=10,
        choices=PROPERTY_CHOICES
    )

    property_type = models.CharField(
        max_length=100,
        choices=PROPERTY_TYPE_CHOICES,
        default="house"
    )

    status = models.CharField(
        max_length=100,
        choices=STATUS_CHOICES,
        default="available"
    )

    is_featured = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        null = True
    )

    def __str__(self):
        return self.title
    
class NearbyPlace(models.Model):

    property = models.ForeignKey(
        PropertyListing,
        on_delete=models.CASCADE,
        related_name="nearby_places_list"
    )

    name = models.CharField(max_length=100)

    distance = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to="profiles/", null=True, blank=True)
    phone = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )
    
    
class VisitRequest(models.Model):

    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    )

    property = models.ForeignKey(
        PropertyListing,
        on_delete=models.CASCADE
    )

    name = models.CharField(max_length=100)

    email = models.EmailField()

    phone = models.CharField(max_length=20)

    visit_date = models.DateField()

    visit_time = models.TimeField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name
    


class PropertyOffer(models.Model):

    STATUS_CHOICES = (
    ("pending", "Pending"),
    ("accepted", "Accepted"),
    ("rejected", "Rejected"),
    )

    status = models.CharField(
    max_length=20,
    choices=STATUS_CHOICES,
    default="pending"
    )
    
    property = models.ForeignKey(
        PropertyListing,
        on_delete=models.CASCADE
    )

    name = models.CharField(max_length=100)

    phone = models.CharField(max_length=20)

    offer_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )
    
class PropertyBooking(models.Model):

    property = models.ForeignKey(
        PropertyListing,
        on_delete=models.CASCADE,
        related_name="bookings"
    )

    name = models.CharField(
        max_length=100
    )

    email = models.EmailField()

    phone = models.CharField(
        max_length=20
    )

    booking_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=10000
    )

    payment_status = models.CharField(
        max_length=20,
        default="pending"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name
    
class Enquiry(models.Model):

    property = models.ForeignKey(
        PropertyListing,
        on_delete=models.CASCADE
    )

    name = models.CharField(max_length=100)

    email = models.EmailField()

    phone = models.CharField(max_length=20)

    message = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )
    
class RentalApplication(models.Model):

    property = models.ForeignKey(
        PropertyListing,
        on_delete=models.CASCADE
    )

    tenant = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    full_name = models.CharField(
    max_length=100,
    blank=True,
    null=True
    )

    email = models.EmailField(
    blank=True,
    null=True
    )

    phone = models.CharField(
    max_length=20,
    blank=True,
    null=True
    )

    occupation = models.CharField(
    max_length=100,
    blank=True,
    null=True
    )

    monthly_income = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )

    occupants = models.PositiveIntegerField(default=1)

    move_in_date = models.DateField()

    message = models.TextField(
    blank=True,
    null=True
    )
    status = models.CharField(
        max_length=20,
        default="pending"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    ) 