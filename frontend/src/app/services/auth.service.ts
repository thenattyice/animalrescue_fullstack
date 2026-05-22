import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'animalrescue-token';
  private apiUrl = 'http://localhost:3000/api';
  // Setup our storage and service access
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  // Get our token from our Storage provider.
  // NOTE: For this application we have decided that we will name
  // the key for our token 'animalrescue-token'
  public getToken(): string {
    return sessionStorage.getItem(this.tokenKey) ?? ''; // Return an empty string if no token
  }

  // Save the token to our session storage
  public saveToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  // Logout of our application and remove the JWT from Storage
  public logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']); // Log the user out to the log in page
  }

  // Boolean to determine if we are logged in and the token is
  // still valid. Even if we have a token we will still have to
  // reauthenticate if the token has expired
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  // Retrieve the current user. This function should only be called
  // after the calling method has checked to make sure that the user
  // isLoggedIn.
  public getCurrentUser(): User {
    const token: string = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }

  // Login method
  public login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((response: AuthResponse) => {
          this.saveToken(response.token);
          this.router.navigate(['']);
        }),
      );
  }

  // Register method
  public register(
    name: string,
    email: string,
    password: string,
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/register`, {
        name,
        email,
        password,
      })
      .pipe(
        tap((response: AuthResponse) => {
          this.saveToken(response.token);
          this.router.navigate(['']);
        }),
      );
  }
}
