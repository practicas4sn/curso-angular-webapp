import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Producto } from '../models/producto';
import { Observable } from "rxjs";


@Injectable()
export class ProductoService {
    public url: string;

    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    // acceder a los productos
    getProductos() {
        return this._http.get(this.url + 'productos', { observe: 'response' });
    }

    // añadir productos
    addProducto(producto: Producto) {
        let json = JSON.stringify(producto);
        let params = 'json=' + json;
        let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this._http.post(this.url + 'productos', params, { headers: headers, observe: 'response' }).pipe(map((response: HttpResponse<any>) => { return response.body; }));
    }

    // subida de archivos
    makeFileRequest(url: string, params: Array<string>, files: Array<File>): Observable<any> {
        const formData: FormData = new FormData();
        const xhr: XMLHttpRequest = new XMLHttpRequest();

        for (let i = 0; i < files.length; i++) {
            formData.append('uploads[]', files[i], files[i].name);
        }

        return new Observable(observer => {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.open('POST', url, true);
            xhr.send(formData);
        }).pipe(map(res => res));
    }
}

