import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RestUserService } from '../services/rest-user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = this.restUser.getUser();
    if(user && user.role == 'admin')
    {
      return true;
    }
    else
    {
      let token = this.restUser.getToken();
      if(user && token.length > 0)
      {
        this.router.navigateByUrl('');
        return false;
      }
      else
      {
        this.router.navigateByUrl('');
        return false;
      }
    }
  }

  constructor(private restUser: RestUserService, private router: Router){}
  
}
