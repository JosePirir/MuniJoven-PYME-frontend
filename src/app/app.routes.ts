import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { GetProductsComponent } from "./components/get-products/get-products.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { SaveProductComponent } from "./components/save-product/save-product.component";
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { LoggedGuard } from './guards/logged.guard';


const APP_ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'getProducts', component: GetProductsComponent},
    {path: 'login', canActivate:[LoggedGuard], component: LoginComponent},
    {path: 'saveProduct', canActivate:[AdminGuardGuard],component: SaveProductComponent},
    {path: '**', component:NotFoundComponent}
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);