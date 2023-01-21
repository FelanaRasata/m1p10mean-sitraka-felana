import jsonwebtoken from 'jsonwebtoken'
import mongoose from 'mongoose'
import * as nodemailer from 'nodemailer'
import validator from 'validator'
import { CONSTANTS } from './constants.js'


const SECRET_KEY = process.env.SECRET_KEY || 'secret-key'


export async function sendEmail(recipients, topic, message, isHtml, cc = [], bcc = [], attachments = []) {

    const transporter = nodemailer.createTransport(CONSTANTS.nodemailer_options)

    let mailOptions = {
        from: CONSTANTS.nodemailer_options.auth.user,
        to: recipients,
        subject: topic
    }

    if (isHtml) {

        mailOptions = Object.assign(mailOptions, { html: message })

    } else {

        mailOptions = Object.assign(mailOptions, { text: message })

    }

    if (!isEmpty(cc)) {

        mailOptions = Object.assign(mailOptions, { cc: cc })

    }

    if (!isEmpty(bcc)) {

        mailOptions = Object.assign(mailOptions, { bcc: bcc })

    }

    if (!isEmpty(attachments)) {

        mailOptions = Object.assign(mailOptions, { attachments: attachments })

    }

    const mailPromise = new Promise((resolve, reject) => {

        transporter.sendMail(mailOptions, (error, info) => {

            if (error) {

                console.log('Email error: ', error)

                reject(error)

            } else {

                const result = 'Email sent: ' + info.response
                console.log(result)
                resolve(true)

            }

        })

    })

    return await mailPromise

}


export function isEmpty(value) {

    return (
        value === null || // check for null
        value === undefined || // check for undefined
        value === '' || // check for empty string
        (Array.isArray(value) && value.length === 0) || // check for empty array
        (typeof value === 'object' && Object.keys(value).length === 0) // check for empty object
    )

}


export function baseModel(schemaDefinition) {

    return Object.assign(schemaDefinition, {
        deleted: {
            type: Boolean,
            required: true,
            default: false
        },
    })

}


export function customLabels() {

    return CONSTANTS.custom_labels

}


export function isEmailValid(email) {

    try {

        return validator.isEmail(email)

    } catch (error) {

        console.log(error)

        return false

    }

}


export function toDocumentFormat(userData) {

    return Object.assign(userData, { _id: String(new mongoose.mongo.ObjectId()) })

}


export async function retrieveToken(req) {

    const authorization = req.header('Authorization').split('Bearer ')[1] || null

    if (isEmpty(authorization))
        throw new Error('Session not found')

    return authorization

}


export async function retrieveTokenData(req) {

    return await verifyToken(retrieveToken(req))

}


export async function generateToken(tokenData, expiresIn) {

    return jsonwebtoken.sign(tokenData, SECRET_KEY, { expiresIn })

}


export async function verifyToken(token) {

    return jsonwebtoken.verify(token, SECRET_KEY)

}


export function toResponseEntity(status, message = '', data = undefined) {

    const response = { message: isEmpty(message) ? 'Data found' : message, status: status }

    if (!isEmpty(data)) Object.assign(response, { data: data })

    return response

}
