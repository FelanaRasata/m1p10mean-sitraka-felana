import { BaseSchema } from './bases.schema'


export interface IRepairType extends BaseSchema {
    _id: string;

    name: string;

    repairCost: number;

    carPart: boolean;
}
