import * as CryptoJS from 'crypto-js'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import * as nodemailer from 'nodemailer'
import validator from 'validator'
import { Settings } from '../config/settings.js'
import { CONSTANTS } from './constants.js'


const settings = new Settings()


export async function sendEmail(recipients, topic, message, isHtml, cc = [], bcc = [], attachments = []) {

    console.log(">>>>>>>>>>>>")

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


export function retrieveToken(req) {

    const authorization = req.header('Authorization').split('Bearer ')[1] || null

    if (isEmpty(authorization))
        throw createError(409, 'Session not found')

    return authorization

}


export function retrieveTokenData(req) {

    const token = retrieveToken(req)

    return verifyToken(token)

}


export function generateToken(tokenData, expiresIn) {

    return jwt.sign(tokenData, settings.secretKey, { expiresIn })

}


export function verifyToken(token) {

    return jwt.verify(token, settings.secretKey)

}


export function toResponseEntity(status, message = '', data = undefined) {

    const response = { message: isEmpty(message) ? 'Data found' : message, status: status }

    if (!isEmpty(data)) Object.assign(response, { data: data })

    return response

}


export function encrypt(value) {

    if (isEmpty(value) || isEmpty(value.trim())) throw createError(409, 'Value not found')

    return CryptoJS.AES.encrypt(value.trim(), settings.encryptionKey).toString()

}


export function decrypt(value) {

    if (isEmpty(value) || isEmpty(value.trim())) throw createError(409, 'Value not found')

    return CryptoJS.AES.decrypt(value.trim(), settings.encryptionKey).toString(CryptoJS.enc.Utf8)

}
