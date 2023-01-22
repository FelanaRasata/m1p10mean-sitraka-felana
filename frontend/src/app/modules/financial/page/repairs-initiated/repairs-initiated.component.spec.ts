import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairsInitiatedComponent } from './repairs-initiated.component';

describe('RepairsInitiatedComponent', () => {
  let component: RepairsInitiatedComponent;
  let fixture: ComponentFixture<RepairsInitiatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairsInitiatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairsInitiatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
