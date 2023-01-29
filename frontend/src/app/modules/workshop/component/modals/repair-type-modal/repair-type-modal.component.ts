import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NotificationService } from '../../../../shared/core/services/notification/notification.service'
import { isEmpty } from '../../../../shared/core/services/utils/utils'
import { IRepairType } from '../../../../shared/core/models/schemas/repair_types.schema'
import { RepairTypeService } from '../../../../shared/core/services/repair-type/repair-type.service'


@Component({
    selector: 'app-repair-type-modal',
    templateUrl: './repair-type-modal.component.html',
    styleUrls: ['./repair-type-modal.component.scss']
})
export class RepairTypeModalComponent {

    repairType =  {} as IRepairType

    isCarPart = false


    constructor(
        private repairTypeService: RepairTypeService,
        private dialogRef: MatDialogRef<RepairTypeModalComponent>,
        private notificationService: NotificationService,
    ) {


    }


    ngOnInit(): void {
    }


    close(): void {

        this.dialogRef.close(null)

    }


    submit(): void {

        this.repairTypeService.createRepairType(this.repairType).subscribe({
            next : () => {
                this.notificationService.alert('Repair Type Add')
                this.dialogRef.close(null)
            }
        })


    }
}
