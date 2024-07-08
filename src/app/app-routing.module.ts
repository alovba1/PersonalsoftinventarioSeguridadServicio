import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './Inventario/listar/listar.component';
import { AddComponent } from './Inventario/add/add.component';
import { EditComponent } from './Inventario/edit/edit.component';
import { LoginComponent } from './Inventario/login/login.component';
import { AuthGuard } from './guards/auth.guard'; 

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'listar', component: ListarComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddComponent, canActivate: [AuthGuard] },
  { path: 'edit', component: EditComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
