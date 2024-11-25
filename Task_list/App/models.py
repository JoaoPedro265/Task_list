from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password

# Create your models here.

class Task_List(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    descrition=models.CharField(max_length=500,default='')
    text=models.CharField(max_length=500,default='')
    data= models.DateTimeField(default=now)  # Data e hora da criação
    completed=models.BooleanField(default=False)

    def __str__(self):
        return f'user:{self.user} | descrition:{self.descrition} |  test:{self.text}'
    