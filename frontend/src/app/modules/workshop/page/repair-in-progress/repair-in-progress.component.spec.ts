import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairInProgressComponent } from './repair-in-progress.component';

describe('RepairInProgressComponent', () => {
  let component: RepairInProgressComponent;
  let fixture: ComponentFixture<RepairInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairInProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
