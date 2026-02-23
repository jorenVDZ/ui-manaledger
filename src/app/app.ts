import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './shared/components/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NavbarComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ui-manaledger');
  private router = inject(Router);
  showNavbar = signal(false);

  constructor() {
    // Set initial navbar visibility
    this.showNavbar.set(!this.router.url.includes('/login'));

    // Update navbar visibility based on route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showNavbar.set(!event.url.includes('/login'));
      });
  }
}
