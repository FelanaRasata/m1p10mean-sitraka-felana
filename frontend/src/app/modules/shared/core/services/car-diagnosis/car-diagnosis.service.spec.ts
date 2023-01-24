import { TestBed } from '@angular/core/testing'

import { CarDiagnosisService } from './car-diagnosis.service'


describe('CarDiagnosisService', () => {
    let service: CarDiagnosisService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(CarDiagnosisService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
