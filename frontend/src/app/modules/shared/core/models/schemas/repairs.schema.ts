import { BaseSchema } from './bases.schema'
import { ICar } from './cars.schema'
import { IRepairType } from './repair_types.schema'
import { ICarDiagnosis } from './car-diagnosis.schema'

export interface IRepairTypeItem {

    repairType: IRepairType

    checked: boolean

}

export interface IRepair extends BaseSchema {
    car: ICar

    price: number

    selectedRepairs: IRepairTypeItem[]

    carDroppedOffAt: Date

    diagnosedAt: Date

    initiatedAt: Date

    inProgressAt: Date

    carRepairedAt: Date

    paidAt: Date

    carTakenBackAt: Date

    car_diagnosis: ICarDiagnosis
}
