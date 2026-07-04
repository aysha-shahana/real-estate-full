from django.db import models
from django.contrib.auth.models import User, Group



class Module(models.Model):
    name = models.CharField(max_length=100)
    allowed_groups = models.ManyToManyField(
        Group,
        blank=True
    )
    url_name = models.CharField(max_length=100, blank=True, null=True)
    icon = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name


class Child(models.Model):
    module = models.ForeignKey(
        Module, on_delete=models.CASCADE, related_name="children"
    )

    allowed_groups = models.ManyToManyField(
        Group,
        blank=True
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


class ContactLead(models.Model):

    property = models.ForeignKey(
        PropertyListing,
        on_delete=models.CASCADE,
        related_name="contact_leads"
    )

    customer_name = models.CharField(max_length=200)

    customer_phone = models.CharField(max_length=20)

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.customer_name
    
    
class ContactInfo(models.Model):
    company_name = models.CharField(max_length=100)
    address = models.TextField()
    phone = models.CharField(max_length=20)
    whatsapp = models.CharField(max_length=20, blank=True)
    email = models.EmailField()
    map_link = models.URLField(blank=True)

    def __str__(self):
        return self.company_name
    
class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    
from django.db import models
from django.utils.text import slugify
from ckeditor_uploader.fields import RichTextUploadingField


class BlogCategory(models.Model):

    name = models.CharField(
        max_length=100,
        unique=True
    )

    slug = models.SlugField(
        unique=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["name"]
        verbose_name = "Blog Category"
        verbose_name_plural = "Blog Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    

class Blog(models.Model):

    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]
    
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)

    category = models.ForeignKey(
        BlogCategory,
        on_delete=models.PROTECT,
        related_name="blogs"
    )


    featured_image = models.ImageField(upload_to='blogs/')

    excerpt = models.TextField()

    content = RichTextUploadingField()

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='draft'
    )

    meta_title = models.CharField(
        max_length=255,
        blank=True
    )

    meta_description = models.TextField(
        blank=True
    )

    meta_keywords = models.CharField(
        max_length=255,
        blank=True,
        help_text="Separate keywords with commas."
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title




