import { BaseSchema } from './bases.schema'
import { IRepairType } from './repair_types.schema'


export interface ICarDiagnosisItem {
    repairType: IRepairType;

    quantity: number;
}


export interface ICarDiagnosis extends BaseSchema {

    price: number;

    repair: string;

    diagnosisRepairs: ICarDiagnosisItem[];

}
