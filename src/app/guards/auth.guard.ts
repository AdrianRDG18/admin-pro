import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs/operators';

export const canMatch: CanMatchFn = () => {
    // In this case, we are using the inject function to inject the UserService and Router services(We can'y use the constructor because this is a function and not a class)
    const _userService = inject(UserService);
    const router = inject(Router);

    return _userService.validateToken().pipe(
      tap( (isAuthenticated) => {
        if(!isAuthenticated){
          router.navigateByUrl('/login');
        }
      })
    );
}

export const authGuard: CanActivateFn = () => {

  // In this case, we are using the inject function to inject the UserService and Router services(We can'y use the constructor because this is a function and not a class)
  const _userService = inject(UserService);
  const router = inject(Router);

  return _userService.validateToken().pipe(
    tap( (isAuthenticated) => {
      if(!isAuthenticated){
        router.navigateByUrl('/login');
      }
    })
  );
};
