import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const tokenData = localStorage.getItem('jwtToken');
  let token = '';

  if (tokenData) {
    try {
      const parsedToken = JSON.parse(tokenData);
      token = parsedToken.token;
    } catch (error) {
      console.error('Error parsing JWT token from localStorage:', error);
    }
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};
