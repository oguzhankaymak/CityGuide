import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RegisterUser } from '../models/registerUser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private formBuilder : FormBuilder) { }

  registerUser : RegisterUser;
  registerForm : FormGroup;

  createRegisterForm()
  {
    this.registerForm =  this.formBuilder.group
    (
      {
        username : ["",Validators.required],
        email : ["",[Validators.required,Validators.email]],
        password : ["",[Validators.required, Validators.minLength(4),Validators.maxLength(10)]],
        confrimPassword : ["",Validators.required],
        firstName : ["",Validators.required],
        lastName : ["",Validators.required] 
      },
      {validator : this.passwordMatchValidator}
    )
  }

  passwordMatchValidator(g:FormGroup)
  {
    return g.get('password').value === g.get('confrimPassword').value ? null : {mismatch:true}
  }

  ngOnInit() {
    this.createRegisterForm();
  }

  register()
  {
    if(this.registerForm.valid)
    {
      this.registerUser = Object.assign({},this.registerForm.value);
      // console.log(this.registerUser);
      this.authService.register(this.registerUser);
    }
  }

}
