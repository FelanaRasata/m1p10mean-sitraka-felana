import yup from 'yup'

/* VS: Validation Schema */
export const RepairTypeVS = yup.object().shape({
    name: yup.string().min(1, 'Customer found').required(),
    repairCost: yup.number().min(0, 'Repair\'s  Price is required').required(),
    carPart: yup.boolean(),
})


export class RepairTypeDto {

    name

    repairCost

    carPart


    constructor({name, repairCost, carPart}) {

        this.name = name
        this.repairCost = repairCost
        this.carPart = carPart

    }

}
