import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisItemsTableComponent } from './diagnosis-items-table.component';

describe('DiagnosisItemsTableComponent', () => {
  let component: DiagnosisItemsTableComponent;
  let fixture: ComponentFixture<DiagnosisItemsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosisItemsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosisItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
