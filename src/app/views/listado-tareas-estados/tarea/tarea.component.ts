import { Component, Input } from '@angular/core';
import { ITarea } from 'src/app/shares/interfaces/itarea';
@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent {
  @Input() tareaAtr: ITarea;
  constructor() {
    this.tareaAtr = {
      enunciado: '',
      fecha: '',
      hora: '',
      detalle: '',
      estado: false
    }
  }

}
