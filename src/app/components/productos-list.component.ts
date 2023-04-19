import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: "productos-list",
    templateUrl: "../views/productos-list.html",
    providers: [ProductoService]
})

export class ProductosListComponent {
    public titulo: string;
    public productos: Producto[] = [];

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productoService: ProductoService
    ) {
        this.titulo = "Listado de productos";
    }

    ngOnInit() {
        this._productoService.getProductos().subscribe(
            (response: any) => {
                if (response.body.code == 200) {
                    console.log("Accedemos a productos");
                    this.productos = response.body.data;
                } else {
                    console.log(response);
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }
}