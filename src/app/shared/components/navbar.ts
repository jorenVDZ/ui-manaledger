import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, AvatarModule],
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  private router = inject(Router);
  protected authService = inject(AuthService);

  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  getUserInitial(): string {
    const email = this.authService.currentUser()?.email;
    return email ? email.charAt(0).toUpperCase() : '';
  }

  async onLogout() {
    try {
      await this.authService.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
}
