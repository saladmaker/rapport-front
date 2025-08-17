import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  mobileMenuOpen = signal(false);

  constructor(public auth: AuthService) {}

  toggleMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }

  logout() {
    this.auth.logout();
  }
}
