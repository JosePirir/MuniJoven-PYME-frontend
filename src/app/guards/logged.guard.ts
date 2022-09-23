import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RestUserService } from '../services/rest-user.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = this.restUser.getToken();
    if(token == null || token == undefined)
    {
      return true;
    }
    else
    {
        this.router.navigateByUrl('');
        return false;
    }
  }
  
  constructor(private restUser: RestUserService, private router: Router){}
}
