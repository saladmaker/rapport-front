import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    if (!this.username || !this.password) return;
    this.auth.login({ name: this.username, password: this.password }).subscribe({
      next: () => {
        console.log('Login successful');
        this.router.navigate(['/profile']);
      },
      error: (err) => console.error('Login failed', err),
    });
  }

  onForgotPassword() {
    console.log('Forgot password clicked');
  }
}
