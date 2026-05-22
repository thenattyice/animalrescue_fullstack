import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public formError: string = '';
  public isLoading: boolean = false;

  credentials = {
    name: '',
    email: '',
    password: '',
  };

  constructor(private authService: AuthService) {}

  private doRegister(): void {
    this.isLoading = true;
    this.authService
      .register(
        this.credentials.name,
        this.credentials.email,
        this.credentials.password,
      )
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

  public onRegisterSubmit(): void {
    this.formError = '';
    if (
      !this.credentials.name ||
      !this.credentials.email ||
      !this.credentials.password
    ) {
      this.formError = 'All fields are required, please try again';
      return;
    } else {
      this.doRegister();
    }
  }
}
