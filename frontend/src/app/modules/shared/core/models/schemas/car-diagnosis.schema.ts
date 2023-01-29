import { BaseSchema } from './bases.schema'


export interface ICarDiagnosisItem {
    repairType: string;

    quantity: number;
}


export interface ICarDiagnosis extends BaseSchema {

    price: number;

    repair: string;

    diagnosisRepairs: ICarDiagnosisItem[];

}
