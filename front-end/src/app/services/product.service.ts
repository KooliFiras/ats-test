import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(private _http: Http) { }

  getProducts() {

    return this._http.get('http://localhost/ats/web/app_dev.php/api/products')
      .map((resp) => resp.json() );
    }





}
