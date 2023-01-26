import { BaseSchema } from './bases.schema'


export interface IRepair extends BaseSchema {
    car: string;

    price: number;

    repairType: string[];

    carDroppedOffAt: Date;

    diagnosedAt: Date;

    initiatedAt: Date;

    inProgressAt: Date;

    carRepairedAt: Date;

    paidAt: Date;

    carTakenBackAt: Date;

}
