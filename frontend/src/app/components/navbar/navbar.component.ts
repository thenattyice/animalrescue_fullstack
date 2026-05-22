import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  get currentUser(): User | null {
    return this.authService.isLoggedIn()
      ? this.authService.getCurrentUser()
      : null;
  }

  logout(): void {
    this.authService.logout();
  }
}
