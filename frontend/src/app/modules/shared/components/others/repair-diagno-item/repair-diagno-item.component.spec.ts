import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairDiagnoItemComponent } from './repair-diagno-item.component';

describe('RepairDiagnoItemComponent', () => {
  let component: RepairDiagnoItemComponent;
  let fixture: ComponentFixture<RepairDiagnoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairDiagnoItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairDiagnoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
