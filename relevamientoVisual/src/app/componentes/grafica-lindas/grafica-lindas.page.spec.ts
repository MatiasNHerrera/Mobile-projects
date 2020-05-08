import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GraficaLindasPage } from './grafica-lindas.page';

describe('GraficaLindasPage', () => {
  let component: GraficaLindasPage;
  let fixture: ComponentFixture<GraficaLindasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaLindasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GraficaLindasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
