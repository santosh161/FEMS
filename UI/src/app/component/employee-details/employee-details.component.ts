import { Component } from '@angular/core';
import { Employee } from 'src/app/model/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent {
employees: any[] = [];
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
