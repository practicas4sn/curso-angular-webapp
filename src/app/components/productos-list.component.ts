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
    public confirmado: any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productoService: ProductoService
    ) {
        this.titulo = "Listado de productos";
        this.confirmado = null;
    }

    ngOnInit() {
        this.getProductos();
    }

    getProductos() {
        this._productoService.getProductos().subscribe(
            (response: any) => {
                // response nos devuelve una HttpResponse y se accede a sus datos de la siguiente manera
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

    borrarConfirm(id: number) {
        this.confirmado = id;
    }

    cancelarConfirm() {
        this.confirmado = null;
    }

    onDeleteProducto(id: number) {
        this._productoService.deleteProducto(id).subscribe(
            response => {
                // a veces NO SE POR QUE devuelve otro tipo de objeto y se accede a sus datos de la siguiente manera
                if (response.code == 200) {
                    this.getProductos();
                } else {
                    alert('Error al borrar producto');
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }

}