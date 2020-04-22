import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Authorization } from '../Servicios/authorization.service';
import { Router } from '@angular/router';
import { SocialUser, AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

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
  private user: SocialUser;
  private loggedIn: boolean;

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
              public authorization: Authorization,
              public router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.loggedIn = (user != null);
    });
  }
  login() {
    this.authorization.login(this.model).subscribe( () => {
       this.dialogRef.close();
    }, error => {
      console.log(error);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
