from django.db import models
from django.core.validators import RegexValidator

# Create your models here.

class location(models.Model):
    city=models.CharField(max_length=50)
    area=models.CharField(max_length=100)


class product(models.Model):
    name=models.CharField(max_length=50)
    tagline=models.CharField(max_length=150)
    description=models.TextField()
    price=models.IntegerField(default=0)
    category=models.CharField(max_length=50)
    tags=models.JSONField(default=list)
    image=models.ImageField(upload_to='products/')
    rating=models.FloatField()
    reviewcount=models.IntegerField(default=0)
    stock=models.IntegerField(default=0)

    def __str__(self):
        return self.name


ph_no_validator=RegexValidator(
    regex=r'^\+?[1-9]\d{9,14}$',
    message='Enter a valid phone number.'
)

class order(models.Model):
    STATUS_CHOICES=[
        ('pending','Pending'),
        ('confirmed','Confirmed'),
        ('delivered','Delivered'),
        ('cancelled','Cancelled'),
    ]
    
    fullName=models.CharField(max_length=50)
    phone=models.CharField(max_length=15,unique=True,validators=[ph_no_validator])
    address=models.CharField(max_length=400)
    city=models.CharField(max_length=100)
    notes=models.TextField(blank=True)
    
    def __str__(self):
        return (f"order{self.id} - {self.fullName}")