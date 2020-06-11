import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../Models/Categoria';
import { AdminComponent } from '../admin.component';
import { AdminService } from '../../Servicios/admin.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent implements OnInit {
  categoria: Categoria = {
    descripcion: ''
  };
  constructor(private admin: AdminService,
              private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }
  agregarCategoria() {
    this.admin.agregarCategoria(this.categoria).subscribe( () => {
      this.dialogRef.close();
    }, error => {
      console.log(error);
    });
  }
}
