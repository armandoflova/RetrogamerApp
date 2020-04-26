import { Component, OnInit } from '@angular/core';
import { RetrogamerService } from '../../Servicios/retrogamer.service';
import { AdminService } from '../../Servicios/admin.service';
import { Modelo } from '../../Models/Modelo';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-modelo',
  templateUrl: './add-modelo.component.html',
  styleUrls: ['./add-modelo.component.css']
})
export class AddModeloComponent implements OnInit {
  modelo: Modelo = {
    id: null,
    descripcion: ''
  };
  constructor(private admin: AdminService,
              private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }
  agregarModelo() {
    this.admin.agregarModelo(this.modelo).subscribe( () => {
      console.log('se guardo de manera Correcta');
      this.dialogRef.close();
    }, error => {
      console.log(error);
    });
  }
}
