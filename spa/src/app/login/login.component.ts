import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Authorization } from '../Servicios/authorization.service';
import { Router } from '@angular/router';
import { SocialUser, AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { Usuario } from '../Models/Usuario';
import { UIService } from '../Servicios/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model = {
    email: '',
    password: ''
  };
  usuario: Usuario = {
    nombres: '',
    apellidos: '',
    email: '',
    phoneNumber: '',
    ubigeoId: 213,
    password: '',
    fecha_Nacimiento: new Date(),
    fecha_Registro: new Date(),
    direccion: '',
    estado: '',
    genero: '',
    uri: '',
    dni: ''
  };
  private user: SocialUser;
  private loggedIn: boolean;

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
              public authorization: Authorization,
              public router: Router,
              private authService: AuthService,
              private ui: UIService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
     // console.log(this.user);
      this.loggedIn = (user != null);
    });
  }
  login() {
    this.authorization.login(this.model).subscribe( () => {
       this.dialogRef.close();
    }, error => {
     this.ui.openSnackBar(error , null , 3000);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).finally( () => {
      this.usuario.nombres = this.user.firstName;
      this.usuario.apellidos = this.user.lastName;
      this.usuario.email = this.user.email;
      this.usuario.uri = this.user.photoUrl;
      this.usuario.direccion = this.user.provider;
      this.usuario.password= this.user.id + this.user.email;
      this.authorization.loginSocial(this.usuario).subscribe( () => {
        console.log(this.usuario);
        this.dialogRef.close();
      }, error => {
        console.log(error);
      });
    });
  }



  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).finally( () => {
      this.usuario.nombres = this.user.firstName;
      this.usuario.apellidos= this.user.lastName;
      this.usuario.email= this.user.email;
      this.usuario.uri = this.user.photoUrl;
      this.usuario.direccion = this.user.provider;
      this.usuario.password= this.user.id + this.user.email;
      this.authorization.loginSocial(this.usuario).subscribe( () => {
        console.log(this.usuario);
        this.dialogRef.close();
      }, error => {
        console.log(error);
      });
    });
  }

}
