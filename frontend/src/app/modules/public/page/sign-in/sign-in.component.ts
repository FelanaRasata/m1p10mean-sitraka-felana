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


    constructor(
        private formBuilder: FormBuilder,
        private sessionService: SessionService,
        private router: Router,
        private route: ActivatedRoute,
    ) {

        this.signInForm = formBuilder.group({
            'emailAddress': ['jean-ba@example.com', Validators.required],
            'password': ['1234_viva_l_galleried', Validators.required],
        })

    }


    ngOnInit(): void {

        const path = this.route.snapshot.url[0].path

        switch (path) {

            case 'workshop':
            case 'finance':
                this.signUp = false
                break

            case 'sign_in':
                this.signUp = true
                break

            default:
                this.router.navigate(['']).then()
                break

        }

    }


    signIn(): void {

        this.signInForm.markAllAsTouched()

        if (this.signInForm.valid) {

            this.sessionService.signIn({...this.signInForm.value}).subscribe(async (status) => {

                console.log(`${this.sessionService.getUrlPart()}`)

                if (status) await this.router
                    .navigate([`${this.sessionService.getUrlPart()}`])

            })

        }

    }


}
