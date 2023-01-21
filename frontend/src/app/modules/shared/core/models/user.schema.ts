import {BaseSchema} from "./bases.schema";

export interface IUser extends BaseSchema{

  lastname: string;

  firstname: string;

  username: string;

  password: string;

  email: string;

  typeUser: string;

}
