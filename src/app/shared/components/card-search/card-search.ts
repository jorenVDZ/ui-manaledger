import { AsyncPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { QueryRef } from 'apollo-angular';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { debounceTime, map, Observable, shareReplay, startWith, switchMap, tap } from 'rxjs';
import { Card, SearchCardsDocument, SearchCardsGQL, SearchCardsQuery, SearchCardsQueryVariables } from '../../../generated/graphql';
import { CardView } from '../card-view/card-view';

@Component({
  selector: 'app-card-search',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    SkeletonModule,
    Button,
    AsyncPipe,
    CardView,
  ],
  templateUrl: './card-search.html',
})
export class CardSearch {
  private readonly _fb = inject(NonNullableFormBuilder);
  private readonly _searchCardsGQL = inject(SearchCardsGQL);

  private readonly _limit = 20;
  private _offset = 0;

  searchForm = this._fb.group({
    searchTerm: ['']
  });

  loading = signal(false);
  hasMore = signal(false);
  endCursor = signal<string | null>(null);
  total = signal(0);

  private _searchCardsQuery?: QueryRef<SearchCardsQuery, SearchCardsQueryVariables>;

  searchInput$ = this.searchForm.get('searchTerm')!.valueChanges.pipe(
    takeUntilDestroyed(),
    debounceTime(150),
    startWith(''),
  );

  cards$: Observable<Card[]> = this.searchInput$.pipe(
    takeUntilDestroyed(),
    switchMap((searchTerm: string) => {
      if (!searchTerm || searchTerm.trim().length < 3) {
        searchTerm = '';
      }

      this._offset = 0;
      this.loading.set(true);
      const searchVariables = {
        query: searchTerm.trim(),
        first: this._limit,
        after: null
      }

      this._searchCardsQuery = this._searchCardsGQL.watch({ variables: searchVariables, fetchPolicy: 'cache-first' });
        return this._searchCardsQuery.valueChanges.pipe(
        tap((result: any) =>{
          this.total.set(result?.data?.searchCards?.total ?? 0);
          this.hasMore.set(result?.data?.searchCards?.pageInfo?.hasNextPage ?? false);
          this.endCursor.set(result?.data?.searchCards?.pageInfo?.endCursor ?? null);
          this.loading.set(result?.loading);
        }),
        map((result: any) => result?.data?.searchCards?.edges?.map((edge: any) => edge.node) || [] as Card[]),
      );
    }),
    shareReplay(1)
  );

  initialLoading = computed(() => this.loading() && !this.endCursor());
  loadingMoreCards = computed(() => this.loading() && this.endCursor());

  fetchMore() {
    if (this._searchCardsQuery) {
      this._offset += this._limit;
      this._searchCardsQuery.fetchMore({
        query: SearchCardsDocument,
        variables: {
          query: this.searchForm.get('searchTerm')!.value.trim(),
          first: this._limit,
          after: this.endCursor()
        },
      });
    }
  }

  onEnter(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    const target = keyboardEvent.target as HTMLInputElement | null;
    if (target && typeof target.blur === 'function') {
      target.blur();
    }
  }
}





