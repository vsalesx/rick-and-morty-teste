import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-favorite-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-icon.component.svg',


})
export class FavoriteIconComponent {
  @Input() isFavorite = false;
  @Input() size = 20;

}
