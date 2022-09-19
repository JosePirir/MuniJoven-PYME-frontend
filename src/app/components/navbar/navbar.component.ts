import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CONNECTION } from 'src/app/services/global';
import { RestUserService } from 'src/app/services/rest-user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  token: string | null;
  user: User;
  uri :string;

  public isCollapsed = true;

  constructor(private restUser:RestUserService, private router:Router) { }

  ngOnInit(){
    this.token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.uri = CONNECTION.URI;
  }

  ngDoCheck(){
    this.token = this.restUser.getToken();
    this.user = this.restUser.getUser();
  }

  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('');
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      showConfirmButton: false,
      text: 'Se ha cerrado la sesión con exito! Vuelva pronto'
    });
  }

}
