import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{

    loginFormGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl('')
    });;

    ngOnInit(): void {
    }

    onSignIn() {

    }
}
