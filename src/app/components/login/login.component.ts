import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Login with IBM Cloud</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>IBM Cloud Email</mat-label>
            <input matInput formControlName="email" required type="email">
            <mat-error *ngIf="loginForm.get('email')?.hasError('required')">Email is required</mat-error>
            <mat-error *ngIf="loginForm.get('email')?.hasError('email')">Please enter a valid email address</mat-error>
          </mat-form-field>
          
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Password</mat-label>
            <input matInput type="password" formControlName="password" required>
            <mat-error *ngIf="loginForm.get('password')?.hasError('required')">Password is required</mat-error>
          </mat-form-field>
          
          <button mat-raised-button color="primary" type="submit" [disabled]="!loginForm.valid" class="full-width">
            Log in
          </button>
        </form>
        <div class="login-options">
          <a href="#" class="forgot-password">Forgot password?</a>
          <a href="#" class="create-account">Create an account</a>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
    mat-card {
      max-width: 400px;
      margin: 2em auto;
      text-align: center;
    }
    .login-options {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
    }
    .login-options a {
      color: #0f62fe;
      text-decoration: none;
      font-size: 0.875rem;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Here you would typically call an IBM Cloud authentication service
      // For this example, we'll just simulate a successful login
      console.log('Logging in with IBM Cloud credentials:', this.loginForm.value);
      this.router.navigate(['/dashboard']);
    }
  }
}