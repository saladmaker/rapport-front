import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  
  authService = inject(AuthService);
  isAuthenticated = this.authService.isAuthenticated;

}