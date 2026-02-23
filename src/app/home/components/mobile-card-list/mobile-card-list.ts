import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, HostListener, input, output, QueryList, ViewChildren } from '@angular/core';
import { Card } from '../../../generated/graphql';

@Component({
  selector: 'app-mobile-card-list',
  imports: [CommonModule],
  templateUrl: './mobile-card-list.html',
  styleUrls: ['./mobile-card-list.css'],
  standalone: true
})
export class MobileCardList {
  cards = input<Card[]>([]);
  loading = input<boolean>(false);
  hasMore = input<boolean>(true);
  loadMore = output<void>();
  focusedIndex: number = 0;
  cardFaceIndices: Map<string, number> = new Map();

  @ViewChildren('cardElement') cardElements!: QueryList<ElementRef>;
  private loadMoreObserver: IntersectionObserver | null = null;
  private isLoadingMore: boolean = false;
  private previousCardCount: number = 0;
  private lastTriggerTime: number = 0;
  private readonly TRIGGER_COOLDOWN = 1000; // 1 second cooldown between triggers

  constructor() {
    effect(() => {
      const currentCards = this.cards();
      // Reset loading flag when new cards are loaded
      if (currentCards.length > this.previousCardCount) {
        this.isLoadingMore = false;
        this.previousCardCount = currentCards.length;
        // Re-observe the last card after new cards are added
        setTimeout(() => {
          this.observeLastCard();
        }, 100);
      }
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.updateFocusedCard();
  }

  ngAfterViewInit() {
    // Set initial focused card
    setTimeout(() => {
      this.updateFocusedCard();
    }, 100);

    this.setupLoadMoreObserver();

    // Subscribe to changes in the card elements list
    this.cardElements.changes.subscribe(() => {
      // Add a small delay to ensure DOM is fully updated
      setTimeout(() => {
        this.observeLastCard();
      }, 50);
    });

    // Initial observation after a delay to ensure rendering
    setTimeout(() => {
      this.observeLastCard();
    }, 200);
  }

  ngOnDestroy() {
    this.loadMoreObserver?.disconnect();
  }

  private setupLoadMoreObserver() {
    const options = {
      root: null,
      rootMargin: '500px',
      threshold: 0
    };

    this.loadMoreObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const now = Date.now();
        const timeSinceLastTrigger = now - this.lastTriggerTime;

        if (entry.isIntersecting &&
            !this.isLoadingMore &&
            !this.loading() &&
            this.hasMore() &&
            timeSinceLastTrigger >= this.TRIGGER_COOLDOWN) {
          this.isLoadingMore = true;
          this.lastTriggerTime = now;
          this.loadMore.emit();
        }
      });
    }, options);

    this.observeLastCard();
  }

  private observeLastCard() {
    if (!this.loadMoreObserver) return;

    if (!this.cardElements || this.cardElements.length === 0) {
      return;
    }

    const lastElement = this.cardElements.last?.nativeElement;
    if (lastElement) {
      // Disconnect and observe the new last element
      this.loadMoreObserver.disconnect();
      this.loadMoreObserver.observe(lastElement);
    }
  }

  private updateFocusedCard() {
    if (!this.cardElements || this.cardElements.length === 0) return;

    const viewportCenter = window.innerHeight / 2 + window.scrollY;
    let closestIndex = 0;
    let closestDistance = Infinity;

    this.cardElements.forEach((el, index) => {
      const element = el.nativeElement;
      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + window.scrollY + rect.height / 2;
      const distance = Math.abs(elementCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    this.focusedIndex = closestIndex;
  }

  isFocused(index: number): boolean {
    return this.focusedIndex === index;
  }

  trackByCardId(index: number, card: Card): string {
    return card.id;
  }

  hasFaces(card: Card): boolean {
    return !!card.cardFaces && card.cardFaces.length > 1;
  }

  getCurrentFaceIndex(card: Card): number {
    return this.cardFaceIndices.get(card.id) || 0;
  }

  flipCard(card: Card, event: Event) {
    event.stopPropagation();
    if (card.cardFaces && card.cardFaces.length > 0) {
      const currentIndex = this.getCurrentFaceIndex(card);
      const nextIndex = (currentIndex + 1) % card.cardFaces.length;
      this.cardFaceIndices.set(card.id, nextIndex);
    }
  }

  getCardImage(card: Card): string | undefined {
    // For multi-faced cards, use the selected face
    if (card.cardFaces && card.cardFaces.length > 0) {
      const faceIndex = Math.min(this.getCurrentFaceIndex(card), card.cardFaces.length - 1);
      const face = card.cardFaces[faceIndex];
      if (face.imageUris) {
        return face.imageUris.normal || face.imageUris.large || face.imageUris.small || undefined;
      }
    }

    // For single-faced cards, use the main imageUris
    if (card.imageUris) {
      return card.imageUris.normal || card.imageUris.large || card.imageUris.small || undefined;
    }

    return undefined;
  }
}
