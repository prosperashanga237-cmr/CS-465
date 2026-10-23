import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Authentication } from './authentication';

// Functional route guard (registered as canActivate on protected routes
// in app-routing-module.ts): blocks navigation to add-trip/edit-trip
// unless the admin is logged in with a valid, unexpired JWT, sending
// them to /login (with a returnUrl so Login can send them right back)
// instead. This is a UX convenience only -- the real enforcement is
// server-side (requireAuth middleware on the write routes), since a
// client-side guard can always be bypassed by someone hitting the API
// directly.
export const authGuard: CanActivateFn = (_route, state) => {
  const authService = inject(Authentication);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
