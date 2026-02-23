import { Component, computed, input, signal } from '@angular/core';
import { Tooltip } from 'primeng/tooltip';
import { Card } from './../../../generated/graphql';

@Component({
  selector: 'app-card-list-item',
  imports: [Tooltip],
  templateUrl: './card-list-item.html',
})
export class CardListItem {
  card = input<Card>();
  currentFaceIndex = signal(0);

  hasFaces = computed(() => {
    const cardData = this.card();
    return cardData?.cardFaces && cardData.cardFaces.length > 1;
  });

  cardImage = computed(() => {
    const cardData = this.card();
    if (!cardData) return undefined;

    // For multi-faced cards, use the selected face
    if (cardData.cardFaces && cardData.cardFaces.length > 0) {
      const faceIndex = Math.min(this.currentFaceIndex(), cardData.cardFaces.length - 1);
      const face = cardData.cardFaces[faceIndex];
      if (face.imageUris) {
        return face.imageUris.large || face.imageUris.normal || face.imageUris.small || undefined;
      }
    }

    // For single-faced cards, use the main imageUris
    if (cardData.imageUris) {
      return cardData.imageUris.large || cardData.imageUris.normal || cardData.imageUris.small || undefined;
    }

    return undefined;
  });

  flipCard() {
    const cardData = this.card();
    if (cardData?.cardFaces && cardData.cardFaces.length > 0) {
      const facesLength = cardData.cardFaces.length;
      this.currentFaceIndex.update(index => (index + 1) % facesLength);
    }
  }
}
