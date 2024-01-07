// employee.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DUMMY_EMPLOYEES } from './dummy-data';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees = DUMMY_EMPLOYEES;

  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }

  getEmployeeById(id: string): Observable<Employee | undefined> {
    // Convert the id to a number before using it in the find function
    return of(this.employees.find(employee => employee.id === Number(id)));
  }

  getEmployeesWithParams(params: any): Observable<{ employees: Employee[], totalItems: number }> {
    const filteredEmployees = this.filterEmployees(params);
    const slicedEmployees = this.sliceEmployees(filteredEmployees, params.page, params.pageSize);

    return of({ employees: slicedEmployees, totalItems: filteredEmployees.length });
  }

  login(username: string, lastName: string): Observable<boolean> {
    const user = this.employees.find(u => u.username === username && u.lastName === lastName);
    if (user) {
      // Simulate successful login
      return of(true);
    } else {
      // Simulate failed login
      return of(false);
    }
  }

  // Add other methods as needed
  private filterEmployees(params: any): Employee[] {
    const searchTerm = params.searchTerm?.toLowerCase();
    return searchTerm
      ? this.employees.filter(employee =>
        employee.username.toLowerCase().includes(searchTerm) ||
        employee.firstName.toLowerCase().includes(searchTerm) ||
        employee.lastName.toLowerCase().includes(searchTerm))
      : this.employees;
  }


  private sliceEmployees(employees: Employee[], page: number, pageSize: number): Employee[] {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return employees.slice(startIndex, endIndex);
  }
}
