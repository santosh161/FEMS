import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
declare var bootstrap: any;


//import { Employee } from 'src/app/model/employee.model';
type Status = 'Full Day' | 'Half Day' | 'Late' | 'Absent' | null;

interface Employee {
  id: number;
  name: string;
  designation: string;
  status: Status;
  
  // add other fields if needed (employeeCode, factory, etc.)
}
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent {
  employees: Employee[] = [];
  selectedDate: Date = new Date();
  designations: string[] = ['Supervisor', 'Manager', 'Driver', 'Worker'];
  selectedDates: string[] = [];

  // UI state
  selectedDesignation: string = '';
  searchTerm: string = '';
  emp: any = { name: 'John Doe', designation: 'Developer', status: '' };
  today: string = new Date().toISOString().split('T')[0];
  isPopupOpen = false;
  useselectedDate: string = '';


  ngOnInit(): void {
    // Dummy data (replace with API fetch)
    this.employees = [
      { id: 1, name: 'John Smith', designation: 'Supervisor', status: null },
      { id: 2, name: 'Sarah Johnson', designation: 'Manager', status: null },
      { id: 3, name: 'Mike Brown', designation: 'Driver', status: null },
      { id: 4, name: 'Priya Desai', designation: 'Worker', status: null },
      { id: 5, name: 'Ramesh Patil', designation: 'Supervisor', status: null },
      { id: 6, name: 'Asha More', designation: 'Worker', status: null },
      { id: 7, name: 'Vikram Rao', designation: 'Driver', status: null },
      { id: 8, name: 'Sita Kulkarni', designation: 'Manager', status: null }
    ];
  }

  // --- Filtering & getters ---

  // Employees after applying dropdown + search filters
  get filteredEmployees(): Employee[] {
    const term = this.searchTerm?.trim().toLowerCase() ?? '';
    return this.employees.filter(emp => {
      const matchDesignation = this.selectedDesignation
        ? emp.designation.toLowerCase() === this.selectedDesignation.toLowerCase()
        : true;

      const matchSearch = term
        ? (emp.name.toLowerCase().includes(term) ||
           (emp.designation && emp.designation.toLowerCase().includes(term)))
        : true;

      return matchDesignation && matchSearch;
    });
  }

  // Summary counts based on the currently visible (filtered) list
  get summary() {
    const list = this.filteredEmployees;
    const fullDay = list.filter(e => e.status === 'Full Day').length;
    const halfDay = list.filter(e => e.status === 'Half Day').length;
    const late = list.filter(e => e.status === 'Late').length;
    const absent = list.filter(e => e.status === 'Absent').length;
    const pending = list.filter(e => e.status === null).length;
    return { fullDay, halfDay, late, absent, pending };
  }

  // Total number of marked employees across whole dataset (used in Save button)
  get totalMarked(): number {
    return this.employees.filter(e => e.status !== null).length;
  }

  // --- Actions ---

  // Mark single employee
  markAttendance(emp: Employee, status: Exclude<Status, null>): void {
    emp.status = status;
    // Angular change detection will update UI automatically
  }

  // Mark all filtered employees (only visible ones)
  markAllFiltered(status: Exclude<Status, null>): void {
    const filtered = this.filteredEmployees;
    filtered.forEach(fe => {
      const original = this.employees.find(e => e.id === fe.id);
      if (original) original.status = status;
    });
  }

  // Clear statuses for filtered employees
  clearAllFiltered(): void {
    const filtered = this.filteredEmployees;
    filtered.forEach(fe => {
      const original = this.employees.find(e => e.id === fe.id);
      if (original) original.status = null;
    });
  }

  // Save attendance (hook this to API)
  saveAttendance(): void {
    const marked = this.totalMarked;
    // replace with API call
    console.log('Saving attendance payload:', this.employees);
    alert(`Attendance saved for ${marked} employee(s).`);
  }

  // Helpers for template (optional)
  trackByEmployee(index: number, emp: Employee) {
    return emp.id;
  }


  openPopup() {
    this.selectedDates = []; // reset on open
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  addDate(event: any) {
    const date = event.target.value;
    if (date && !this.selectedDates.includes(date)) {
      this.selectedDates.push(date);
    }
    event.target.value = ""; // reset picker so user can pick same again
  }

  removeDate(index: number) {
    this.selectedDates.splice(index, 1);
  }

  submitDates() {
    if (this.selectedDates.length > 0) {
      this.emp.status = `Updated with ${this.selectedDates.length} dates`;
      this.closePopup();
    } else {
      alert('Please select at least one date!');
    }
  }
 
}
