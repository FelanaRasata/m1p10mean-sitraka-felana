import { Component } from '@angular/core';
import {IUser} from "../../../shared/core/models/user.schema";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  users = {} as IUser;
  passwordConfirm : string = "";
}
