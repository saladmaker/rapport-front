import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginRequest } from '../models/login-request.model';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/access-token.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private jwt = new JwtHelperService();

  private apiUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient, private router: Router) { }

  get token(): string | null {
    return localStorage.getItem('access_token');
  }

  private set tokenValue(value: string | null) {
    if (value) {
      localStorage.setItem('access_token', value);
    } else {
      localStorage.removeItem('access_token');
    }
  }
  
  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
      tap((res) => {
        this.tokenValue = res.access_token;
      })
    );
  }
  
  logout(): void {
    this.tokenValue = null;
    this.router.navigate(['/login']);
  }

  get isAuthenticated(): boolean {
    const t = this.token;
    return !!t && !this.jwt.isTokenExpired(t);
  }

  get groups(): string[] {
    const t = this.token;
    if (!t) return [];
    const decoded = this.jwt.decodeToken(t);
    return decoded?.['groups'] ?? [];
  }

  hasGroup(group: string): boolean {
    return this.groups.includes(group);
  }
}
