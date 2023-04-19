import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { GLOBAL } from '../services/global';

@Component({
    selector: "porducto-add",
    templateUrl: "../views/producto-add.html",
    providers: [ProductoService]
})

export class ProductoAddComponent {
    public titulo: string;
    public producto: Producto;
    public filesToUpload: any;
    public resultUpload: any;


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

        if (this.filesToUpload && this.filesToUpload.length >= 1) {
            this._productoService.makeFileRequest(GLOBAL.url + 'upload-file', [], this.filesToUpload).subscribe((result) => {
                console.log(result);

                this.resultUpload = result;
                this.producto.imagen = this.resultUpload.filename;
                this.saveProducto();

            }, (error) => {
                console.log(error);
            });
        } else {
            this.saveProducto();
        }
    }

    saveProducto() {
        this._productoService.addProducto(this.producto).subscribe(
            response => {
                this._router.navigate(['/productos']);

            },
            error => {
                console.log(<any>error);
            }
        );
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }
}