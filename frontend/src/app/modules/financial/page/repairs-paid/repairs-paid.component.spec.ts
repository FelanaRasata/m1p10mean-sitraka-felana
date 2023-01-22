import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairsPaidComponent } from './repairs-paid.component';

describe('RepairsPaidComponent', () => {
  let component: RepairsPaidComponent;
  let fixture: ComponentFixture<RepairsPaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairsPaidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairsPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
