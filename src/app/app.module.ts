// app.module.ts

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AppComponent } from './app.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    EmployeeDetailComponent,
    // Other components
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule, // Add RouterModule
    AppRoutingModule, NgbModule, // Add AppRoutingModule
    ReactiveFormsModule, BrowserAnimationsModule,
    PaginationModule.forRoot()
    // Other modules and imports
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
