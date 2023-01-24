import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RepairPaidComponent } from './repair-paid.component'


describe('RepairPaidComponent', () => {
    let component: RepairPaidComponent
    let fixture: ComponentFixture<RepairPaidComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RepairPaidComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(RepairPaidComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
