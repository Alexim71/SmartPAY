import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DropdownMenuPaiementComponent } from './dropdown-menu-paiement.component';

describe('DropdownMenuPaiementComponent', () => {
  let component: DropdownMenuPaiementComponent;
  let fixture: ComponentFixture<DropdownMenuPaiementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownMenuPaiementComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownMenuPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
