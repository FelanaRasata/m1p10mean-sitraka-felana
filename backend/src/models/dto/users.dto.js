import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { EUserType } from '../../utils/static_enum.js'


export class SignInDto {

    @IsEmail()
    @IsNotEmpty()
    emailAddress

    @IsString()
    @IsNotEmpty()
    password


    constructor(emailAddress, password) {

        this.emailAddress = emailAddress
        this.password = password

    }

}


export class UserDto {

    @IsString()
    @IsNotEmpty()
    firstName

    @IsString()
    @IsNotEmpty()
    lastName

    @IsString()
    @IsNotEmpty()
    userName

    @IsEmail()
    @IsNotEmpty()
    emailAddress

    @IsString()
    @IsNotEmpty()
    password


    constructor(lastName, emailAddress, firstName, password) {

        this.lastName = lastName
        this.type = EUserType.CUS
        this.emailAddress = emailAddress
        this.firstName = firstName
        this.password = password

    }

}
