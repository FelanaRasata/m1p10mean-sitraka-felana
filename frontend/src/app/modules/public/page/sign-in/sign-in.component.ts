import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SessionService } from '../../../shared/core/services/session/session.service'
import { Router } from '@angular/router'


@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {

    signInForm: FormGroup


    constructor(
        private formBuilder: FormBuilder,
        private sessionService: SessionService,
        private router: Router,
    ) {

        this.signInForm = formBuilder.group({
            'emailAddress': ['jean-ba@example.com', Validators.required],
            'password': ['1234_viva_l_galleried', Validators.required],
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
