import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RepairsFilteredComponent } from './repairs-filtered.component'


describe('RepairsFilteredComponent', () => {
    let component: RepairsFilteredComponent
    let fixture: ComponentFixture<RepairsFilteredComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RepairsFilteredComponent],
        })
            .compileComponents()

        fixture = TestBed.createComponent(RepairsFilteredComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
