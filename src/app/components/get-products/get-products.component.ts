import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { CONNECTION } from 'src/app/services/global';
import { RestProductService } from 'src/app/services/rest-product.service';
import { RestUserService } from 'src/app/services/rest-user.service';


@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styles: [
  ]
})
export class GetProductsComponent implements OnInit {

  products: any;
  user : User;
  product : Product;
  token: string;
  uri: string;
  filesToUpload: Array<File>;


  constructor(private restProduct:RestProductService, private restUser: RestUserService, private route: Router) {
    this.uri = CONNECTION.URI;
    this.token = this.restUser.getToken();
    this.user = this.restUser.getUser();
  }

  ngOnInit(): void {
    this.token = this.restUser.getToken();
    this.getProducts();
    JSON.parse(localStorage.getItem('products') || '{}');
  }

  getProducts()
  {
      this.restProduct.getProducts().subscribe((res:any)=>{ /*res es la información que trae de la base del backend*/
      if(res)
      {
        this.products = res.products;
        localStorage.setItem('products', JSON.stringify(res.products));
        console.log(res.products);
      }
      else
      {
        alert(res.message);
      }
    },(error: any)=>alert(error))
  }

  obtenerData(productSelected:any)
  {
    this.product = productSelected;
    localStorage.setItem('productSelected', JSON.stringify(productSelected));
  }

  uploadImage()
  {
    this.restProduct.fileRequestProduct(this.product._id, [], this.filesToUpload, this.token, 'image').then((res:any)=>{
      if(res.product)
      {
        this.product.image = res.productImage;
        localStorage.setItem('product',JSON.stringify(this.product));
        alert('Imagen subida con exito :D');
      }
      else
      {
        alert(res.message);
      }
    },(error:any)=>alert(error.error.message))
  }

  
  fileChange(fileInput:any)
  {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }
}

