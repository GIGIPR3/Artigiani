import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-registrati',
  templateUrl: './registrati.component.html',
  styleUrls: ['./registrati.component.css'],
})
export class RegistratiComponent {
  userForm: FormGroup; // Define a FormGroup

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Initialize the FormGroup with form controls and validators
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  save() {
    if (this.userForm.valid) {
      // Form is valid, you can access form values using this.userForm.value
      const bodyData = this.userForm.value;

      this.http
        .post('http://localhost:8080/api/user/save', bodyData, {
          responseType: 'text',
        })
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
          next: (resultData: any) => {
            console.log(resultData);
            alert('User Registered Successfully');
          },
        });
    }
  }
}
