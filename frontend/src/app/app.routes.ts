import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DogListComponent } from './components/dogs/dog-list/dog-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dogs', component: DogListComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }, // Wildcard - redirects unknown routes to home
];
