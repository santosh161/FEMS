import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent {
  employees = [
    {
      employeeName: 'Ramu',
      employeeCode: '001',
      designation: 'Manager',
      basicSalary: 30000,
      hra: 5000,
      grossSalary: 40000,
      deductions: 5000,
      netSalary: 35000,
      attendanceRecords: [
        { date: '2025-08-25', status: 'Present' },
        { date: '2025-08-26', status: 'Absent' },
        { date: '2025-08-27', status: 'Present' }
      ]
    }
  ];

  showDetailsModal = false;
  selectedEmployee: any;

  constructor(private apiService: AuthService, private router: Router, private toastr: ToastrService) {}

  viewEmployeeDetails(emp: any) {
    this.selectedEmployee = emp;
    this.showDetailsModal = true;
  }

  getWeeklySummary(employee: any) {
    if (!employee || !employee.attendanceRecords) return { present: 0, absent: 0 };
  
    const last7Days = employee.attendanceRecords.slice(-7);
    const present = last7Days.filter((r: any) => r.status === 'Present').length;
    const absent = last7Days.filter((r: any) => r.status === 'Absent').length;
  
    return { present, absent };
  }
  
  getMonthlySummary(employee: any) {
    if (!employee || !employee.attendanceRecords) return { present: 0, absent: 0 };
  
    const present = employee.attendanceRecords.filter((r: any) => r.status === 'Present').length;
    const absent = employee.attendanceRecords.filter((r: any) => r.status === 'Absent').length;
  
    return { present, absent };
  }
  
}
