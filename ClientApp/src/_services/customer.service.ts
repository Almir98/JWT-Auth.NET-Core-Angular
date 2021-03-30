import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/_models/User';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  user:User;
apiUrl=environment.baseUrl +"/Customer/"; 

constructor(private http: HttpClient) { }

getById(id: number): Observable<User>
{
  return this.http.get<User>(this.apiUrl+id);
}

}
