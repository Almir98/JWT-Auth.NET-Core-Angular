import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { User } from 'src/_models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl=environment.baseUrl +"/Customer/"; 

  helper = new JwtHelperService();
  decodedToken:any;

constructor(private http: HttpClient) { }

loginMethod(model:any){

  return this.http.post(this.apiUrl+'login',model)
  .pipe(
    map((response:any)=>{

      const user=response;
      if(user)
      {
        localStorage.setItem('token',user.token);
        this.decodedToken=this.helper.decodeToken(user.token);
      }
    })
  )  
}

register(model:any)
{
  return this.http.post(this.apiUrl+'register',model);
}

}
