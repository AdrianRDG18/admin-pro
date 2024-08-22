import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {

  const _userService = inject(UserService)
  const router = inject(Router)

  if(_userService.user?.role === 'ADMIN_ROLE'){
    return true;
  }
  return router.navigateByUrl('/dashboard')
};
