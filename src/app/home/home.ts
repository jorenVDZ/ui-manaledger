import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  standalone: true
})
export class HomeComponent {
  private router = inject(Router);
  protected authService = inject(AuthService);

  constructor() {
    // Redirect to login if not authenticated
    effect(() => {
      if (!this.authService.currentUser()) {
        this.router.navigate(['/login']);
      }
    });
  }
}
