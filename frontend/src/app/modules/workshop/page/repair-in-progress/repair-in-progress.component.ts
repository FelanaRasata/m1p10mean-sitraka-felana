import { Component } from '@angular/core'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { NotificationService } from '../../../shared/core/services/notification/notification.service'
import { RepairService } from '../../../shared/core/services/repair/repair.service'
import { IRepairTypeItem } from '../../../shared/core/models/schemas/repairs.schema'


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


    finishRepair() {

        this.notificationService.alert('Finish repair?', '', 'warning')

    }

}
