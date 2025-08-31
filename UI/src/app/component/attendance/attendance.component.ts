import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { Employee } from 'src/app/model/employee.model';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent {
  adminData:any
  employees: any[] = [
    {
      factoryName: 'ABC Factory',
      workerName: 'Santosh Devkate',
      code: 'EMP001',
      Todays: 'A'
    },
    {
      factoryName: 'XYZ Factory',
      workerName: 'Rohit Sharma',
      code: 'EMP002',
      Todays: 'p'
    },
   
  ];
  constructor(private  apiService: AuthService, private router: Router,private toastr: ToastrService) {}
  
  selectedEmployee: any = null; 
  showForm: boolean = false;  
  today: any;
  ngOnInit() {
    const storedData = localStorage.getItem('adminData');
    if (storedData) {
      this.adminData = JSON.parse(storedData);
    }
    const now = new Date();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[now.getDay()]; // getDay() returns 0-6
  
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const year = now.getFullYear();
  
    this.today = `${dayName}, ${day}-${month}-${year}`;
  }  

  // open form for new employee
  // onAddEmployee() {
  //   this.selectedEmployee = null;
  //   this.showForm = true;
  // }

  // open form with existing employee for edit
  // onEditEmployee(emp: any) {
  //   this.selectedEmployee = { ...emp };
  //   this.showForm = true;
  // }

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


  

  toggleAttendance(emp: any) {
    // emp.attendance is already updated by [(ngModel)]
    console.log(emp.workerName, 'Attendance:', emp.attendance);
  
    const request = {
      adminName: this.adminData.adminName,
      role: this.adminData.role,
      employeeId: emp.id,
      date: new Date(),
      status: emp.attendance ? 'Present' : 'Absent'
    };
  
    // this.apiService.markAttendance(request).subscribe({
    //   next: res => console.log('Attendance saved', res),
    //   error: err => {
    //     console.error('Failed to save attendance', err);
    //     // revert toggle if failed
    //     emp.attendance = !emp.attendance;
    //   }
    // });
  }
  
}
