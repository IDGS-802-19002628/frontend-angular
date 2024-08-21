import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interfaces/login';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, throwError } from 'rxjs';
import { PermisosResponse } from '../interfaces/permisos';
import { UsuarioC } from '../pages/usuarios-clientes/interfaces/UsuarioC';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = environment.ENDPOINT_DESKART;
  private ENDPOIN_VALIDATE = environment.ENDPOINT_VALIDATES;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  public singIn(data: Login) {
    return this.http.post(`${this.URL}api/login`, data);
  }

  public register(data: UsuarioC): Observable<UsuarioC> {
    return this.http.post<UsuarioC>(`${this.URL}api/registrar`, data);
}

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }



  public validarPermisos($data: any) : Observable<PermisosResponse> {
    return this.http
      .post<PermisosResponse>(`${this.ENDPOIN_VALIDATE}validarPermisos`, $data)
      .pipe(catchError((err) => throwError(() => err)));
  }

  //getPermisosUsuario
  public getPermisosUsuario() : Observable<any[]> {
    return this.http
      .get<any[]>(`${this.ENDPOIN_VALIDATE}getPermisosUsuario`)
      .pipe(catchError((err) => throwError(() => err)));
  }
}

