import {BaseSchema} from "./base.schema";

export interface IUsers extends BaseSchema{

  lastname: string;

  firstname: string;

  username: string;

  password: string;

  email: string;

  typeUser: string;

}
