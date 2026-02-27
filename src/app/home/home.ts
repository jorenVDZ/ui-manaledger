import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { Card, SearchCardsGQL } from '../generated/graphql';
import { AuthService } from '../services/auth.service';
import { CardDetail } from './components/card-detail/card-detail';
import { CardListItem } from './components/card-list-item/card-list-item';
import { MobileCardList } from './components/mobile-card-list/mobile-card-list';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, CardListItem, MobileCardList, CardDetail, InputText, Button, SkeletonModule],
  templateUrl: './home.html',
  standalone: true
})
export class HomeComponent {
  private readonly _authService = inject(AuthService);
  private readonly _searchCards = inject(SearchCardsGQL);

  readonly authService = this._authService;

  searchQuery = signal('');
  cards = signal<Card[]>([]);
  loading = signal(false);
  loadingMore = signal(false);
  hasMore = signal(false);
  total = signal(0);
  hasSearched = signal(false);
  showScrollTop = signal(false);
  selectedCardId = signal<string | null>(null);
  detailVisible = signal(false);
  private limit = 20;
  private offset = 0;

  constructor() {
    // Auto-search with debounce
    toObservable(this.searchQuery)
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((query) => {
          const trimmedQuery = query.trim();

          if (trimmedQuery.length < 3) {
            this.cards.set([]);
            this.hasMore.set(false);
            this.total.set(0);
            this.hasSearched.set(false);
            this.loading.set(false);
            return of(null);
          }

          this.offset = 0;
          this.loading.set(true);

          return this._searchCards.fetch({
            variables: {
              query: trimmedQuery,
              limit: this.limit,
              offset: this.offset
            }
          });
        }),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (result) => {
          if (result?.data) {
            this.cards.set(result.data.searchCards.cards as Card[]);
            this.hasMore.set(result.data.searchCards.hasMore);
            this.total.set(result.data.searchCards.total);
            this.hasSearched.set(true);
          }
          this.loading.set(false);
        },
        error: () => {
          this.hasSearched.set(true);
          this.loading.set(false);
        }
      });
  }

  openDetail(card: Card) {
    this.selectedCardId.set(card.id);
    this.detailVisible.set(true);
  }

  closeDetail() {
    this.detailVisible.set(false);
    this.selectedCardId.set(null);
  }

  loadMore() {
    const query = this.searchQuery().trim();
    if (query.length < 3 || this.loadingMore()) return;

    this.offset += this.limit;
    this.loadingMore.set(true);

    this._searchCards.fetch({
      variables: {
        query,
        limit: this.limit,
        offset: this.offset
      }
    }).subscribe({
      next: (result) => {
        if (result.data) {
          this.cards.set([...this.cards(), ...(result.data.searchCards.cards as Card[])]);
          this.hasMore.set(result.data.searchCards.hasMore);
          this.total.set(result.data.searchCards.total);
        }
        this.loadingMore.set(false);
      },
      error: () => {
        this.loadingMore.set(false);
      }
    });
  }

  onMobileLoadMore() {
    // Only load more if there are more cards and not currently loading
    if (this.hasMore() && !this.loadingMore()) {
      this.loadMore();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Show button when scrolled down more than 300px
    this.showScrollTop.set(window.scrollY > 300);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
