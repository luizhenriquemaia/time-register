from django.db import models
from datetime import date


class b01Schedule(models.Model):
    description = models.CharField(max_length=50)
    objects = models.Manager()

class c01Register(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    objects = models.Manager()

class d01Time(models.Model):
    schedule = models.ForeignKey(b01Schedule, on_delete=models.CASCADE)
    timeRegister = models.TimeField()
    dateRegister = models.DateField(default=date(2000, 1, 1))
    employee = models.ForeignKey(c01Register, on_delete=models.CASCADE)
    objects = models.Manager()
