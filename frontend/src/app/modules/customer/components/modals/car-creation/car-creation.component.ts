import { Component, Inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NotificationService } from '../../../../shared/core/services/notification/notification.service'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'


@Component({
    selector: 'app-car-creation',
    templateUrl: './car-creation.component.html',
    styleUrls: ['./car-creation.component.scss'],
})
export class CarCreationComponent {

    userForm: FormGroup


    constructor(
        private formBuilder: FormBuilder,
        private notificationService: NotificationService,
        private dialogRef: MatDialogRef<CarCreationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {

        this.userForm = formBuilder.group({
            'customer': [data.userId, Validators.required],
            'carNumber': ['', Validators.required],
            'brand': ['', Validators.required],
        })

    }


    submit(): void {

        this.userForm.markAllAsTouched()

        if (this.userForm.valid) {

            this.dialogRef.close({ data: this.userForm.value })

        }

    }


    close(): void {

        this.dialogRef.close(null)

    }

}
