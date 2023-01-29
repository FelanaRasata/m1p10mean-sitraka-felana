import { BaseSchema } from './bases.schema'


export interface IRepairType extends BaseSchema {
    name: string;

    repairCost: number;

    carPart: boolean;
}
