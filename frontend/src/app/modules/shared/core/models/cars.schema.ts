import {BaseSchema} from "./base.schema";

export interface ICars extends BaseSchema {
  userId : number;
  matricule : string;
  type : string;
  deleteAt : Date;
}
