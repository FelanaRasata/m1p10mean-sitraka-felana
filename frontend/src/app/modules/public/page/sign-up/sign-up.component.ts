import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SessionService } from '../../../shared/core/services/session/session.service'
import { Router } from '@angular/router'
import { EUserType } from '../../../shared/core/models/global/static_enums'
import { NotificationService } from '../../../shared/core/services/notification/notification.service'


@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {

    signUpForm: FormGroup


    constructor(
        private formBuilder: FormBuilder,
        private sessionService: SessionService,
        private notificationService: NotificationService,
        private router: Router,
    ) {

        this.signUpForm = formBuilder.group({
            'firstName': ['Prema', Validators.required],
            'lastName': ['Dogan', Validators.required],
            'userName': ['prema_dogan69', Validators.required],
            'emailAddress': ['prema_dogan@example.com', Validators.required],
            'password': ['test_1234_test', Validators.required],
            'passwordConfirm': ['test_1234_test', Validators.required],
        })

    }


    signUp(): void {

        this.signUpForm.markAllAsTouched()

        if (this.signUpForm.valid) {

            const signUpFormValues = Object.assign(this.signUpForm.value, {type: EUserType.CUS})

            if (signUpFormValues.password !== signUpFormValues.passwordConfirm) {

                this.notificationService.simpleAlert('Password not matching, please try again')
                return

            }

            this.sessionService.signUp({...this.signUpForm.value}).subscribe(async (status) => {

                if (status) await this.router.navigate([`/${this.sessionService.getUrlPart()}/`])

            })

        }

    }


}
