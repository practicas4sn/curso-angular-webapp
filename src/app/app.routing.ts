import {ModuleWithProviders} from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// componentes
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';

const appRoutes: Routes = [
    {path: "", component: HomeComponent},
    {path: "home", component: HomeComponent},
    {path: "**", component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);