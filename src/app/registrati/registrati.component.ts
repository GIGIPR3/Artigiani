import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { LoggedUserService } from '../service/logged-user.service';

@Component({
  selector: 'app-registrati',
  templateUrl: './registrati.component.html',
  styleUrls: ['./registrati.component.css'],
})
export class RegistratiComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private logauth: LoggedUserService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  save() {
    if (this.userForm.valid) {
      const bodyData = this.userForm.value;
      console.log(bodyData);

      this.http
        .post('http://localhost:8080/api/user/save', bodyData)
        .pipe(
          catchError((error) => {
            console.error('Error:', error);
            if (error.status === 400) {
              alert('Email is already registered or invalid');
            } else {
              alert('An error occurred while registering the user');
            }
            return of();
          })
        )
        .subscribe({
          next: (res: any) => {
            this.logauth.user = res;
            this.logauth.updateCookies();
            if (this.logauth.user!.role === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/marketplace']);
            }
          },
        });
    }
  }
}
