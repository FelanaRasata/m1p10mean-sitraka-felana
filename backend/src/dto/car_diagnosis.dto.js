import yup from 'yup'

/* VS: Validation Schema */
export const CarDiagnosisCreateVS = yup.object().shape({
    repair: yup.string().min(1, 'Repair ID must be more than 2 characters').required(),
    diagnosisRepairs: yup.array().min(1, 'List of repair must be more than 2 characters').required(),
})


export class CarDiagnosisCreateDto {

    repair

    diagnosisRepairs

    constructor({repair, diagnosisRepairs}) {

        this.repair = repair
        this.diagnosisRepairs = diagnosisRepairs

    }

}
