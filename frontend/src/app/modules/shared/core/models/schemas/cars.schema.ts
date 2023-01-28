import { BaseSchema } from './bases.schema'


export interface ICar extends BaseSchema {
    carNumber: string,

    brand: string,

    customer: string,
}

