import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RetrogamerService } from '../Servicios/retrogamer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';

declare var paypal;

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})

export class CarritoComprasComponent implements OnInit {

  displayedColumns = ['Producto', 'Marca' , 'Modelo' , 'Precio' , 'acciones'];
  productos: any[] = [];
  dataSource = new MatTableDataSource();
  @ViewChild('paypal', { static: true }) paypalElement : ElementRef;

  producto = {
    descripcion : 'producto en venta',
    precio      : 599.99,
    img         : 'imagen de tu producto'
  };
  constructor(public retrogamer: RetrogamerService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    paypal
    .Buttons({
      createOrder: (data, actions) => {
        console.log(actions);
        
        return actions.order.create({
          purchase_units: [
            {
              description: this.producto.descripcion,
              amount     : {
                currency_code: 'USD',
                value        : this.producto.precio
              }
            }
          ]
        })
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        console.log(order);

      },
      onError: err =>{
        console.log(err);
      }
    })
    .render( this.paypalElement.nativeElement );
    this.cargarTabla();
  }
  cargarTabla() {
    this.productos = this.retrogamer.item;
    this.dataSource.data = this.productos;
  }
  getTotalCost() {
    return this.productos.map(p => p.precio).reduce((acc, value) => acc + value, 0);
  }
  eliminarItem(producto: any) {
    let i = this.productos.indexOf(producto, 0);
    this.retrogamer.item.splice(i , 1);
    this.productos.splice(i , 1);
    this.cargarTabla();
    this.retrogamer.precioTotal = this.getTotalCost();
  }
  RegistrarUsuario() {
    const DialogRef = this.dialog.open(FormularioUsuarioComponent , {

    }).afterClosed( ).subscribe(() => {

    });
  }
}
