import { BaseSchema } from './bases.schema'


export interface ICarDiagnosis extends BaseSchema {

    price: number;

    repair: string;

    repairType: string[];

}
