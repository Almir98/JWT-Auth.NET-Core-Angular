import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/_services/auth.service';
import { User } from '../../../_models/User';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user: User =new User();
  model: any ={};
  apiUrl=environment.baseUrl +"/Customer/register"; 


  constructor(private fb:FormBuilder, private router: Router, private authService: AuthService,private http:HttpClient) { }

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
      spanUsername:['',Validators.required],
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

    this.user.FirstName = this.getRegisterControl.spanFirstName.value;
    this.user.LastName = this.getRegisterControl.spanLastName.value;
    this.user.Phone = this.getRegisterControl.spanPhone.value;
    this.user.Email = this.getRegisterControl.spanEmail.value;
    this.user.Adress = this.getRegisterControl.spanAddress.value;
    this.user.Username = this.getRegisterControl.spanUsername.value;
    this.user.Password = this.getRegisterControl.spanAddress.value;
    this.user.PassworConfirm = this.getRegisterControl.spanPasswordConfirm.value;

    this.authService.register(this.user).subscribe(e =>{
      this.router.navigate(['/information']);

    },error =>{

      console.log(error);
    });
  }

  cancelRegister(){
    this.router.navigate(['home']);
  }
}
