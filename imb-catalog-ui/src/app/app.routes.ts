import { Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UnauthorisedAccessComponent } from './shared/components/unauthorised-access/unauthorised-access.component';
import { AddAccessGuard } from './shared/services/add-access-guard.service';
import { AuthGuard } from './shared/services/auth-guard.service';
import { EditAccessGuard } from './shared/services/edit-access-guard.service';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'product-list',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'product-list',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product-list/:id',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthGuard, AddAccessGuard],
  }, {
    path: 'edit-product/:id',
    component: AddProductComponent,
    canActivate: [AuthGuard, EditAccessGuard],
  }, {
    path: 'unauthorized-access',
    component: UnauthorisedAccessComponent
  }
];
