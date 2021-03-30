import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/_services/alertify.service';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  model:any={};

  constructor(private fb:FormBuilder, private router:Router, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    
    this.loginForm = this.fb.group({

      spaEmail:['',Validators.required],
      spaPassword:['',Validators.required]
    });
  }

  public get getLoginControl(){
    return this.loginForm.controls;
  }

  loginSubmit()
  {
    this.model.email = this.getLoginControl.spaEmail.value;
    this.model.password = this.getLoginControl.spaPassword.value;

    this.authService.loginMethod(this.model).subscribe(x => {

      this.loginForm.reset();
      this.alertify.successAlert("Successfully logged in");
      this.router.navigate(['/information']);

    },error =>{

      console.log(error);
      this.alertify.errorAlert("Something went wrong");
    })
  }

  cancelLogin()
  {
    this.router.navigate(['home'])

  }


}
