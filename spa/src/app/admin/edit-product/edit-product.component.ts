import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RetrogamerService } from 'src/app/Servicios/retrogamer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Authorization } from '../../Servicios/authorization.service';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/Models/Categoria';
import { Modelo } from 'src/app/Models/Modelo';
import { Producto } from 'src/app/Models/Producto';
import { AddCategoriaComponent } from '../add-categoria/add-categoria.component';
import { AddModeloComponent } from '../add-modelo/add-modelo.component';
import { AdminService } from '../../Servicios/admin.service';
import { UIService } from '../../Servicios/ui.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  listaCategorias: Categoria[];
  listaModelos: Modelo[];
  productoGuadar: FormGroup;
  id: number;
  producto: Producto = {
    id: 0,
    nombre: '',
    modeloId: 0,
    categoriaId: 0,
    serie: '',
    marca: '',
    precio_Compra: 0,
    precio_Venta: 0,
    estado: false,
    descripcion: '',
    fecha_Registro: null,
    userId: 0,
    cantidad: 0,
    urlPrincipal: ''
  };
  constructor(public dialog: MatDialog,
              private retrogamer: RetrogamerService,
              private fb: FormBuilder,
              private auth: Authorization,
              private router: ActivatedRoute,
              private admin: AdminService ,
              private ui: UIService) { }



  ngOnInit() {
    this.obtenerCategorias();
    this.obtenerModelos();
    this.CrearFormularioProducto();
    this.id = this.router.snapshot.params.id;
    console.log(this.id);
    this.obetenerProducto();

  }

  obetenerProducto() {
    this.retrogamer.obtenerProducto(this.id).subscribe( (result: Producto) => {
      this.producto = result;
      console.log(this.producto);
      this.CrearFormularioProducto();
    }, error => {
      this.ui.openSnackBar(error , null , 3000);
    });
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
      id: [this.producto.id ],
      nombre: [this.producto.nombre],
      descripcion: [this.producto.descripcion , Validators.required],
      modeloId : [ this.producto.modeloId , Validators.required],
      categoriaId: [this.producto.categoriaId , Validators.required],
      serie: [this.producto.serie, Validators.required],
      marca: [ this.producto.marca , Validators.required],
      urlPrincipal: [this.producto.urlPrincipal],
      fecha_Registro: [this.producto.fecha_Registro],
      estado: [this.producto.estado],
      precio_Compra: [this.producto.precio_Compra , Validators.required],
      precio_Venta: [ this.producto.precio_Venta , Validators.required],
      userId: [this.producto.userId],
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

  editarProducto() {
    this.producto = Object.assign( {} , this.productoGuadar.value);
    console.log(this.producto);
    this.producto.cantidad = 1;
    this.admin.editarProducto(this.producto.id , this.producto).subscribe( () => {
     this.productoGuadar.reset(this.producto);
     this.ui.openSnackBar('Se Guardaron los productos de manera correcta' , null , 3000);
    }, error => {
     this.ui.openSnackBar(error , null , 3000 );
    } );
  }
  }


