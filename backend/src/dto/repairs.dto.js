import yup from 'yup'

/* VS: Validation Schema */
export const RepairVS = yup.object().shape({
    car: yup.string().min(1, 'Customer found').required(),
    price: yup.number().min(0, 'Repair\'s  Price is required').required(),
    repairType: yup.string().min(1, 'Repair Type must be more than 2 characters').required(),
    carDroppedOffAt: yup.date(),
})

export class RepairDto {

    car

    price

    repairType

    carDroppedOffAt


    constructor({ car, price, repairType, carDroppedOffAt }) {

        this.car = car
        this.price = price
        this.repairType = repairType
        this.carDroppedOffAt = carDroppedOffAt

    }

}
