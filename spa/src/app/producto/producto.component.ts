import { Component, OnInit } from '@angular/core';
import { RetrogamerService } from '../Servicios/retrogamer.service';
import { ActivatedRoute } from '@angular/router';

import { Authorization } from '../Servicios/authorization.service';
import { Categoria } from '../Models/Categoria';
import { Producto } from '../Models/Producto';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';
import { ProductoPedido } from '../Models/ProductoPedido';
import { element } from 'protractor';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  idProducto: number;
  producto: any;
  fotos: any = [];
  productos: Producto[] = [];
  categoria: Categoria;
  categorias: Categoria[] = [];
  productoPedido: ProductoPedido = {
    id: null,
    productoId: 0,
    precio: 0,
    descuento: 0,
  };
  constructor(public retrogamer: RetrogamerService,
              private router: ActivatedRoute,
              public auth: Authorization) { }

  ngOnInit(): void {
    this.idProducto = this.router.snapshot.params.id;
    this.obtenerProducto(this.idProducto);
    this.obtenerCategorias();
   // this.obtenerCategoria(this.producto.categoriaId);
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
      console.log(this.producto);
      this.obtenerCategoria(this.producto);
      this.fotos = this.producto.fotos;
      this.galleryImages = this.getImages();
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
  obtenerCategoria( producto?: any){
    this.retrogamer.obtenerCategoria(producto.categoriaId).subscribe((result: Categoria) => {
      this.categoria = result;
      this.productos = this.categoria.productos;
      const i = this.productos.indexOf(producto , 0);
      this.productos.splice(i , 1);
    });
   }
  obtenerCategoriaChip( categoriaId: number){
    this.retrogamer.obtenerCategoria(categoriaId).subscribe((result: Categoria) => {
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
        this.obtenerCategoria(this.producto);
       // this.obtenerCategorias();
        this.fotos = this.producto.fotos;
        this.galleryImages = this.getImages();
      });
    }

    agregarCarrito(producto: any){
      // this.productoPedido.precio = this.producto.precio_Venta;
      // this.productoPedido.productoId = this.producto.id;
      // this.retrogamer.item.push(this.productoPedido);
      this.retrogamer.precioTotal = this.retrogamer.precioTotal + producto.precio_Venta;
      // this.productoAgregado(this.producto);
      // const i = this.productos.indexOf(this.producto, 0);
      // console.log(i);
      // this.productos.splice(i, 1);
      const i = this.productos.indexOf(producto , 0);
      console.log(i);
      this.productos.splice(i , 1);
      this.retrogamer.item.push(producto);
    }

    productoAgregado(producto: any) {
      this.retrogamer.item.forEach( element => {
        for (const product of element) {
          if (product.productoId === producto.id) {
            return true;
          }
        }
        return false;
      });
    }
  }
