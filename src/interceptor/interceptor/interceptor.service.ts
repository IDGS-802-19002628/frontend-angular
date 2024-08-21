import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor( private _snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = sessionStorage.getItem('token');
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Token: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    }
    return next.handle(req);

  }
}

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.mostrarEvento(error);
        return throwError(error);
      })
    );
  }

  mostrarEvento(error: HttpErrorResponse): void {
    const status = error.status;
    const message = error.error.message;
    if (status === 500 && error.error.error === 'Internal Server Error' && message === 'token_expirado') {
      this.openSnackBar();
    }
  }

  openSnackBar(): void {
    const durationInSeconds = 5;
    this._snackBar.open('Sesión terminada', 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: durationInSeconds * 1000,
    });
  }
}
