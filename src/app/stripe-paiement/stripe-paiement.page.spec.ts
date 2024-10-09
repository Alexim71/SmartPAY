import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StripePaiementPage } from './stripe-paiement.page';

describe('StripePaiementPage', () => {
  let component: StripePaiementPage;
  let fixture: ComponentFixture<StripePaiementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StripePaiementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
