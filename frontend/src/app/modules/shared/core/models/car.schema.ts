import {BaseSchema} from "./base.schema";

export interface ICar extends BaseSchema {
  userId : number;
  matricule : string;
  type : string;
  deleteAt : Date;
}
