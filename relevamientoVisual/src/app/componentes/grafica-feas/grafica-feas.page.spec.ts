import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GraficaFeasPage } from './grafica-feas.page';

describe('GraficaFeasPage', () => {
  let component: GraficaFeasPage;
  let fixture: ComponentFixture<GraficaFeasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaFeasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GraficaFeasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
