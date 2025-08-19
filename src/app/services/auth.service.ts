import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginRequest } from '../models/login-request.model';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  token = signal<string | null>(null);

  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private jwt: JwtHelperService,
    private http: HttpClient,
    private router: Router
  ) { }

  login(request: LoginRequest) {
    return this.http.post<string>(`${this.apiUrl}/login`, request, {
      responseType: 'text' as 'json'
    }).pipe(
      tap((token: string) => {
        this.token.set(token);

        // Decode JWT manually to get the correct exp value
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const expTimestamp = payload.exp; // This should be 1755613942

          if (expTimestamp) {
            const nowUTC = Date.now();
            const expUTC = expTimestamp * 1000; // Convert seconds to milliseconds

            console.log("nowUTC: " + nowUTC);
            console.log("expUTC: " + expUTC);
            console.log("Raw exp from token: " + expTimestamp);

            const msUntilExpiry = expUTC - nowUTC;
            console.log("msUntilExpiry: " + msUntilExpiry);

            if (msUntilExpiry > 0) {
              setTimeout(() => this.logout(), msUntilExpiry);
            } else {
              this.logout();
            }
          }
        } catch (error) {
          console.error('Failed to decode JWT:', error);
          this.logout();
        }
      })
    );
  }

  logout() {
    this.token.set(null);
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
