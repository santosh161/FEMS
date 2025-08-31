import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/model/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit, OnChanges {
  @Input() employee: Employee | null = null;   // input for edit mode
  @Output() saveEmployee = new EventEmitter<Employee>();
  @Output() closeForm = new EventEmitter<void>();

  empForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee'] && this.employee) {
      this.empForm.patchValue(this.employee); // load employee data for edit
    }
  }

  buildForm() {
    this.empForm = this.fb.group({
      factoryName: ['', Validators.required],
      workerName: ['', Validators.required],
      workerCode: ['', Validators.required],
      address: [''],
      village: [''],
      taluka: [''],
      district: [''],
      state: [''],
      designation: [''],
      aadhaar: [''],
      pan: [''],
      mobile1: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      mobile2: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      salary: ['', Validators.pattern(/^[0-9]+$/)]
    });
  }

  onSubmit() {
    this.saveEmployee.emit(this.empForm.value);
    // if (this.empForm.valid) {
    //   this.saveEmployee.emit(this.empForm.value);
    //   this.empForm.reset();
    // }
  }

  onCancel() {
    this.closeForm.emit();
    this.empForm.reset();
  }
}
