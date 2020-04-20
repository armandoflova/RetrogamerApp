import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../Models/Usuario';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: Usuario) {
    return this.http.post(environment.UrlApi + 'Auth/registro', usuario);
  }

  login(model: any) {
    return this.http.post(environment.UrlApi + 'Auth/Login' , model).pipe(
      map((resonse: any)=> {
        const usuario = resonse;
        if(usuario) {
          localStorage.setItem('token' , usuario.token);
          localStorage.setItem('user' , JSON.stringify(usuario.user));
          this.decodedToken = this.jwtHelper.decodeToken(usuario.token);
        }
      })
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  roleMatch(allowroles): boolean{
    let ismatch = false;
    const userRoles = this.decodedToken.role as Array<string>;
    allowroles.forEach(element => {
      if (userRoles.includes(element))
        {
          ismatch = true;
          return;
        }
    });
    return ismatch;
  }
  logout() {
    localStorage.removeItem('token');
    this.decodedToken = null;
  }
}
