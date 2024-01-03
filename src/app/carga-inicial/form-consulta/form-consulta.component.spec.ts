import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConsultaComponent } from './form-consulta.component';

describe('FormConsultaComponent', () => {
  let component: FormConsultaComponent;
  let fixture: ComponentFixture<FormConsultaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormConsultaComponent]
    });
    fixture = TestBed.createComponent(FormConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
