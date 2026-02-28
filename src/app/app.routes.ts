import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { HomePage } from './pages/home/home-page';
import { LoginPage } from './pages/login/login-page';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginPage, canActivate: [loginGuard] },
  { path: 'home', component: HomePage, canActivate: [authGuard] }
];
