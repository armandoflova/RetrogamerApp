import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../Servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model = {
    email: '',
    password: ''
  }
  constructor(public dialogRef: MatDialogRef<LoginComponent>,
              public auth: AuthService,
              public router: Router) { }

  ngOnInit(): void {

  }
  login() {
    this.auth.login(this.model).subscribe( () => {
       this.dialogRef.close();
    }, error => {
      console.log(error);
      
    });
  }
}
