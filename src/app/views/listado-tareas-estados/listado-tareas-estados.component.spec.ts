import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTareasEstadosComponent } from './listado-tareas-estados.component';

describe('ListadoTareasEstadosComponent', () => {
  let component: ListadoTareasEstadosComponent;
  let fixture: ComponentFixture<ListadoTareasEstadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoTareasEstadosComponent]
    });
    fixture = TestBed.createComponent(ListadoTareasEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
