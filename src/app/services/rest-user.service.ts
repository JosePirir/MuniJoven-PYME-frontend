import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../models/user';
import { CONNECTION } from './global';

@Injectable({
  providedIn: 'root'
})

export class RestUserService {
  public uri: string;
  public httpOptions = {
    headers : new HttpHeaders ({
      'Content-Type' :'application/json'
    })
  }

  public httpOptionsAuth = {
    headers: new HttpHeaders ({
      'Content-Type' :'application/json',
      'Authorization': this.getToken()
    })
  }

  public user :User;
  public token :any;

  private extractData(res: any/*Response*/)
  {
    let body = res;
    return body || [] || {};
  }

  constructor(private http: HttpClient)
  {
    this.uri = CONNECTION.URI;
  }

  getUser()
  {
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user !== undefined || user !== null)
    {
      this.user = user;
    }
    else
    {
      this.user as any;
    }
    return this.user;
  }

  getToken()
  {
    let token = localStorage.getItem('token');
    if(token !== undefined || token !== null)
    {
      this.token = token;
    }
    else
    {
      this.token as string;
    }
    return this.token;
  }

  login(user: any, token:any)
  {
    user.gettoken = token;
    let params = JSON.stringify(user)
    return this.http.post(this.uri + 'login', params, this.httpOptions).pipe(map(this.extractData));
  }

  saveUser(user: any)
  {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization' : this.getToken()
    })
    return this.http.post(this.uri + 'saveUser', params, {headers:headers}).pipe(map(this.extractData));
  }
}