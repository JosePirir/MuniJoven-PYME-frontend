import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { GetProductsComponent } from "./components/get-products/get-products.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { SaveProductComponent } from "./components/save-product/save-product.component";
import { SaveUserComponent } from "./components/save-user/save-user.component";


const APP_ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'getProducts', component: GetProductsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'saveProduct', component: SaveProductComponent},
    {path: 'saveUser', component: SaveUserComponent},
    {path: '**', component:NotFoundComponent}
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);