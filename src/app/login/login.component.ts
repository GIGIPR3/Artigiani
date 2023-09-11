import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { LoggedUserService } from '../service/logged-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private logauth: LoggedUserService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  Login() {
    console.log(this.loginForm.value.email);
    this.http
      .post('http://localhost:5000/api/user/login', this.loginForm.value)
      .subscribe((resultData: any) => {
        console.log(resultData);

        if (resultData.message == 'Email not exits') {
          alert('Email not exits');
          console.log(resultData);
        } else if (resultData.message == 'Login Success') {
          console.log(resultData);
          this.http
            .get<User>(
              `http://localhost:5000/api/user/getByEmail/${this.loginForm.value.email}`
            )
            .subscribe({
              next: (res: User) => {
                this.logauth.user = res;
                this.logauth.updateCookies();
                if (this.logauth.user.role === 'admin') {
                  this.router.navigate(['/admin']);
                } else {
                  this.router.navigate(['']);
                }
              },
              error: (error) => {
                console.error('Error:', error);
              },
            });
        } else {
          alert('Incorrect Email and Password not match');
        }
      });
  }
}
