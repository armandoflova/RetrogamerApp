import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RetrogamerService } from '../../Servicios/retrogamer.service';
import { Ubigeo } from '../../Models/Ubigeo';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css']
})
export class FormularioUsuarioComponent implements OnInit {
  provincias: Ubigeo[] = [];
  regiones: Ubigeo[] = [];
  distritos: Ubigeo[] = [];
  constructor(private dialogRef: MatDialogRef<any>,
              private Retrogamer: RetrogamerService) { }

  ngOnInit(): void {
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
}
