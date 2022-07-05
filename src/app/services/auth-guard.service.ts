import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const authedUser = localStorage.getItem('auth');
    if (!authedUser) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
