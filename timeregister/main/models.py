from django.contrib.auth.models import User
from django.db import models
from datetime import date

class Schedule(models.Model):
    description = models.CharField(max_length=50)
    objects = models.Manager()

    def __str__(self):
        return self.description


class TypeContract(models.Model):
    description = models.CharField(max_length=200)
    hoursSunday = models.DecimalField(max_digits=4, decimal_places=2, null=True)
    hoursMonday = models.DecimalField(max_digits=4, decimal_places=2, null=True)
    hoursTuesday = models.DecimalField(max_digits=4, decimal_places=2, null=True)
    hoursWednesday = models.DecimalField(max_digits=4, decimal_places=2, null=True)
    hoursThursday = models.DecimalField(max_digits=4, decimal_places=2, null=True)
    hoursFriday = models.DecimalField(max_digits=4, decimal_places=2, null=True)
    hoursSaturday = models.DecimalField(max_digits=4, decimal_places=2, null=True)
    owner = models.ForeignKey(
        User, related_name="typeContract", on_delete=models.CASCADE, null=True)
    objects = models.Manager()

    def __str__(self):
        return self.description
    
    def destroy(self, id):
        type_contract = TypeContract.objects.get(id=id)
        type_contract.delete()


class Employee(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, null=True)
    function = models.CharField(max_length=200, null=True)
    description = models.CharField(max_length=200, null=True)
    active = models.BooleanField(default=True)
    owner = models.ForeignKey(
        User, related_name="employees", on_delete=models.CASCADE, null=True)
    objects = models.Manager()

    def __str__(self):
        return self.name
    
    def destroy(self, id):
        employee = Employee.objects.get(id=id)
        employee.delete()


class Report(models.Model):
    initialDate = models.DateField(default=date(2000, 1, 1))
    finalDate = models.DateField(default=date(2000, 1, 1))
    employee = models.ForeignKey(
        Employee, on_delete=models.CASCADE, related_name='employee')
    # set null = false in production
    typeContract = models.ForeignKey(
        TypeContract, on_delete=models.CASCADE, null=True, related_name='typeContract')
    owner = models.ForeignKey(
        User, related_name="reports", on_delete=models.CASCADE, null=True)
    objects = models.Manager()

    def create(self, **validated_data):
        new_report = Report(
            initialDate = validated_data['initialDate'],
            finalDate = validated_data['finalDate'],
            employee = Employee.objects.get(id=validated_data['employee_id']),
            typeContract = TypeContract.objects.get(id=validated_data['typeContract_id'])
        )
        new_report.save()
        return new_report
    
    def destroy(self, id):
        report = Report.objects.get(id=id)
        report.delete()
    
    def retrieve(self, id):
        report = Report.objects.get(id=id)
        report_dict = {
            "id": id,
            "initialDate": report.initialDate,
            "finalDate": report.finalDate,
            "employee_id": report.employee_id,
            "employee": Employee.objects.get(id=report.employee_id).__dict__,
            "typeContract_id": report.typeContract_id,
            "typeContract": TypeContract.objects.get(id=report.typeContract_id).__dict__
        }
        return report_dict


# Change back to other viewset approach
class TimesReport(models.Model):
    dateRegister = models.DateField(default=date(2000, 1, 1))
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)
    timeRegister = models.TimeField()
    report = models.ForeignKey(Report, on_delete=models.CASCADE)
    owner = models.ForeignKey(
        User, related_name="times_report", on_delete=models.CASCADE, null=True)
    objects = models.Manager()

    def create(self, **validated_data):
        if TimesReport.objects.filter(dateRegister=validated_data['dateRegister'], schedule=validated_data['schedule_id'], report=validated_data['report_id']).exists():
            report = TimesReport.objects.get(
                dateRegister=validated_data['dateRegister'], schedule=validated_data['schedule_id'], report=validated_data['report_id'])
            report.timeRegister = validated_data['timeRegister']
        else:
            report = TimesReport(
                dateRegister=validated_data['dateRegister'],
                schedule= Schedule.objects.get(id=validated_data['schedule_id']),
                timeRegister=validated_data['timeRegister'],
                report= Report.objects.get(id=validated_data['report_id'])
            )
        report.save()
        return report
