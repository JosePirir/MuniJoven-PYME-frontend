import { Component, OnInit } from '@angular/core';
import { RestProductService } from 'src/app/services/rest-product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { RestUserService } from 'src/app/services/rest-user.service';

@Component({
  selector: 'app-save-product',
  templateUrl: './save-product.component.html',
  styles: [
  ]
})
export class SaveProductComponent implements OnInit {
  public product: Product;
  public token;
  public user;
  public optionsSize = ['S','M','X','XL'];
  public optionsGender = ['Hombre', 'Mujer', 'Niño', 'Niña'];

  constructor(private restProduct:RestProductService, private restUser:RestUserService, private router:Router)
  {
    this.product = new Product('','',0,'','','','');
    this.token = restUser.getToken();
    this.user = restUser.getUser();
  }

  ngOnInit(): void {
  }

  onSubmit(statusForm: any)
  {
    this.restProduct.saveProduct(this.product).subscribe((res:any)=>{
      if(res.productSaved) /*productSaved viene del backend*/
      {
        alert(res.message);
        this.product = new Product('','',0,'','','','');
        statusForm.reset();
        this.router.navigateByUrl('getProducts');
      }
      else
      {
        alert(res.message);
      }
    },(error:any)=>alert(error.error.message))
  }
}
