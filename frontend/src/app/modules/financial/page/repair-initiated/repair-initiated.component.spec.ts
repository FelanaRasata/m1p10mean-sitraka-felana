import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairInitiatedComponent } from './repair-initiated.component';

describe('RepairInitiatedComponent', () => {
  let component: RepairInitiatedComponent;
  let fixture: ComponentFixture<RepairInitiatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairInitiatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairInitiatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
