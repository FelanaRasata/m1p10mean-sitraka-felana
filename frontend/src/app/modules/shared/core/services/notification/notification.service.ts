import { Injectable } from '@angular/core'
import sweetalert2, { SweetAlertIcon } from 'sweetalert2'
import { isEmpty } from '../utils/utils'


@Injectable({
    providedIn: 'root',
})
export class NotificationService {

    constructor() {
    }


    simpleAlert(title: string) {

        sweetalert2
            .fire(title)
            .then()

    }


    alert(title: string, text?: string, icon?: string) {

        sweetalert2
            .fire(
                title,
                text, // text or html
                !isEmpty(icon) ? icon as SweetAlertIcon : undefined,
            )
            .then()

    }


    confirmBox(
        // title
        title: string,
        confirmTitle: string,
        cancelTitle: string,
        // button text
        confirmButtonText: string,
        cancelButtonText: string,
        // first alert content
        text?: string,
        icon?: string,
    ): Promise<boolean> {

        const sweetalert2Options: any = {
            title: title,
            text: text,
            icon: !isEmpty(icon) ? icon as SweetAlertIcon : undefined,
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
        }

        return new Promise((resolve, reject) => {

            sweetalert2
                .fire(sweetalert2Options)
                .then((result) => {

                    resolve(result.value || !(result.dismiss === sweetalert2.DismissReason.cancel))

                })
                .catch((error) => {

                    reject(error)

                })

        })

    }

}
