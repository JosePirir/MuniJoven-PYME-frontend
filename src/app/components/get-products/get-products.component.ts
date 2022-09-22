import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { CONNECTION } from 'src/app/services/global';
import { RestProductService } from 'src/app/services/rest-product.service';
import { RestUserService } from 'src/app/services/rest-user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styles: [
  ]
})
export class GetProductsComponent implements OnInit {

  products: any;
  user: User;
  product : Product;
  token: string;
  uri: string;
  filesToUpload: Array<File>;
  search: any;
  optionsAvailable = ['Disponible', 'No Disponible', 'Reservado'];
  optionsGender = ['Hombre', 'Mujer', 'Niño', 'Niña'];



  constructor(private restProduct:RestProductService, private restUser: RestUserService, private route: Router) {
    this.uri = CONNECTION.URI;
    this.token = this.restUser.getToken();
    this.product = new Product('','',0,'','','',''); //para que lea las propiedades del modelo.
    this.user = this.restUser.getUser();
  }

  ngOnInit(): void {
    this.token = this.restUser.getToken();
    this.products =  JSON.parse(localStorage.getItem('products') || '{}');
    this.getProducts();
  }

  getProducts()
  {
      return this.restProduct.getProducts().subscribe((res:any)=>{ /*res es la información que trae de la base del backend*/
      if(res)
      {
        this.products = res.products;
        localStorage.setItem('products', JSON.stringify(res.products));
      }
      else
      {
        alert(res.message);
      }
    },(error: any)=>alert(error.error.message))
  }

  obtenerData(productSelected:any)
  {
    this.product = productSelected;
    localStorage.setItem('productSelected', JSON.stringify(productSelected));
  }

  borrarData()
  {
    localStorage.removeItem('productSelected');
    this.getProducts();
  }

  uploadImage()
  {
    this.restProduct.fileRequestProduct(this.product._id, [], this.filesToUpload, this.token, 'image').then((res:any)=>{
      if(res.product)
      {
        this.product.image = res.productImage;
        localStorage.setItem('product',JSON.stringify(this.product));
        Swal.fire({
          icon:'success',
          title: "Imagen subida con exito",
          showConfirmButton: false
        })
        this.borrarData();
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
  }

  updateProduct()
  {
    this.restProduct.updateProduct(this.product._id, this.product).subscribe((res:any)=>{
      if(res)
      {
        this.getProducts();
        localStorage.setItem('products', JSON.stringify(res.productUpdated));
        Swal.fire({
          icon:'success',
          title: `${res.message}`,
          showConfirmButton: false
        })
      }
      else
      {
        Swal.fire({
          icon:'error',
          title: `${res.message}`,
          showConfirmButton: false
        })
      }
    },(error:any)=> 
    Swal.fire({
      icon:'error',
      title: `${error.error.message}`,
      showConfirmButton: false
    })
    );
  }

  deleteProduct()
  {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No se podrá revertir.",
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.restProduct.deleteProduct(this.product._id).subscribe((res:any)=>{
          if(res)
          {
            Swal.fire({
              icon: 'success',
              title: 'Se eliminó el producto.'
            })
            this.getProducts();
          }
          else
          {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: `${res.message}`
            })
          }      
        },(error:any)=>Swal.fire({
          icon: 'error',
          title:'Error',
          text: `${error.error.message}`
        }));
      }
    })
  }

}