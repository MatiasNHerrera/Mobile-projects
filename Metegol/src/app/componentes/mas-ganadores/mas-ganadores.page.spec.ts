import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MasGanadoresPage } from './mas-ganadores.page';

describe('MasGanadoresPage', () => {
  let component: MasGanadoresPage;
  let fixture: ComponentFixture<MasGanadoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasGanadoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MasGanadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
