import { Component, OnInit } from '@angular/core';
import { RetrogamerService } from 'src/app/Servicios/retrogamer.service';
import { Producto } from 'src/app/Models/Producto';
import { Foto } from 'src/app/Models/Foto';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../Servicios/admin.service';
import { UIService } from '../../Servicios/ui.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Authorization } from '../../Servicios/authorization.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {
  producto: Producto;
  fotos: Foto[] = [];
  fotoactual: Foto;
  constructor(private Admin: AdminService,
              private retrogamer: RetrogamerService,
              private router: ActivatedRoute,
              private admin: AdminService,
              private ui: UIService,
              private aut: Authorization) { }

  ngOnInit() {
    this.producto = {
      id: 0,
      marca: '',
      serie: '',
      descripcion: '',
      estado: false,
      fecha_Registro: new Date(),
      precio_Compra: 0,
      precio_Venta: 0,
      cantidad: 0,
      urlPrincipal: '',
      userId: +this.aut.decodedToken.nameid,
      modeloId: 0,
      categoriaId: 0
    };
    this.producto.id = this.router.snapshot.params.id;
    this.obtenerProductos();
    this.obtenerFotos();
  }

  obtenerProductos() {
    this.retrogamer.obtenerProducto(this.producto.id).subscribe( (result: Producto) => {
      this.producto = result;
     });
  }

  obtenerFotos() {
    this.retrogamer.obtenerFotos(this.producto.id).subscribe ( (result: Foto[]) => {
      this.fotos = result;
      } , error => {
      this.ui.openSnackBar(error , null , 3000);
    });
  }

  agregarFoto(foto: Foto) {
    this.fotos.push(foto);
  }

  eliminarFoto(foto: Foto){
    foto.estado = !foto.estado;
    this.admin.cambiarEstadoFoto(foto.id , foto).subscribe( () => {
     const sncakbarRef = this.ui.openSnackBar('se elimino Foto' , 'DESHACER' , 3000);
     const i = this.fotos.indexOf(foto , 0);
     this.fotos.splice(i, 1);
     sncakbarRef.onAction().subscribe(() => this.cambiarEstado(foto));
    }, error => {
      this.ui.openSnackBar(error , null , 3000);
    });
  }

  cambiarEstado(foto: Foto){
    foto.estado = !foto.estado;
    this.admin.cambiarEstadoFoto(foto.id , foto).subscribe( () => {
      this.fotos.push(foto);
    }, error => {
      this.ui.openSnackBar(error , null , 3000);
    });
  }

  FotoPrincipal(foto: Foto) {
    this.admin.fotoPrincipal(this.producto.id , foto.id , foto).subscribe( () => {
        this.fotoactual = this.fotos.filter(f => f.esPrincipal === true)[0];
        this.fotoactual.esPrincipal = false;
        foto.esPrincipal = true;
        this.ui.openSnackBar('Se establecio como Foto Principal' , null, 3000);
    }, error => {
        this.ui.openSnackBar(error , null, 3000);
    });
  }
}
