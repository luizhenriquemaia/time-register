import json
import unittest
from datetime import date, time

from django.test import Client, TestCase

from main.models import Schedule, Employee, Report, TypeContract, TimesReport


def add_new_employee():
    employee_test = Employee(
        name="Employee Test"
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

def add_new_report(employee, typeOfContract):
    report_test = Report(
        initialDate=date(2020, 1, 1),
        finalDate=date(2020, 1, 31),
        employee=employee,
        typeContract=typeOfContract
    )
    report_test.save()
    return report_test

def add_new_schedule():
    schedule_test = Schedule(
        description="Schedule test"
    )
    schedule_test.save()
    return schedule_test

def add_new_time(schedule, report):
    time_test = TimesReport(
        report=report,
        dateRegister=date(2020, 1, 1),
        schedule=schedule,
        timeRegister=time(10, 0)
    )
    time_test.save()
    return time_test


class ReportTestsWithoutData(TestCase):
    def setUp(self):
        self.client = Client()
    
    def test_get_all_reports_with_no_reports(self):
        response = self.client.get('/api/report/')
        self.assertEqual(response.status_code, 204)


class ReportTestsWithData(TestCase):
    def setUp(self):
        self.client = Client()
        self.employee_test = add_new_employee()
        self.contract_test = add_new_type_of_contract()
        self.report_test = add_new_report(self.employee_test, self.contract_test)
    
    def test_get_all_reports(self):
        response = self.client.get('/api/report/')
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
        response = self.client.post(
            '/api/report/', json_data, headers={"Content-Type": "application/json"})
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
        response = self.client.post(
            '/api/report/', json_data, headers={"Content-Type": "application/json"})
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
        response = self.client.post(
            '/api/report/', json_data, headers={"Content-Type": "application/json"})
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response_body_data['message'], 'this type of contract does not exists')
    
    def test_delete_report(self):
        response = self.client.delete(
            f'/api/report/{self.report_test.id}/', headers={"Content-Type": "application/json"})
        self.assertEqual(response.status_code, 204)
    
    def test_delete_no_existent_report(self):
        response = self.client.delete(
            f'/api/report/{self.report_test.id + 1}/', headers={"Content-Type": "application/json"})
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response_body_data['message'], 'no report founded')
    
    def test_retrieve_report(self):
        response = self.client.get(
            f'/api/report/{self.report_test.id}/', headers={"Content-Type": "application/json"})
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response_body_data['data']['initialDate'], '2020-01-01')
    
    def test_retrieve_no_existent_report(self):
        response = self.client.get(
            f'/api/report/{self.report_test.id + 1}/', headers={"Content-Type": "application/json"})
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response_body_data['message'], 'no report founded')


class TimesReportTestsWithoutData(TestCase):
    def setUp(self):
        self.client = Client()

    def test_get_time_without_report(self):
        response = self.client.get('/api/time-report/')
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response_body_data['message'], 'you need to specify the report')


class TimesReportTestsWithData(TestCase):
    def setUp(self):
        self.client = Client()
        self.employee_test = add_new_employee()
        self.contract_test = add_new_type_of_contract()
        self.report_test = add_new_report(
            self.employee_test, self.contract_test)
        self.schedule_test = add_new_schedule()
        self.times_test = add_new_time(
            self.schedule_test, self.report_test)

    def test_get_time_with_invalid_report(self):
        response = self.client.get(
            '/api/time-report/', {'report': self.report_test.id + 1})
        response_body_data = json.loads(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response_body_data['message'], 'this report does not exists')
    
    def test_get_time(self):
        response = self.client.get(
            '/api/time-report/', {'report': self.report_test.id})
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
        
    
    
