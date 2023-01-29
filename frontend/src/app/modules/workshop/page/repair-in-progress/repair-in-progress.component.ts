import { Component } from '@angular/core'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { NotificationService } from '../../../shared/core/services/notification/notification.service'
import { RepairService } from '../../../shared/core/services/repair/repair.service'
import { IRepairTypeItem } from '../../../shared/core/models/schemas/repairs.schema'
import { LoaderService } from '../../../shared/core/services/loader/loader.service'
import { Router } from '@angular/router'


@Component({
    selector: 'app-repair-in-progress',
    templateUrl: './repair-in-progress.component.html',
    styleUrls: ['./repair-in-progress.component.scss'],
})
export class RepairInProgressComponent {

    todo: any = []

    done: any = []


    constructor(
        private repairService: RepairService,
        private notificationService: NotificationService,
        private loaderService: LoaderService,
        private router: Router,
    ) {

        this.todo = repairService.repair.value.selectedRepairs.filter(item => !item.checked)

        this.done = repairService.repair.value.selectedRepairs.filter(item => item.checked)

    }


    drop(event: CdkDragDrop<IRepairTypeItem[]>) {

        if (event.previousContainer === event.container) {

            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)

        } else {

            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            )

        }

    }


    /** Predicate function that doesn't allow items to be dropped into a list. */
    noReturnPredicate() {
        return false
    }


    async validateChanges() {

        this.loaderService.hydrate(true)

        const validate: boolean = await this.notificationService.confirmBox(
            `Validate Changes?`,
            'Check repairs',
            'Cancel',
            'Sure',
            'Cancel',
        )

        if (validate) {

            this.done = this.done.map((item: IRepairTypeItem) => {
                item.checked = true
                return item
            })

            const repairDto: any = { ...this.repairService.repair.value }
            repairDto.selectedRepairs = [ ...this.todo, ...this.done ]

            if (this.todo.length == 0) {

                repairDto.carRepairedAt = new Date().getTime()

                this.repairService.finishRepair(repairDto._id, repairDto).subscribe((status) => {

                    this.loaderService.hydrate(false)

                    if (status) {

                        this.notificationService.alert('Repair finished!', '', 'success')
                        this.router.navigate(['/workshop/repairs']).then()

                    }

                })

            } else {

                this.repairService.proceedRepair(repairDto._id, repairDto).subscribe((status) => {

                    this.loaderService.hydrate(false)

                    if (status) {

                        this.notificationService.alert('Changes applied!', '', 'success')

                    }

                })

            }

        }

    }

}
