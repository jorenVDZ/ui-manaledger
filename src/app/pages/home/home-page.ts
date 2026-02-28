import { Component, HostListener, signal } from '@angular/core';
import { CardSearch } from '../../shared/components/card-search/card-search';

@Component({
  selector: 'app-home',
  imports: [
    CardSearch
  ],
  templateUrl: './home-page.html',
})
export class HomePage {
  showScrollTop = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTop.set(window.scrollY > 300);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
