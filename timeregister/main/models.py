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

    def __str__(self):
        return self.name


class d01Report(models.Model):
    initialDate = models.DateField(default=date(2000, 1, 1))
    finalDate = models.DateField(default=date(2000, 1, 1))
    employee = models.ForeignKey(
        c01Employee, on_delete=models.CASCADE, related_name='employee')
    # set null = false in production
    typeContract = models.ForeignKey(
        b02TypeContract, on_delete=models.CASCADE, null=True, related_name='typeContract')
    objects = models.Manager()

    def create(self, **validated_data):
        new_report = d01Report(
            initialDate = validated_data['initialDate'],
            finalDate = validated_data['finalDate'],
            employee = validated_data['employee'],
            typeContract = validated_data['typeContract']
        )
        new_report.save()
        return new_report
    
    def destroy(self, id):
        report = d01Report.objects.get(id=id)
        report.delete()
    
    def retrieve(self, id):
        report = d01Report.objects.get(id=id)
        report_dict = {
            "id": id,
            "initialDate": report.initialDate,
            "finalDate": report.finalDate,
            "employee": c01Employee.objects.get(id=report.employee_id).__dict__,
            "typeContract": b02TypeContract.objects.get(id=report.typeContract_id).__dict__
        }
        return report_dict


# Change back to other viewset approach
class d02TimesReport(models.Model):
    dateRegister = models.DateField(default=date(2000, 1, 1))
    schedule = models.ForeignKey(b01Schedule, on_delete=models.CASCADE)
    timeRegister = models.TimeField()
    report = models.ForeignKey(d01Report, on_delete=models.CASCADE)
    objects = models.Manager()

    def create(self, validated_data):
        return d02TimesReport.objects.create(**validated_data)
