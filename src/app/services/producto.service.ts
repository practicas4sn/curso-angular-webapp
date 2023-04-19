import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Producto } from '../models/producto';


@Injectable()
export class ProductoService {
    public url: string;

    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    getProductos() {
        return this._http.get(this.url + 'productos', { observe: 'response' });
    }


    addProducto(producto: Producto) {
        let json = JSON.stringify(producto);
        let params = 'json=' + json;
        let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this._http.post(this.url + 'productos', params, { headers: headers, observe: 'response' }).pipe(map((response: HttpResponse<any>) => { return response.body; }));
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append('uploads[]', files[i], files[i].name);
            }
        });
    }
}

