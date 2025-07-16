import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AboutComponent } from "./components/about/about.component";
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';

export const router: Routes = [
	{ path: "", redirectTo: "home", pathMatch: "full" },
	{ path: "about", 			component: AboutComponent },
  	{ path: "products", 		component: ProductsComponent },
	{ path: "home", 			component: HomeComponent },
	{ path: "cart", 			component: CartComponent },
  	{ path: "register-user", 	component: RegisterUserComponent }

];

export const routes: ModuleWithProviders<RouterModule> = RouterModule.forRoot(router);
