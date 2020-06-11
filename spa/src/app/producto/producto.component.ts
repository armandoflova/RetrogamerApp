import { Component, OnInit } from '@angular/core';
import { RetrogamerService } from '../Servicios/retrogamer.service';
import { ActivatedRoute } from '@angular/router';

import { Authorization } from '../Servicios/authorization.service';
import { Categoria } from '../Models/Categoria';
import { Producto } from '../Models/Producto';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';
import { ProductoPedido } from '../Models/ProductoPedido';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  habilitado = true;
  idProducto: number;
  producto: any;
  fotos: any = [];
  productos: Producto[] = [];
  categoria: Categoria;
  categorias: Categoria[] = [];
  productoPedido: any = {
    id: null,
    productoId: 0,
    precio: 0,
    descuento: 0,
    nombre: '',
    modelo: '' ,
    marca: ''
  };
  constructor(public retrogamer: RetrogamerService,
              private router: ActivatedRoute,
              public auth: Authorization) { }

  ngOnInit(): void {
    this.idProducto = this.router.snapshot.params.id;
    this.obtenerProducto(this.idProducto);
    this.obtenerCategorias();
   // this.productoAgregado();
    this.getImages();
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '400px',
        height: '400px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }
  obtenerProducto(idProducto: number) {
    this.retrogamer.obtenerProductoVenta(idProducto).subscribe((result: any) => {
      this.producto = result;
      this.obtenerCategoria(this.producto.categoriaId);
      this.fotos = this.producto.fotos;
      this.galleryImages = this.getImages();
      this.productoAgregado(this.producto);
    });
  }

  getImages() {
    const imageUrls = [];
    for (const foto of this.fotos) {
      imageUrls.push({
        small: foto.url,
        medium: foto.url,
        big: foto.url,
        description: foto.descripcion
      });
    }
    return imageUrls;
  }
  obtenerCategoria( id: number){
    this.retrogamer.obtenerCategoria(id).subscribe((result: Categoria) => {
      this.categoria = result;
      this.productos = this.categoria.productos;
    });
   }
    obtenerCategorias(){
      this.retrogamer.obtenerCategorias().subscribe((result: Categoria[]) => {
        this.categorias = result;
      });
    }
    obtenerProductoSeleccionado(producto: any){
      // this.categorias.splice(0, this.categorias.length);
      // this.productos.splice(0, this.productos.length),
      // this.producto = null;
      // this.categoria = null;
      // this.fotos.splice(0, this.fotos.length);
        this.retrogamer.obtenerProductoVenta(producto.id).subscribe( (result: any) => {
        this.producto = result;
        this.productoAgregado(producto);
        this.fotos = this.producto.fotos;
        this.galleryImages = this.getImages();
      });
    }

    agregarCarrito(producto: any){
      this.productoPedido.precio = producto.precio_Venta;
      this.productoPedido.productoId = producto.id;
      this.productoPedido.nombre = producto.nombre;
      this.productoPedido.marca = producto.marca;
      this.productoPedido.modelo = producto.modelo;
      let clone = {... this.productoPedido};
      // this.productoAgregado(this.producto);
      // const i = this.productos.indexOf(this.producto, 0);
      // console.log(i);
      // this.productos.splice(i, 1);
      this.retrogamer.agregarCarrito(clone);
      this.productoAgregado(producto);
    }

    productoAgregado(producto: any){
      let estaHabilitado = true;
      this.retrogamer.item.forEach(element => {
        if (element.productoId === producto.id) {
            estaHabilitado = false;
      }
      });
      this.habilitado = estaHabilitado;
  }
}

