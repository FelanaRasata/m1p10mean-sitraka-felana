import * as nodemailer from 'nodemailer'
import { CONSTANTS } from './constants.js'


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