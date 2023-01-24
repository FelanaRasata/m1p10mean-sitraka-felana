import { BaseSchema } from './bases.schema'


export interface IUser extends BaseSchema {

    firstName: string;

    lastName: string;

    userName: string;

    type: string;

    emailAddress: string;

    password: string;

}
