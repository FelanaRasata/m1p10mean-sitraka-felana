import { Component } from '@angular/core';
import {IUsers} from "../../../shared/core/models/users.schema";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  users = {} as IUsers;
  passwordConfirm : string = "";
}
