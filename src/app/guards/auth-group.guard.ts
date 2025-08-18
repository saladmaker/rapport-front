import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const canActivateGroup: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const requiredGroup = route.data['groups'] as string;

  if (!auth.isAuthenticated || !requiredGroup) {
    return router.parseUrl('/forbidden');
  }

  if (auth.hasGroup(requiredGroup)) {
    return true;
  }

  return router.parseUrl('/forbidden');
};
