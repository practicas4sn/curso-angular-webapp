import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { GLOBAL } from '../services/global';

@Component({
    selector: 'producto-edit',
    templateUrl: '../views/producto-add.html',
    providers: [ProductoService]
})
export class ProductoEditComponent {
    public titulo: string;
    public producto: Producto;
    public filesToUpload: any;
    public resultUpload: any;

    constructor(
        private _productoService: ProductoService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.titulo = 'Editar producto';
        this.producto = new Producto(1, '', '', 1, '');
    }

    ngOnInit() {
        console.log(this.titulo);
        this.getProducto();
    }

    onSubmit() {
        console.log(this.producto);

        if (this.filesToUpload && this.filesToUpload.length >= 1) {
            this._productoService.makeFileRequest(GLOBAL.url + 'upload-file', [], this.filesToUpload).subscribe(
                (result) => {
                    console.log(result);

                    this.resultUpload = result;
                    this.producto.imagen = this.resultUpload.filename;
                    this.updateProducto();
                },
                (error) => {
                    console.log(error);
                });
        } else {
            this.updateProducto();
        }
    }

    updateProducto() {
        this._route.paramMap.subscribe((params: Params) => {
            let id = params['get']('id');

            this._productoService.editProducto(id, this.producto).subscribe(
                (response: any) => {
                    this._router.navigate(['/producto', id]);
                },
                (error: any) => {
                    console.log(<any>error);
                }
            );
        });
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
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