import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse, AuthTokenPayload } from '../models/auth';

// Key under which the JWT is kept in the browser's localStorage. Scoped
// to this app so it can't collide with anything else running on the
// same origin.
const TOKEN_KEY = 'travlr-admin-jwt';

@Service()
export class Authentication {
  private http = inject(HttpClient);
  private apiBaseUrl = '/api';

  // Creates a new admin account. The API returns a JWT on success,
  // exactly like login() does, so a freshly registered admin is
  // immediately signed in.
  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiBaseUrl}/register`, { name, email, password })
      .pipe(tap((res) => this.saveToken(res.token)));
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiBaseUrl}/login`, { email, password })
      .pipe(tap((res) => this.saveToken(res.token)));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  // True only if a token is present AND not expired -- a stale token
  // left over from a previous session shouldn't count as "logged in".
  isLoggedIn(): boolean {
    const payload = this.decodeToken();
    if (!payload) {
      return false;
    }
    return payload.exp * 1000 > Date.now();
  }

  getCurrentUser(): AuthTokenPayload | null {
    return this.isLoggedIn() ? this.decodeToken() : null;
  }

  // Decodes the JWT's payload segment client-side (base64url -> JSON).
  // This is NOT a signature check -- the server is always the one that
  // actually verifies the token (see app_api/middleware/auth.js); this
  // is only used to read the name/email/expiry for display purposes.
  private decodeToken(): AuthTokenPayload | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      const payloadSegment = token.split('.')[1];
      const unescaped = payloadSegment.replace(/-/g, '+').replace(/_/g, '/');
      // base64url (as used in a JWT) omits padding; atob() expects a
      // length that's a multiple of 4, so pad it back out with '=' first.
      const padded = unescaped.padEnd(unescaped.length + ((4 - (unescaped.length % 4)) % 4), '=');
      const json = atob(padded);
      return JSON.parse(json) as AuthTokenPayload;
    } catch {
      return null;
    }
  }
}
