import { Component, computed, input, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { Card } from '../../../generated/graphql';

@Component({
  selector: 'app-card-view',
  imports: [
    Tooltip,
    Button
  ],
  templateUrl: './card-view.html',
  styleUrls: ['./card-view.css']
})
export class CardView {
  card = input.required<Card>();
  showTooltip = input<boolean>(true);

  currentFaceIndex = signal(0);

  hasFaces = computed(() => {
    const cardData = this.card();

    return (
      !cardData.imageUris &&
      !!cardData?.faces &&
      cardData.faces.length > 1 &&
      cardData.faces.some((f) => !!(f.imageUris))
    );
  });

  cardImage = computed(() => {
    const cardData = this.card();

    if (cardData.faces && cardData.faces.length > 0) {
      const faceIndex = Math.min(this.currentFaceIndex(), cardData.faces.length - 1);
      const face = cardData.faces[faceIndex];
      if (face.imageUris) {
        return face.imageUris.large;
      }
    }

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
