import { Component } from '@angular/core';
import {IUser} from "../../../shared/core/models/schemas/users.schema";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  users = {} as IUser;
  passwordConfirm : string = "";
}
