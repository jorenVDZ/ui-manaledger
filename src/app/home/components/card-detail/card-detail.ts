import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [CommonModule, Dialog],
  templateUrl: './card-detail.html',
})
export class CardDetail {
  cardId = input.required<string>();
  visible = input<boolean>(false);
  hide = output<void>();

  close() {
    this.hide.emit();
  }
}
