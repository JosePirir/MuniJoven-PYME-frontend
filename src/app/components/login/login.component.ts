import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/rest-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  user: User;
  token:string;
  userlogged: any;

  constructor(private restUser: RestUserService, private router: Router) {
    this.user = new User('','','','','','');
  }

  ngOnInit(): void {
  }

  onSubmit()
  {
    this.restUser.login(this.user, 'true').subscribe((res:any)=>{
      if(!res.token)
      {
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          showConfirmButton: false,
          text: `${res.message}`
        })
      }
      else
      {
        this.userlogged = res.user;
        this.token = res.token;
        delete this.userlogged.password;
        if(this.token.length <= 0)
        {
          Swal.fire({
            icon: 'error',
            title: 'Erro al iniciar sesión',
            text: 'El token no se generó correctamente'
          })
        }
        else
        {
          localStorage.setItem('token', this.token);
          localStorage.setItem('user', JSON.stringify(this.userlogged));
          Swal.fire({
            icon: 'success',
            title: 'Sesión iniciada',
            showConfirmButton: false,
            text: 'Se ha iniciado la sesión con exito!'
          });
          this.router.navigateByUrl('');
        }
      }
    },
    (error:any)=>
    Swal.fire({
      icon: 'error',
      title: 'Error al iniciar sesión',
      showConfirmButton: false,
      text: `${error.error.message}`
    }))
  }
}
