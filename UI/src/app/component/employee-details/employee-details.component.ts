import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
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
  adminData:any
   constructor(private  apiService: AuthService, private router: Router,private toastr: ToastrService) {}

  ngOnInit() {
    const storedData = localStorage.getItem('adminData');
    if (storedData) {
      this.adminData = JSON.parse(storedData);
    }
    this.getEmployeeDetails();
  }


  getEmployeeDetails(){
   let request ={
      "admin":this.adminData.adminName,
      "role": this.adminData.role
    }
    this.apiService.getEmpListDetails(request).subscribe({
      next:(res)=>{
        console.log(res);
       this.employees=res;
      },
      error:(error)=>{
     console.log(error);
     this.employees = [
      {
        id: 2,
        factoryName: "vithal sahakari",
        employeeName: "Ramu",
        employeeCode: "2",
        address: "pandharpur",
        village: "kassagoan",
        taluka: "pandharpur",
        district: "solapur",
        state: "Maharashtra",
        designation: "Mukadum",
        aadhar: "123456654321",
        pan: "gfddplo6543e",
        mobile1: "1233212344",
        mobile2: "string",
        createdBy: "vikas l",
        role: "manager",
        createdDate: "2025-08-30T12:27:05.05"
      }
    ];

      }
    })
  }
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
