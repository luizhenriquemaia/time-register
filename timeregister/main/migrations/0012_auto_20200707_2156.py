# Generated by Django 3.0.4 on 2020-07-08 00:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_auto_20200528_1630'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='c01Employee',
            new_name='Employee',
        ),
        migrations.RenameModel(
            old_name='b03FunctionEmployee',
            new_name='FunctionEmployee',
        ),
        migrations.RenameModel(
            old_name='d01Report',
            new_name='Report',
        ),
        migrations.RenameModel(
            old_name='b01Schedule',
            new_name='Schedule',
        ),
        migrations.RenameModel(
            old_name='d02TimesReport',
            new_name='TimesReport',
        ),
        migrations.RenameModel(
            old_name='b02TypeContract',
            new_name='TypeContract',
        ),
    ]
