# Generated by Django 3.0.4 on 2020-05-11 17:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_auto_20200511_1125'),
    ]

    operations = [
        migrations.CreateModel(
            name='b03FunctionEmployee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=200)),
            ],
        ),
        migrations.RemoveField(
            model_name='c01employee',
            name='description',
        ),
        migrations.AddField(
            model_name='d01time',
            name='typeContract',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.b02TypeContract'),
        ),
        migrations.AddField(
            model_name='c01employee',
            name='function',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.b03FunctionEmployee'),
        ),
    ]
