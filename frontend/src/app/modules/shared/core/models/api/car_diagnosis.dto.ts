import { BaseSchema } from '../schemas/bases.schema'
import { IRepairType } from '../schemas/repair_types.schema'

export interface ICarDiagnosisCreateItem {
    repairType: IRepairType;

    quantity: number;
}

export interface ICarDiagnosisCreate extends BaseSchema {

    repair: string;

    diagnosisRepairs: ICarDiagnosisCreateItem[];

}
