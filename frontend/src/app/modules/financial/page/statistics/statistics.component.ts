import { Component } from '@angular/core'
import { RepairService } from '../../../shared/core/services/repair/repair.service'
import Chart from 'chart.js/auto';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
    constructor(
        public repairService: RepairService
    ) {
    }

    title = "Benefits (Ar) : ";

    ngOnInit(): void {
        let benefitLabels : string[] = [];
        let turnoverLabels : string[] = [];
        let benefitData : number[] = [];
        let turnoverData : number[] = [];


        for (let benefit of this.repairService.benefits.value) {
            benefitLabels.push(benefit._id.month + "/" + benefit._id.year);
            benefitData.push(benefit.total);
        }

        for (let turnover of this.repairService.turnovers.value) {
            turnoverLabels.push(turnover._id.month + "/" + turnover._id.year);
            turnoverData.push(turnover.total);
        }


        new Chart(
            'benefit',
            {
                type: 'bar',
                data: {
                    labels: benefitLabels,
                    datasets: [{
                        label: 'Benefit by month (Ar)',
                        data: benefitData,
                        backgroundColor: [
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)',
                            'rgb(75, 192, 0)',
                            'rgb(54, 162, 0)',
                            'rgb(153, 102, 0)',
                            'rgb(201, 203, 0)'
                        ],
                        borderWidth: 1
                    }]
                }
            }
        );

        new Chart(
            'turnover',
            {
                type: 'bar',
                data: {
                    labels: turnoverLabels,
                    datasets: [{
                        label: 'Paiement enregisté (Ar)',
                        data: turnoverData,
                        backgroundColor: [
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)',
                            'rgb(75, 192, 0)',
                            'rgb(54, 162, 0)',
                            'rgb(153, 102, 0)',
                            'rgb(201, 203, 0)'
                        ],
                        borderWidth: 1
                    }]
                }
            }
        );
    }
}
