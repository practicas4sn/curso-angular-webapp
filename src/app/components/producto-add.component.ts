import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

@Component({
    selector: "porducto-add",
    templateUrl: "../views/producto-add.html",
    providers: [ProductoService]
})

export class ProductoAddComponent {
    public titulo: string;
    public producto: Producto;

    constructor(
        private _productoService: ProductoService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.titulo = "Crear un nuevo producto";
        this.producto = new Producto(0, "", "", 0, "");
    }

    noOnInit() {
        console.log("producto-add.component.ts cargado...");

    }

    onSubmit() {
        console.log(this.producto);
        this._productoService.addProducto(this.producto).subscribe(
            response => {
                    this._router.navigate(['/productos']);
            },
            error => {
                console.log(<any>error);
            }
        );
    }

}