import {ModuleWithProviders} from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// componentes
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';
import { ProductosListoComponent } from './components/productos-list.component';

const appRoutes: Routes = [
    {path: "", component: HomeComponent},
    {path: "home", component: HomeComponent},
    {path: "productos", component:ProductosListoComponent},
    {path: "**", component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);