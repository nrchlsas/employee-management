import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public username: string = '';
  public password: string = '';
  public errorMessage: string = '';
  public isLoginSuccess: boolean = false;


  constructor(private router: Router,private employeeService: EmployeeService) {}

  ngOnInit(): void {
  }
  public login(): void {
    this.employeeService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/employee-list']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }

  public closeModal(): void {
    this.isLoginSuccess = false;
  }
}
