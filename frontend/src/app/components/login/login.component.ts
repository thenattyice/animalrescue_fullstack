import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public formError: string = '';
  public isLoading: boolean = false;

  credentials = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService) {}

  private doLogin(): void {
    this.isLoading = true;
    this.authService
      .login(this.credentials.email, this.credentials.password)
      .subscribe({
        next: () => {
          this.isLoading = false;
        },
        error: (err) => {
          this.formError = 'Invalid email or password';
          this.isLoading = false;
        },
      });
  }

  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
      return;
    } else {
      this.doLogin();
    }
  }
}
