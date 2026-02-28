import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';
import { map, of, switchMap } from 'rxjs';
import { Card, GetCardByIdGQL } from '../../../generated/graphql';
import { CardListItem } from '../card-list-item/card-list-item';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [CommonModule, DialogModule, AsyncPipe, CardListItem, SkeletonModule],
  templateUrl: './card-detail.html',
  styleUrls: ['./card-detail.css'],
})
export class CardDetail {
  private readonly _getCardById = inject(GetCardByIdGQL);

  cardId = input.required<string>();
  visible = input<boolean>(false);
  hide = output<void>();

  // keep the raw result observable so we can expose loading state
  private readonly result$ = toObservable(this.cardId).pipe(
    switchMap((id) => this._getCardById.watch({ variables: { scryfallId: id } }).valueChanges)
  );

  card$ = this.result$.pipe(map((result) => result?.data?.card as Card));

  // loading$ = this.result$.pipe(map((result) => !!result?.loading));
  loading$ = of(true);

  // track which face is shown for multi-face cards
  selectedFaceIndex = signal(0);

  // selectedFaceIndex used by the template to highlight thumbnails

  close() {
    this.hide.emit();
  }

  // compute dialog style object so width can be adjusted responsively
  dialogStyle() {
    try {
      const w = window.innerWidth;
      if (w <= 420) return { width: '98vw' };
      if (w <= 768) return { width: '95vw' };
      return { width: '75vw' };
    } catch {
      return { width: '75vw' };
    }
  }
}
