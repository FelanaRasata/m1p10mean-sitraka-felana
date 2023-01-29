import { BaseSchema } from './bases.schema'
import { ICar } from './cars.schema'


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

export interface IFullRepair extends BaseSchema {
    car: ICar;

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
