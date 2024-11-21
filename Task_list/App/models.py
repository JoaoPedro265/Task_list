from django.db import models

# Create your models here.
class Login(models.Model):
    first_name=models.CharField(max_length=200,default='')
    last_name=models.CharField(max_length=200,default='')
    email=models.EmailField(max_length=500,default='')
    senha=models.CharField(max_length=200)

    def __str__(self):
        return f'first_name:{self.first_name} | email:{self.email} | senha:{self.senha}'
    
class Task_List(models.Model):
    user=models.ForeignKey(Login,on_delete=models.CASCADE)
    descrition=models.CharField(max_length=500,default='')
    test=models.CharField(max_length=500,default='')
    completed=models.BooleanField(default=False)