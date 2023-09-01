import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { User } from '../interfaces/user';
import { LoggedUserService } from '../service/logged-user.service';

export function authGuardFn(): CanActivateFn {
  return () => {
    const authService = inject(LoggedUserService);
    const router = inject(Router);
    const loggedUser: User = JSON.parse(authService.getUser());
    if (loggedUser.role == 'admin') {
      console.log(loggedUser);

      return true;
    }
    router.navigate(['login']);
    return false;
  };
}
