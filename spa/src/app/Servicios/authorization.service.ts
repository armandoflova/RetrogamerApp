import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../Models/Usuario';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Authorization {
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  constructor(private http: HttpClient,
              private router: Router) { }

  registrarUsuario(usuario: Usuario) {
    return this.http.post(environment.UrlApi + 'Auth/registro', usuario);
  }

  login(model: any) {
    return this.http.post(environment.UrlApi + 'Auth/Login' , model).pipe(
      map((resonse: any) => {
        const usuario = resonse;
        if (usuario) {
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
    this.router.navigate(['/home']);
  }

  loginSocial(usuario: Usuario) {
    return this.http.post(environment.UrlApi + 'Auth/Social' , usuario).pipe(
      map((resonse: any) => {
        // tslint:disable-next-line: no-shadowed-variable
        const usuario = resonse;
        if (usuario) {
          localStorage.setItem('token' , usuario.token);
          localStorage.setItem('user' , JSON.stringify(usuario.user));
          this.decodedToken = this.jwtHelper.decodeToken(usuario.token);
        }
      })
    );
  }
}
