import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { Card, SearchCardsGQL } from '../generated/graphql';
import { AuthService } from '../services/auth.service';
import { CardListItem } from './components/card-list-item/card-list-item';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, CardListItem, InputText, Button],
  templateUrl: './home.html',
  standalone: true
})
export class HomeComponent {
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _searchCards = inject(SearchCardsGQL);

  readonly authService = this._authService;

  searchQuery = signal('');
  cards = signal<Card[]>([]);
  loading = signal(false);
  hasMore = signal(false);
  total = signal(0);
  private limit = 20;
  private offset = 0;

  constructor() {
    effect(() => {
      if (!this._authService.currentUser()) {
        this._router.navigate(['/login']);
      }
    });

    // Auto-search with debounce
    toObservable(this.searchQuery)
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(query => query.trim().length > 0),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.onSearch();
      });
  }

  onSearch() {
    const query = this.searchQuery().trim();
    if (!query) return;

    this.offset = 0;
    this.loading.set(true);

    this._searchCards.fetch({
      variables: {
        query,
        limit: this.limit,
        offset: this.offset
      }
    }).subscribe({
      next: (result) => {
        if (result.data) {
          this.cards.set(result.data.searchCards.cards as Card[]);
          this.hasMore.set(result.data.searchCards.hasMore);
          this.total.set(result.data.searchCards.total);
        }
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  loadMore() {
    const query = this.searchQuery().trim();
    if (!query || this.loading()) return;

    this.offset += this.limit;
    this.loading.set(true);

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
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}
