import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsLoginPage } from './settings-login.page';

describe('SettingsLoginPage', () => {
  let component: SettingsLoginPage;
  let fixture: ComponentFixture<SettingsLoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
