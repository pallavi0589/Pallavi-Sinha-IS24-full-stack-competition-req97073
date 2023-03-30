import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { SearchBoxComponent } from './shared/components/search-box/search-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './components/add-product/add-product.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './shared/services/common-service.service';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './shared/services/user.service';
import { AuthGuard } from './shared/services/auth-guard.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPipe } from './shared/pipes/search.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormatDatePipe } from './shared/pipes/format-date.pipe';
import { UnauthorisedAccessComponent } from './shared/components/unauthorised-access/unauthorised-access.component';
import { AddAccessGuard } from './shared/services/add-access-guard.service';
import { EditAccessGuard } from './shared/services/edit-access-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    NavBarComponent,
    SideBarComponent,
    SearchBoxComponent,
    AddProductComponent,
    LoginComponent,
    SearchPipe,
    FormatDatePipe,
    UnauthorisedAccessComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    ToastrModule.forRoot(),
    MatMomentDateModule 
  ],
  providers: [CommonService, UserService, AuthGuard, AddAccessGuard, EditAccessGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
