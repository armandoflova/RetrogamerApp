import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from './Models/Usuario';
import { Authorization } from './Servicios/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'Retrogamer';
  jwtHelper = new JwtHelperService();

  /**
   *
   */
  constructor(private authService: Authorization) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: Usuario = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    // if (user) {
    //   this.authService.currentUser = user;
    //   this.authService.changeMemberPhoto(user.photoUrl);
    // }
  }
}
