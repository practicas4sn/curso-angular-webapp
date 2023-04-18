import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


// rutas
import { routing, appRoutingProviders } from "./app.routing";

// componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error.component';
import { ProductosListComponent } from './components/productos-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    ProductosListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing    
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
