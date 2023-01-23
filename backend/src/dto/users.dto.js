import yup from 'yup'
import { EUserType } from '../utils/static_enums.js'

/* VS: Validation Schema */
export const UserVS = yup.object().shape({
    firstName: yup.string().min(1, 'Firstname must be more than 2 characters').required(),
    lastName: yup.string().min(1, 'Lastname must be more than 2 characters').required(),
    userName: yup.string().min(1, 'Username must be more than 2 characters').required(),
    emailAddress: yup.string().email('Invalid email address').required(),
    password: yup.string().min(10, 'Password must be more than 2 characters').required()
})

export const SignInVS = yup.object().shape({
    emailAddress: yup.string().email('Invalid email address').required(),
    password: yup.string().min(11, 'Password must be more than 2 characters').required()
})


/* DTOs */
export class SignInDto {

    emailAddress

    password


    constructor({ emailAddress, password }) {

        this.emailAddress = emailAddress
        this.password = password

    }

}


export class UserDto {

    firstName

    lastName

    userName

    type

    emailAddress

    password


    constructor({ firstName, lastName, userName, emailAddress, password }) {

        this.firstName = firstName
        this.lastName = lastName
        this.userName = userName
        this.type = EUserType.CUS
        this.emailAddress = emailAddress
        this.password = password

    }

}