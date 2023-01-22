import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  emailAddress : string = "";
  password : string = "";

  constructor() {
  }

  signIn(){

    console.log("Sign In");

  }
}
