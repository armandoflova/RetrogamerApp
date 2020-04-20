import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { AdminComponent } from './admin/admin.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { SubirFotoComponent } from './admin/subir-foto/subir-foto.component';
import { AuthGuard } from './Servicios/auth.guard';


const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'registro' , component: RegistroComponent},
  {path: '' ,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      
      {path: 'admin', component: AdminComponent, data : {roles: ["Administrador"]}},
      {path: 'addProduct', component: AddProductComponent , data : {roles: ["Administrador"]}},
      {path: 'addFoto', component: SubirFotoComponent , data : {roles: ["Administrador"]}}
    ]
  },
  {path: '**', redirectTo: '',  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
