from django.contrib.auth.models import User
import json
import unittest
from datetime import date, time

from django.test import Client, TestCase

from main.models import Schedule, Employee, Report, TypeContract, TimesReport


def add_user(username, email):
    user_test = User.objects.create_user(
        username=username,
        email=email,
        password='1234567890'
    )
    return user_test

def login_user(username):
    client = Client()
    json_data = {
            'username': username,
            'password': '1234567890'
        }
    response = client.post(
        '/api/auth/token/', json_data, headers={"Content-Type": "application/json"})
    response_body_data = json.loads(response.content.decode("UTF-8"))
    return response_body_data['access']

def add_new_employee(user_test):
    employee_test = Employee(
        name="Employee Test",
        function="function test",
        description="employee name, function",
        active=True,
        owner=user_test
    )
    employee_test.save()
    return employee_test

def add_new_type_of_contract():
    contract_test = TypeContract(
        description="Type test",
        durationLunch=time(1, 0)
    )
    contract_test.save()
    return contract_test


def add_new_report(employee, typeOfContract, user):
    report_test = Report(
        initialDate=date(2020, 1, 1),
        finalDate=date(2020, 1, 31),
        employee=employee,
        typeContract=typeOfContract,
        owner=user
    )
    report_test.save()
    return report_test

def add_new_schedule():
    schedule_test = Schedule(
        description="Schedule test"
    )
    schedule_test.save()
    return schedule_test


def add_new_time(schedule, report, user):
    time_test = TimesReport(
        report=report,
        dateRegister=date(2020, 1, 1),
        schedule=schedule,
        timeRegister=time(10, 0),
        owner=user
    )
    time_test.save()
    return time_test


class ReportTestsWithoutData(TestCase):
    def setUp(self):
        self.client = Client()
        self.user_test = add_user('user_test', 'usertest@test.com')
        self.token = login_user('user_test')
    
    def test_get_all_reports_with_no_reports(self):
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.get('/api/report/', **header)
        self.assertEqual(response.status_code, 204) 


class ReportTestsWithData(TestCase):
    def setUp(self):
        self.client = Client()
        self.user_test = add_user('user_test', 'usertest@test.com')
        self.token = login_user('user_test')
        self.employee_test = add_new_employee(self.user_test)
        self.contract_test = add_new_type_of_contract()
        self.report_test = add_new_report(self.employee_test, self.contract_test, self.user_test)
    
    def test_get_all_reports(self):
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.get(
            '/api/report/', **header)
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['content-type'], 'application/json')
        self.assertEqual(response_body_data['data'][0]['initialDate'], '2020-01-01')
    
    def test_add_new_report(self):
        json_data = {
            'initialDate': date(2020, 1, 1),
            'finalDate': date(2020, 1, 31),
            'employee_id': self.employee_test.id,
            'typeContract_id': self.contract_test.id
        }
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.post(
            '/api/report/', json_data, **header)
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 201)
        self.assertEqual(
            response_body_data['data']['initialDate'], '2020-01-01')
    
    def test_add_new_report_with_wrong_employee(self):
        json_data = {
            'initialDate': date(2020, 1, 1),
            'finalDate': date(2020, 1, 31),
            'employee_id': self.employee_test.id + 1,
            'typeContract_id': self.contract_test.id
        }
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.post(
            '/api/report/', json_data, **header)
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response_body_data['message'], 'this employee does not exists')
    
    def test_add_new_report_with_wrong_type_of_contract(self):
        json_data = {
            'initialDate': date(2020, 1, 1),
            'finalDate': date(2020, 1, 31),
            'employee_id': self.employee_test.id,
            'typeContract_id': self.contract_test.id + 1
        }
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.post(
            '/api/report/', json_data, **header)
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response_body_data['message'], 'this type of contract does not exists')
    
    def test_delete_report(self):
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.delete(
            f'/api/report/{self.report_test.id}/', **header)
        self.assertEqual(response.status_code, 204)
    
    def test_delete_no_existent_report(self):
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.delete(
            f'/api/report/{self.report_test.id + 1}/', **header)
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response_body_data['message'], 'no report founded')
    
    def test_retrieve_report(self):
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.get(
            f'/api/report/{self.report_test.id}/', **header)
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response_body_data['data']['initialDate'], '2020-01-01')
    
    def test_retrieve_no_existent_report(self):
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.get(
            f'/api/report/{self.report_test.id + 1}/', **header)
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response_body_data['message'], 'no report founded')


class TimesReportTestsWithoutData(TestCase):
    def setUp(self):
        self.client = Client()
        self.user_test = add_user('user_test', 'usertest@test.com')
        self.token = login_user('user_test')

    def test_get_time_without_report(self):
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.get('/api/time-report/', **header)
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response_body_data['message'], 'you need to specify the report')


class TimesReportTestsWithData(TestCase):
    def setUp(self):
        self.client = Client()
        self.user_test = add_user('user_test', 'usertest@test.com')
        self.token = login_user('user_test')
        self.employee_test = add_new_employee(self.user_test)
        self.contract_test = add_new_type_of_contract()
        self.report_test = add_new_report(
            self.employee_test, self.contract_test, self.user_test)
        self.schedule_test = add_new_schedule()
        self.times_test = add_new_time(
            self.schedule_test, self.report_test, self.user_test)

    def test_get_time_with_invalid_report(self):
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.get(
            '/api/time-report/', {'report': self.report_test.id + 1}, **header)
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response_body_data['message'], 'this report does not exists')
    
    def test_get_time(self):
        header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        response = self.client.get(
            '/api/time-report/', {'report': self.report_test.id}, **header)
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response_body_data['data'][0]['timeRegister'], '10:00:00')

    # def test_add_new_time(self):
    #     json_data = { 'listOfData': [
    #         {
    #             'report': self.report_test.id,
    #             'dateRegister': '2020-1-2',
    #             'schedule': self.schedule_test.id,
    #             'timeRegister': "10:00"
    #         }, 
    #         {
    #             'report': self.report_test.id,
    #             'dateRegister': '2020-1-2',
    #             'schedule': self.schedule_test.id,
    #             'timeRegister': "10:00"
    #         }
    #     ]}
    #     response = self.client.post(
    #         '/api/time-report/', json_data, headers={"Content-Type": "application/json"})
    #     response_body_data = json.loads(response.content.decode("UTF-8"))
    #     self.assertEqual(response.status_code, 201)
        
    
    
