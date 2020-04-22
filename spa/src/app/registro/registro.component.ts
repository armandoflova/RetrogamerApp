import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { RetrogamerService } from '../Servicios/retrogamer.service';
import { Ubigeo } from '../Models/Ubigeo';
import { Usuario } from '../Models/Usuario';
import { Authorization } from '../Servicios/authorization.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  regiones: Ubigeo[];
  provincias: Ubigeo[];
  distritos: Ubigeo[];
  regUsuario: FormGroup;
  maxDate;
  usuario: Usuario;
  constructor(private fb: FormBuilder,
              private Retrogamer: RetrogamerService,
              private Auth: Authorization) {}

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.formRegistro();
    this.obtenerRegiones();
  }

  obtenerRegiones() {
    this.Retrogamer.obtenerUbigeos(2533).subscribe( (ubigeos: Ubigeo[])  => {
      this.regiones = ubigeos;
    });
  }
   obtenerProvincia(nroPadre: number) {
      this.Retrogamer.obtenerUbigeos(nroPadre).subscribe( (ubigeos: Ubigeo[])  => {
      this.provincias = ubigeos;
      console.log(this.provincias);
      
   });
  }
   obtenerDistritos(nroPadre: number) {
      this.Retrogamer.obtenerUbigeos(nroPadre).subscribe( (ubigeos: Ubigeo[])  => {
      this.distritos = ubigeos;
      console.log(this.provincias);
      
   });
  }

  formRegistro() {
    this.regUsuario = this.fb.group({
      email: ['' , [Validators.required, Validators.email]],
      phoneNumber: ['' , Validators.required],
      nombres: ['' , Validators.required],
      apellidos: ['' , Validators.required],
      dni: ['' , [Validators.required , Validators.minLength(8)]],
      ubigeoId: [0 , Validators.required],
      direccion: ['' , Validators.required],
      genero: ['Masculino' , Validators.required],
      fecha_Nacimiento: [ null , Validators.required],
      password: ['' , [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['' , Validators.required]
  },{validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  guardar() {
    this.usuario = Object.assign( {} ,this.regUsuario.value);
    this.Auth.registrarUsuario(this.usuario).subscribe( (result:Usuario) => {
      this.regUsuario.reset();
    }, error => {
      console.log(error);
      
    })
  }
}
