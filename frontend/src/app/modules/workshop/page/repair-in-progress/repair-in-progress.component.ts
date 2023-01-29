import { Component } from '@angular/core'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { NotificationService } from '../../../shared/core/services/notification/notification.service'


@Component({
    selector: 'app-repair-in-progress',
    templateUrl: './repair-in-progress.component.html',
    styleUrls: ['./repair-in-progress.component.scss'],
})
export class RepairInProgressComponent {

    checkedItems = ['Item 1', 'Item 2', 'Item 3']

    uncheckedItems = ['Item 4', 'Item 5', 'Item 6']


    constructor(
        private notificationService: NotificationService
    ) {
    }


    drop(event: CdkDragDrop<string[]>) {

        moveItemInArray(this.checkedItems, event.previousIndex, event.currentIndex)

    }

    finishRepair() {

        this.notificationService.alert('Finish repair?', '', 'warning')

    }

}
