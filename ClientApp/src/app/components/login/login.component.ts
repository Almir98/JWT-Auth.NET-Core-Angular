import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  model:any={};

  constructor(private fb:FormBuilder, private router:Router, private authService: AuthService) { }

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

    console.log(this.model);

    this.authService.loginMethod(this.model).subscribe(x => {

      this.loginForm.reset();
      this.router.navigate(['/home']);

    },error =>{

      console.log(error);
    })
  }


  cancelLogin()
  {
    this.router.navigate(['home'])

  }


}
