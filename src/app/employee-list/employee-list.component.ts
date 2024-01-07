import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  public employees: Employee[] = [];
  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  public searchTerm: string = '';
  public isEditModalOpen: boolean = false;
  public isDeleteModalOpen: boolean = false;
  public selectedEmployee: Employee = {} as Employee;
  public dummyGroups: string[] = ["Group 1", "Group 2", "Group 3", "Group 4", "Group 5", "Group 6", "Group 7", "Group 8", "Group 9", "Group 10"];

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.fetchData();
  }

  viewEmployeeDetails(employee: Employee): void {
    this.router.navigate(['/employee-detail', employee.id]);
  }

  navigateToAddEmployee(): void {
    this.router.navigate(['/add-employee']);
  }

  public onPageChange(event: PageChangedEvent): void {
    this.currentPage = event.page;
    this.fetchData();
    console.log(event.page)
  }

  public onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.currentPage = 1;
    this.fetchData();
  }

  public onSearch(): void {
    this.fetchData();
  }

  public openEditModal(employee: Employee): void {
    this.selectedEmployee = { ...employee };
    if (!this.dummyGroups.includes(this.selectedEmployee.group)) {
      this.selectedEmployee.group = this.dummyGroups[0];
    }
    this.isEditModalOpen = true;
  }

  public saveEdit(): void {
    this.isEditModalOpen = false;
  }

  public openDeleteModal(employee: Employee): void {
    this.selectedEmployee = { ...employee };
    this.isDeleteModalOpen = true;
  }

  public confirmDelete(): void {
    this.isDeleteModalOpen = false;
  }

  public cancelDelete(): void {
    this.isDeleteModalOpen = false;
  }

  private fetchData(): void {
    const params = {
      page: this.currentPage,
      pageSize: this.pageSize,
      searchTerm: this.searchTerm,

    };

    this.employeeService.getEmployeesWithParams(params).subscribe(result => {
      this.employees = result.employees;
      this.totalItems = result.totalItems;
    });
  }
}
