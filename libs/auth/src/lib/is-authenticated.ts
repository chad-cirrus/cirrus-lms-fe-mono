import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { ReturnPathService } from './return-path.service';

export const isAuthenticated: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const router = inject(Router);
  const returnPathService = inject(ReturnPathService);

  if (localStorage.getItem('cirrus-token') !== null) {
    return true;
  } else {
    returnPathService.returnPath = getResolvedUrl(route);
    router.navigate(['/sign-in']);
    return false;
  }
};

const getResolvedUrl = (route: ActivatedRouteSnapshot) => {
  return route.pathFromRoot
    .map(v => v.url.map(segment => segment.toString()).join('/'))
    .join('/');
};
