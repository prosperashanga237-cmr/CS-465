import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Authentication } from './authentication';

// Functional HTTP interceptor (registered via provideHttpClient(withInterceptors([...]))
// in app-module.ts): attaches "Authorization: Bearer <token>" to every
// outgoing request when the admin is logged in. The server-side
// requireAuth middleware (app_api/middleware/auth.js) is what actually
// enforces this on protected routes -- this interceptor just makes sure
// the token is sent so authenticated requests succeed in the first
// place.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Authentication);
  const token = authService.getToken();

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });

  return next(authReq);
};
