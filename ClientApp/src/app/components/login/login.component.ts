import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb:FormBuilder,private router:Router) { }

  ngOnInit() {
    
    this.loginForm = this.fb.group({

      spanEmail:['',Validators.required,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")],
      spanPassword:['',Validators.required]
    });
  }

  public get getLoginControl(){
    return this.loginForm.controls;
  }

  loginSubmit()
  {
    
  }


  cancelLogin()
  {
    this.router.navigate(['home'])

  }


}
