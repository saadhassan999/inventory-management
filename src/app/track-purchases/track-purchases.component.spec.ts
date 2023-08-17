import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackPurchasesComponent } from './track-purchases.component';

describe('TrackPurchasesComponent', () => {
  let component: TrackPurchasesComponent;
  let fixture: ComponentFixture<TrackPurchasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackPurchasesComponent]
    });
    fixture = TestBed.createComponent(TrackPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
