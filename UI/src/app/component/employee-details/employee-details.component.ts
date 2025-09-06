import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
//import { Employee } from 'src/app/model/employee.model';

interface Employee {
  id: number;
  name: string;
  designation: string;
  factory: string;
  salary: number;
  mobile: string;
  aadhar: string;
  village: string;
}

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchText: string = '';

  designations = ['Worker', 'Supervisor', 'Manager', 'Driver'];
  factories: string[] = ['Factory A', 'Factory B', 'Factory C']; 
  selectedEmployee: Employee | null = null;
  isEmployeePopupOpen = false;
  isAddMode = false;
  selectedFactory: string = '';

  ngOnInit(): void {
    this.employees = [
      { id: 1, name: 'John Smith', designation: 'Worker', factory: 'Factory A', salary: 18000, mobile: '9876543210', aadhar: '1234-5678-9012', village: 'Village X' },
      { id: 2, name: 'Asha More', designation: 'Supervisor', factory: 'Factory B', salary: 22000, mobile: '9123456780', aadhar: '2345-6789-0123', village: 'Village Y' }
    ];
    this.filteredEmployees = [...this.employees];

  }



  openAddEmployeePopup() {
    this.selectedEmployee = { id: 0, name: '', designation: '', factory: '', salary: 0, mobile: '', aadhar: '', village: '' };
    this.isAddMode = true;
    this.isEmployeePopupOpen = true;
  }

  openEditEmployee(emp: Employee) {
    this.selectedEmployee = { ...emp };
    this.isAddMode = false;
    this.isEmployeePopupOpen = true;
  }

  closeEmployeePopup() {
    this.isEmployeePopupOpen = false;
  }

  saveEmployee() {
    if (!this.selectedEmployee) return;

    if (this.isAddMode) {
      this.selectedEmployee.id = this.employees.length + 1;
      this.employees.push(this.selectedEmployee);
    } else {
      const index = this.employees.findIndex(e => e.id === this.selectedEmployee!.id);
      if (index !== -1) this.employees[index] = this.selectedEmployee;
    }

    this.filteredEmployees = [...this.employees];
    this.closeEmployeePopup();
  }

 
  trackByEmployee(index: number, emp: Employee) {
    return emp.id;
  }

  // Ask for confirmation before deleting
confirmDeleteEmployee(emp: Employee) {
  const confirmed = confirm(`Are you sure you want to delete ${emp.name}?`);
  if (confirmed) {
    this.deleteEmployee(emp);
  }
}

// Delete employee function
deleteEmployee(emp: Employee) {
  this.employees = this.employees.filter(e => e.id !== emp.id);
  this.filteredEmployees = [...this.employees];
}

filterEmployees() {
  const text = this.searchText.toLowerCase();
  const factory = this.selectedFactory;

  this.filteredEmployees = this.employees.filter(emp =>
    // Filter by search text
    (emp.name.toLowerCase().includes(text) ||
     emp.designation.toLowerCase().includes(text) ||
     emp.factory.toLowerCase().includes(text)) &&
    // Filter by factory if selected
    (factory === '' || emp.factory === factory)
  );
}


}