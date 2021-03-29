import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/_services/auth.service';
import { User } from '../../../_models/User';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user: any ={};
  model: any ={};


  constructor(private fb:FormBuilder, private router: Router, private authService: AuthService) { }

  public get getRegisterControl(){
    return this.registerForm.controls;
  }
  
  ngOnInit() {
    this.registerForm = this.fb.group({
     
      spanFirstName:['',Validators.required],
      spanLastName:['',Validators.required],
      spanPhone:['',Validators.required],
      spanEmail:['',Validators.required],
      spanAddress:['',Validators.required],
      spanPassword:['',Validators.required],
      spanPasswordConfirm:['',Validators.required],
    });
  }

  registerSubmit()
  {
    if(this.registerForm.invalid)
    {
      this.registerForm.markAllAsTouched();
      return;
    }
    if(this.getRegisterControl.spanPassword.value != this.getRegisterControl.spanPasswordConfirm.value)
    {
      this.getRegisterControl.spanPassword.invalid;
      this.getRegisterControl.spanPasswordConfirm.invalid;
      this.getRegisterControl.spanPassword.reset();
      this.getRegisterControl.spanPassword.markAsTouched();

      this.getRegisterControl.spanPasswordConfirm.reset();
      this.getRegisterControl.spanPasswordConfirm.markAsTouched();
      return;
    }

    this.user.firstName = this.getRegisterControl.spanFirstName.value;
    this.user.lastName = this.getRegisterControl.spanLastName.value;
    this.user.phone = this.getRegisterControl.spanPhone.value;
    this.user.email = this.getRegisterControl.spanEmail.value;
    this.user.address = this.getRegisterControl.spanAddress.value;
    this.user.password = this.getRegisterControl.spanAddress.value;
    this.user.passwordConfirm = this.getRegisterControl.spanPasswordConfirm.value;

    console.log(this.user);
    
    this.authService.register(this.user).subscribe(e=>{

      this.model = this.user;
      console.log(this.model);
      alert("da");

    },error =>{

      console.log(error);
      alert("neee");

    })
  }

  cancelRegister(){
    this.router.navigate(['home']);
  }

}
