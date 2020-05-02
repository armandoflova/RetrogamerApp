import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { AdminComponent } from './admin/admin.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { SubirFotoComponent } from './admin/subir-foto/subir-foto.component';
import { AuthGuard } from './Servicios/auth.guard';
import { FotosComponent } from './admin/fotos/fotos.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { ProductoComponent } from './producto/producto.component';
import { CarritoComprasComponent } from './carrito-compras/carrito-compras.component';


const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'registro' , component: RegistroComponent},
  {path: 'producto/:id' , component: ProductoComponent},
  {path: 'carrito' , component: CarritoComprasComponent},
  {path: '' ,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'admin', component: AdminComponent, data : {roles: ['Administrador']}},
      {path: 'addProduct', component: AddProductComponent , data : {roles: ['Administrador']}},
      {path: 'addFoto', component: SubirFotoComponent , data : {roles: ['Administrador']}},
      {path: 'fotos/:id', component: FotosComponent , data : {roles: ['Administrador']}},
      {path: 'editar/:id', component: EditProductComponent , data : {roles: ['Administrador']}}
    ]
  },
  {path: '**', redirectTo: '',  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
