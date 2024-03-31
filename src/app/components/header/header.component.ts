import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  counter = computed(() => this.favoritesService.favorites().length);
  favoritesService = inject(FavoritesService);




}