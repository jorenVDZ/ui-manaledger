import { Component, computed, input, output, signal } from '@angular/core';
import { Tooltip } from 'primeng/tooltip';
import { Card } from './../../../generated/graphql';

@Component({
  selector: 'app-card-list-item',
  imports: [Tooltip],
  templateUrl: './card-list-item.html',
})
export class CardListItem {
  card = input<Card>();
  openCard = output<Card>();
  currentFaceIndex = signal(0);

  hasFaces = computed(() => {
    const cardData = this.card();
    return cardData?.faces && cardData.faces.length > 1;
  });

  cardImage = computed(() => {
    const cardData = this.card();
    if (!cardData) return undefined;

    // For multi-faced cards, use the selected face
    if (cardData.faces && cardData.faces.length > 0) {
      const faceIndex = Math.min(this.currentFaceIndex(), cardData.faces.length - 1);
      const face = cardData.faces[faceIndex];
      if (face.imageUris) {
        return face.imageUris.large;
      }
    }

    // For single-faced cards, use the main imageUris
    if (cardData.imageUris) {
      return cardData.imageUris.large;
    }

    return undefined;
  });

  flipCard() {
    const cardData = this.card();
    if (cardData?.faces && cardData.faces.length > 0) {
      const facesLength = cardData.faces.length;
      this.currentFaceIndex.update(index => (index + 1) % facesLength);
    }
  }
}
