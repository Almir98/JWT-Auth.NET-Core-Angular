import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomerService } from 'src/_services/customer.service';
import { User } from 'src/_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ClientApp';

  helper = new JwtHelperService();
  user: User;

  constructor(private authService: AuthService,private userService: CustomerService)
  {
  }

  ngOnInit()
  {
    const token = localStorage.getItem('token');
    if(token)
    {
      this.authService.decodedToken = this.helper.decodeToken;
    }

    // this.userService.getById(this.authService.decodedToken?.nameid).subscribe((us:User) => {

    //   this.user = us;
    // })
  }


}
