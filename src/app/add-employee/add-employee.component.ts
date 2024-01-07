import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  newEmployee: Employee = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    basicSalary: 0,
    status: '',
    group: '',
    description: ''
  };
  public isAddSuccessModalOpen: boolean = false;
  public formValue: Employee = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    basicSalary: 0,
    status: '',
    group: '',
    description: ''
  };
  employeeForm: FormGroup = new FormGroup({});
  dummyGroups: string[] = ['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5', 'Group 6', 'Group 7', 'Group 8', 'Group 9', 'Group 10'];
  dummyStatus: string[] = ['Active', 'Non Active'];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      birthDate: ['', [Validators.required, this.validateBirthDate]],
      basicSalary: ['', Validators.required],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['']
    });
  }

  saveEmployee(): void {
    this.formValue = this.employeeForm.value;
    if (this.employeeForm.valid) {
      this.isAddSuccessModalOpen = true;
    }
  }

  public closeAddSuccessModal(): void {
    this.router.navigate(['/employee-list']);
  }

  cancel(): void {
    this.router.navigate(['/employee-list']);
  }

  validateBirthDate(control: any): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      return { 'futureDate': true };
    }

    return null;
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  }
}
