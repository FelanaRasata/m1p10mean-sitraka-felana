import { Component } from '@angular/core'


@Component({
    selector: 'app-repair-list',
    templateUrl: './repair-list.component.html',
    styleUrls: ['./repair-list.component.scss'],
})
export class RepairListComponent {
    title = ''
    cardUrlPath = '/customer/repairs/:repair_id'
}
