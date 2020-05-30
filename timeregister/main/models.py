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
    id = models.AutoField(primary_key=True)
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
            employee = c01Employee.objects.get(id=validated_data['employee_id']),
            typeContract = b02TypeContract.objects.get(id=validated_data['typeContract_id'])
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
            "employee_id": report.employee_id,
            "employee": c01Employee.objects.get(id=report.employee_id).__dict__,
            "typeContract_id": report.typeContract_id,
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

    def create(self, **validated_data):
        if d02TimesReport.objects.filter(dateRegister=validated_data['dateRegister'], schedule=validated_data['schedule_id'], report=validated_data['report_id']).exists():
            report = d02TimesReport.objects.get(
                dateRegister=validated_data['dateRegister'], schedule=validated_data['schedule_id'], report=validated_data['report_id'])
            report.timeRegister = validated_data['timeRegister']
        else:
            report = d02TimesReport(
                dateRegister=validated_data['dateRegister'],
                schedule= b01Schedule.objects.get(id=validated_data['schedule_id']),
                timeRegister=validated_data['timeRegister'],
                report= d01Report.objects.get(id=validated_data['report_id'])
            )
        report.save()
        return report
