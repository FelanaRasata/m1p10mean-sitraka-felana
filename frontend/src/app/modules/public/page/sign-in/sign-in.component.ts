import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SessionService } from '../../../shared/core/services/session/session.service'
import { ActivatedRoute, Router } from '@angular/router'


@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {

    signInForm: FormGroup

    signUp: boolean = true


    userCredentials = {
        customer: {
            email: 'rasatadiamondra@gmail.com',
            password: '1234_viva_l_galleried',
        },
        workshopManager: {
            email: 'jgolsby1@amazonaws.com',
            password: '1234_viva_l_galleried',
        },
        financialManager: {
            email: 'tgarmey0@joomla.org',
            password: '1234_viva_l_galleried',
        },
    }

    currentCredentials: any = null


    constructor(
        private formBuilder: FormBuilder,
        private sessionService: SessionService,
        private router: Router,
        private route: ActivatedRoute,
    ) {

        const path = this.route.snapshot.url[0].path

        switch (path) {

            case 'workshop':
                this.signUp = false
                this.currentCredentials = this.userCredentials.workshopManager
                break

            case 'finance':
                this.signUp = false
                this.currentCredentials = this.userCredentials.financialManager
                break

            case 'sign_in':
                this.signUp = true
                this.currentCredentials = this.userCredentials.customer
                break

            default:
                this.router.navigate(['']).then()
                break

        }

        this.signInForm = formBuilder.group({
            'emailAddress': [this.currentCredentials.email, Validators.required],
            'password': [this.currentCredentials.password, Validators.required],
        })

    }


    ngOnInit(): void {
    }


    signIn(): void {

        this.signInForm.markAllAsTouched()

        if (this.signInForm.valid) {

            this.sessionService.signIn({...this.signInForm.value}).subscribe(async (status) => {

                if (status) await this.router
                    .navigate([`${this.sessionService.getUrlPart()}`])

            })

        }

    }


}
