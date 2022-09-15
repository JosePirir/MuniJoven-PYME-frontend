import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../models/product';
import { CONNECTION } from './global';
import { RestUserService } from './rest-user.service';

@Injectable({
  providedIn: 'root'
})
export class RestProductService {
  public uri:string;

  public httpOptions={
    headers : new HttpHeaders({
      'Content-Type' :'application/json'
    })
  }

  public httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization' : this.restUser.getToken()
    })
  }

  public product : Product;
  public token : any;

  private extractData(res: any){
    let body = res;
    return body || [] || {};
  }

  constructor(private restUser: RestUserService, private http: HttpClient) {
    this.uri = CONNECTION.URI;
  }

  getProduct(){ /*se llamará cuando se seleccione un libro*/
    let product = JSON.parse(localStorage.getItem('product') || '{}');
    if(product != undefined || product != null)
    {
      this.product = product;
    }
    else
    {
      this.product as any;
    }
    return this.product;
  }

  getProducts(){
    let headers = new HttpHeaders({
      'Content-Type' :'application/json',
      'Authorization' : this.restUser.getToken()
    })
    return this.http.get(this.uri + 'getProducts')
    .pipe(map(this.extractData));
  }

  fileRequestProduct(idProduct: string, params: Array<string>, files:Array<File>, token:string, name:string)
  {
    return new Promise((resolve, reject)=>{
      let formData:any = new FormData();
      let xhr = new XMLHttpRequest();
      let uri = this.uri+'uploadImageProduct/'+idProduct;

      for(let i=0; i<files.length;i++)
      {
        formData.append(name, files[i], files[i].name)
      }
      xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4)
        {
          if(xhr.status == 200)
          {
            resolve(JSON.parse(xhr.response));
        }
        else
        {
          reject(xhr.response);
        }
        }
      }
      xhr.open('PUT', uri, true);
      xhr.setRequestHeader('Authorization',token);
      xhr.send(formData);
    })
  }

  
}
