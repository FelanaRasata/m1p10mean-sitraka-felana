import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { EUserType } from '../../utils/static_enum.js'


export class SignInDto {

    constructor(emailAddress, password) {

        this.emailAddress = emailAddress
        this.password = password

    }


    @IsEmail()
    @IsNotEmpty()
    emailAddress

    @IsString()
    @IsNotEmpty()
    password

}


export class UserDto {

    constructor(lastName, emailAddress, firstName, password) {

        this.lastName = lastName
        this.type = EUserType.CUS
        this.emailAddress = emailAddress
        this.firstName = firstName
        this.password = password

    }


    @IsString()
    @IsOptional()
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

}
