from django.db import models
from datetime import date


class b01Schedule(models.Model):
    description = models.CharField(max_length=50)
    objects = models.Manager()

    def __str__(self):
        return self.description


class b02TypeContract(models.Model):
    description = models.CharField(max_length=200)
    durationLunch = models.TimeField()
    objects = models.Manager()

    def __str__(self):
        return self.description


class b03FunctionEmployee(models.Model):
    description = models.CharField(max_length=200)
    objects = models.Manager()

    def __str__(self):
        return self.description


class c01Employee(models.Model):
    name = models.CharField(max_length=200)
    # set null = false in production
    function = models.ForeignKey(b03FunctionEmployee, on_delete=models.CASCADE, null=True)
    objects = models.Manager()


class d01Report(models.Model):
    initalDate = models.DateField(default=date(2000, 1, 1))
    finalDate = models.DateField(default=date(2000, 1, 1))
    employee = models.ForeignKey(c01Employee, on_delete=models.CASCADE)
    # set null = false in production
    typeContract = models.ForeignKey(b02TypeContract, on_delete=models.CASCADE, null=True)    
    objects = models.Manager()


class d02Time(models.Model):
    dateRegister = models.DateField(default=date(2000, 1, 1))
    schedule = models.ForeignKey(b01Schedule, on_delete=models.CASCADE)
    timeRegister = models.TimeField()
    report = models.ForeignKey(d01Report, on_delete=models.CASCADE)
    objects = models.Manager()
