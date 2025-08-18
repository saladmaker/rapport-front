import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginRequest } from '../models/login-request.model';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  token = signal<string | null>(localStorage.getItem('access_token'));

  private apiUrl = 'http://localhost:8080/api';

  constructor(private jwt: JwtHelperService, private http: HttpClient, private router: Router) { }

  login(request: LoginRequest) {
    return this.http.post<string>(`${this.apiUrl}/login`, request, {
      responseType: 'text' as 'json'
    }).pipe(
      tap((token: string) => {
        this.token.set(token);
        localStorage.setItem('access_token', token);
      })
    );
  }

  logout() {
    this.token.set(null);
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  isAuthenticated = computed(() => {
    const t = this.token();
    return !!t && !this.jwt.isTokenExpired(t);
  });

  groups = computed(() => {
    const t = this.token();
    if (!t) return [];
    const decoded = this.jwt.decodeToken(t);
    return decoded?.['groups'] ?? [];
  });

  hasGroup(group: string) {
    return this.groups().includes(group);
  }

}
