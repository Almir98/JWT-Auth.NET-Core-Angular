import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../_models/User';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user: User = new User();

  constructor(private fb:FormBuilder, private router: Router) { }

  public get getRegisterControl(){
    return this.registerForm.controls;
  }
  
  ngOnInit() {
    this.registerForm = this.fb.group({
     
      spanFirstName:['',Validators.required],
      spanLastName:['',Validators.required],
      spanPhone:['',Validators.required],
      spanEmail:['',Validators.required,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")],
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
      return;
    }

    this.user.firstName = this.getRegisterControl.spanFirstName.value;
    this.user.lastName = this.getRegisterControl.spanLastName.value;
    this.user.phone = this.getRegisterControl.spanPhone.value;
    this.user.email = this.getRegisterControl.spanEmail.value;
    this.user.address = this.getRegisterControl.spanAddress.value;
    this.user.password = this.getRegisterControl.spanAddress.value;

  }

  cancelRegister(){
    this.router.navigate(['home']);
}

}
