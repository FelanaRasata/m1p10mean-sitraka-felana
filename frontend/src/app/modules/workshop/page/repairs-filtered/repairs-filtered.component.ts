import { Component } from '@angular/core'


@Component({
    selector: 'app-repairs-filtered',
    templateUrl: './repairs-filtered.component.html',
    styleUrls: ['./repairs-filtered.component.scss'],
})
export class RepairsFilteredComponent {
    title = 'List of repair'

    repairUrlPath = '/workshop/repairs/:id'

}
