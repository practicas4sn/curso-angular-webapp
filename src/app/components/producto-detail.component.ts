import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, RouteReuseStrategy } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'prducto-detail',
    templateUrl: '../views/producto-detail.html',
    providers: [ProductoService]
})

export class ProductoDetailComponent {
    public producto: Producto;

    constructor(
        private _productoService: ProductoService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {

    }

    ngOnInit() {
        console.log("producto-detail.Component.ts cargado...");
        this.getProducto();
    }

    getProducto() {
        this._route.paramMap.subscribe((params: Params) => {
            let id = params['get']('id');
            this._productoService.getProducto(id).subscribe(
                // response nos devuelve una HttpResponse y se accede a sus datos de la siguiente manera
                (response: any) => {
                    if (response.body.code == 200) {
                        this.producto = response.body.data;
                    } else {
                        this._router.navigate(['/productos']);
                    }
                },
                error => {
                    console.log(<any>error);
                }
            )
        });
    }
}