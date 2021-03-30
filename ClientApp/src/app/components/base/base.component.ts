import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/_models/User';
import { AlertifyService } from 'src/_services/alertify.service';
import { AuthService } from 'src/_services/auth.service';
import { CustomerService } from 'src/_services/customer.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  user: User;

  constructor(private alertify: AlertifyService, private customerService: CustomerService, private router: Router, private authService: AuthService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser()
  {
    return this.customerService.getById(this.authService.decodedToken?.nameid).subscribe((data: User)=>{

      this.user=data;
      console.log(this.user);

    },error=>{
      this.alertify.errorAlert("Something went wrong");
    })
  }

  logOut(){
    localStorage.removeItem('token');
    this.alertify.successAlert("Logged out");
    this.router.navigate(['/home']);
  }
}
