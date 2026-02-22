import { Component, input } from '@angular/core';
import { Tooltip } from 'primeng/tooltip';
import { Card } from './../../../generated/graphql';

@Component({
  selector: 'app-card-list-item',
  imports: [Tooltip],
  templateUrl: './card-list-item.html',
})
export class CardListItem {
  card = input<Card>();
}
