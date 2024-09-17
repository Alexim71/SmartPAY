import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilMenuPage } from './profil-menu.page';

describe('ProfilMenuPage', () => {
  let component: ProfilMenuPage;
  let fixture: ComponentFixture<ProfilMenuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
