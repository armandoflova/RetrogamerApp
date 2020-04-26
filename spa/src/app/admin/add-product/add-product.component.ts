import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/Models/Categoria';
import { Modelo } from 'src/app/Models/Modelo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Producto } from 'src/app/Models/Producto';
import { MatDialog } from '@angular/material/dialog';
import { Routes, Router } from '@angular/router';
import { AddCategoriaComponent } from '../add-categoria/add-categoria.component';
import { AddModeloComponent } from '../add-modelo/add-modelo.component';
import { RetrogamerService } from '../../Servicios/retrogamer.service';
import { AdminService } from '../../Servicios/admin.service';
import { Authorization } from '../../Servicios/authorization.service';
import { UIService } from '../../Servicios/ui.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  listaCategorias: Categoria[];
  listaModelos: Modelo[];
  productoGuadar: FormGroup;
  producto: Producto;
  constructor(public dialog: MatDialog,
              private fb: FormBuilder,
              private router: Router,
              private retrogamer: RetrogamerService,
              private admin: AdminService,
              private auth: Authorization,
              private ui: UIService) { }



  ngOnInit() {
    this.obtenerCategorias();
    this.CrearFormularioProducto();
    this.obtenerModelos();
  }

  get nombreValido() {
    return this.productoGuadar.get('nombre').invalid && this.productoGuadar.get('nombre').touched;
  }
  get categoriaValido() {
    return this.productoGuadar.get('categoriaId').invalid && this.productoGuadar.get('categoriaId').touched;
  }
  get modeloValido() {
    return this.productoGuadar.get('modeloId').invalid && this.productoGuadar.get('modeloId').touched;
  }
  get serieValido() {
    return this.productoGuadar.get('serie').invalid && this.productoGuadar.get('serie').touched;
  }
  get marcaValido() {
    return this.productoGuadar.get('marca').invalid && this.productoGuadar.get('marca').touched;
  }
  get precioCompraValido() {
    return this.productoGuadar.get('precio_Compra').invalid && this.productoGuadar.get('precio_Compra').touched;
  }
  get precioVentaValido() {
    return this.productoGuadar.get('precio_Venta').invalid && this.productoGuadar.get('precio_Venta').touched;
  }


  CrearFormularioProducto() {
    this.productoGuadar = this.fb.group({
      id: [null ],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      modeloId : ['' , Validators.required],
      categoriaId: ['' , Validators.required],
      serie: ['', Validators.required],
      marca: ['' , Validators.required],
      urlPrincipal: [''],
      fecha_Registro: [Date],
      estado: [false],
      precio_Compra: [0 , Validators.required],
      precio_Venta: [0 , Validators.required],
      userId: [2],
    });
  }

  nuevaCategoria() {
    const DialogRef = this.dialog.open(AddCategoriaComponent , {

    }).afterClosed( ).subscribe(() => {
      this.obtenerCategorias();
    });
  }
  nuevaModelo() {
    const DialogRef = this.dialog.open(AddModeloComponent , {

    }).afterClosed( ).subscribe(() => {
      this.obtenerModelos();
    });
  }

  obtenerCategorias() {
    this.retrogamer.obtenerCategorias().subscribe( categorias => {
      this.listaCategorias = categorias as Categoria[];
    });
  }
  obtenerModelos() {
    this.retrogamer.obtenerModelos().subscribe( Modelos => {
      this.listaModelos = Modelos as Modelo[];
    });
  }

  guardarProducto() {
    console.log(this.productoGuadar.value);
    if (this.productoGuadar.valid) {
      this.producto = Object.assign( {} , this.productoGuadar.value);
      this.admin.agregarProducto(this.producto).subscribe( (result: Producto) => {
        this.producto = result;
        this.router.navigate(['/fotos' , this.producto.id]);
      }, error => {
       this.ui.openSnackBar(error, null , 3000);
      });

    }
  }
}
