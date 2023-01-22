import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairChoiceComponent } from './repair-choice.component';

describe('RepairChoiceComponent', () => {
  let component: RepairChoiceComponent;
  let fixture: ComponentFixture<RepairChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairChoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
