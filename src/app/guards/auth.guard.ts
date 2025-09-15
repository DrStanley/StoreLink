import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { filter, take, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['role'];
  return toObservable(authService.currentUser).pipe(
    filter(user => user !== undefined), // Wait until authentication state is resolved
    take(1), // We only need to check once
    map(user => {
      // If user is not logged in, redirect to login
      if (!user) {
        return router.parseUrl('auth/login');
      }

      // If a role is expected and the user's role doesn't match, redirect
      if (expectedRole && user.role !== expectedRole) {
        // Optionally, redirect to a more appropriate page like 'unauthorized'
        return router.parseUrl('auth/login');
      }

      // If user is logged in and either no role is required or the role matches
      return true;
    })
  );
};