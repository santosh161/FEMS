import { Component } from '@angular/core';
import { Employee } from 'src/app/model/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent {
  employees: any[] = [
    {
      factoryName: 'ABC Factory',
      workerName: 'Santosh Devkate',
      code: 'EMP001',
      mobile1: '9876543210',
      JoiningDate: '2025-08-31'
    },
    {
      factoryName: 'XYZ Factory',
      workerName: 'Rohit Sharma',
      code: 'EMP002',
      mobile1: '9123456780',
      JoiningDate: '2024-05-15'
    },
    {
      factoryName: 'LMN Factory',
      workerName: 'qwerty',
      code: 'EMP003',
      mobile1: '9988776655',
      JoiningDate: '2023-11-20'
    }
  ];
  
  selectedEmployee: any = null; 
  showForm: boolean = false;    

  // open form for new employee
  onAddEmployee() {
    this.selectedEmployee = null;
    this.showForm = true;
  }

  // open form with existing employee for edit
  onEditEmployee(emp: any) {
    this.selectedEmployee = { ...emp };
    this.showForm = true;
  }

  // delete employee
  onDeleteEmployee(index: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employees.splice(index, 1);
    }
  }

  // save new/edited employee
  onSaveEmployee(emp: any) {
    if (this.selectedEmployee) {
      // update existing employee
      const index = this.employees.findIndex(e => e.workerCode === this.selectedEmployee.workerCode);
      if (index > -1) {
        this.employees[index] = emp;
      }
    } else {
      // add new employee
      this.employees.push(emp);
    }
    this.showForm = false;
    this.selectedEmployee = null;
  }

  // close form without saving
  onCloseForm() {
    this.showForm = false;
    this.selectedEmployee = null;
  }
}
