import yup from 'yup'
import {EUserType} from "../utils/static_enum.js";

/* VS: Validation Schema */
export const CarVS = yup.object().shape({

    carNumber: yup.string().min(1, 'Car Number must be more than 2 characters').required(),
    brand: yup.string().min(1, 'Brand must be more than 2 characters').required(),
    customer: yup.string().min(1, 'Customer found').required(),

})

export class CarDto {

    carNumber

    brand

    customer

    constructor({ carNumber, brand, customer }) {

        this.carNumber = carNumber
        this.brand = brand
        this.customer = customer

    }

}
