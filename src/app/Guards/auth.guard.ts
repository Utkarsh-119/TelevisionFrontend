import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Check for authentication token in localStorage
  const tokenData = localStorage.getItem('jwtToken');

  if (!tokenData) {
    
    router.navigate(['/']);
    return false;
  }

  try {
    const parsedToken = JSON.parse(tokenData);
    const token = parsedToken?.token;

    if (!token) {
     
      router.navigate(['/']);
      return false;
    }
  } catch (error) {
    console.error('Error parsing JWT token from localStorage:', error);
    router.navigate(['/']);
    return false;
  }

  return true;
};
