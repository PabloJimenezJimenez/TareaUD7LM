import { Component } from '@angular/core';
import { ITarea } from 'src/app/shares/interfaces/itarea';
@Component({
  selector: 'app-listado-tareas',
  templateUrl: './listado-tareas.component.html',
  styleUrls: ['./listado-tareas.component.css']
})
export class ListadoTareasComponent {
  nuevaTarea: boolean = false;
  nombre: String = '';
  hora: String = '';
  dia: String = '';
  detalle: String = '';
  public listadoTarea: ITarea[] = [];
  constructor() {
    //Importar lista del LocalStorage
    this.accederLocalStorage();
  }
  public addTarea(): void {
    this.listadoTarea.push({
      enunciado: this.nombre,
      fecha: this.dia,
      hora: this.hora,
      detalle: this.detalle,
      estado: false
    });
    function compare(a: ITarea, b: ITarea) {
      if (a.fecha < b.fecha) {
        return -1;
      }
      if (a.fecha > b.fecha) {
        return 1;
      }
      return 0;
    }
    //Lo ordeno
    this.listadoTarea.sort(compare);
    //Guardo en localStorage
    this.guardarLocalStorage(this.listadoTarea);
    //Borro Campos nueva Tarea
    this.borrarCampos();
  }
  public modTarea(tarea: ITarea): void {
    //Pregunto si quiere modificar el estado de la tarea
    if (window.confirm('¿Quieres cambiar el estado de la tarea a hecho?')) {
      tarea.estado = !tarea.estado;
    }
    //Modifico la posicion del array
    this.listadoTarea.splice(this.listadoTarea.indexOf(tarea), 1, tarea);
    this.guardarLocalStorage(this.listadoTarea)
  }
  public guardarLocalStorage(listadoTarea: ITarea[]): void {
    if (localStorage.getItem('listaTarea') == null) {
      localStorage.setItem('listaTarea', JSON.stringify(listadoTarea));
    } else {
      localStorage.removeItem('listaTarea');
      localStorage.setItem('listaTarea', JSON.stringify(listadoTarea));
    }

  }

  public borrarCampos(): void {
    this.nombre = '';
    this.hora = '';
    this.dia = '';
    this.detalle = '';
  }

  public accederLocalStorage(): void {
    var objetosRecuperadosString = localStorage.getItem("listaTarea");
    if (objetosRecuperadosString !== null) {
      var objetosRecuperados = JSON.parse(objetosRecuperadosString);
      for (var i = 0; i < objetosRecuperados.length; i++) {
        console.log(objetosRecuperados[i]);
      }
      this.listadoTarea=objetosRecuperados;
    } else {
      console.log("No se encontraron objetos en el localStorage");
    }

  }
}
