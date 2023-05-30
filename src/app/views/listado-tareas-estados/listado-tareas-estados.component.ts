import { Component } from '@angular/core';
import { ITarea } from 'src/app/shares/interfaces/itarea';

@Component({
  selector: 'app-listado-tareas-estados',
  templateUrl: './listado-tareas-estados.component.html',
  styleUrls: ['./listado-tareas-estados.component.css']
})
export class ListadoTareasEstadosComponent {
  nuevaTarea : boolean =false;
  nombre : String='';
  hora :String='';
  dia: String='';
  detalle:String='';
  public modLis:boolean=true;
  public listadoTarea: ITarea[] = [];
  public listadoTareasHechas:ITarea[]=[];
  public listadoTareasPendientes:ITarea[]=[];
  constructor(){
    //Importar lista del LocalStorage
    this.accederLocalStorage();
  }
  public addTarea():void{
    //Añado a lista de tareas (pendientes y hechas)
    this.listadoTarea.push({
      enunciado:this.nombre,
      fecha:this.dia,
      hora:this.hora,
      detalle:this.detalle,
      estado:false
    });
    //Lista de tareas pendientes
    this.listadoTareasPendientes.push({
      enunciado:this.nombre,
      fecha:this.dia,
      hora:this.hora,
      detalle:this.detalle,
      estado:false
    });
    //Guardo en localStorage
    this.guardarLocalStorage(this.listadoTarea);
    //Borro Campos nueva Tarea
    this.borrarCampos();
  }
  public modTarea(tarea:ITarea):void{
    //Pregunto si quiere modificar el estado de la tarea
    if(window.confirm('¿Quieres cambiar el estado de la tarea a hecho?')){
      tarea.estado=!tarea.estado;
    }
    //Modifico la posicion del array listadoTarea
    this.listadoTarea.splice(this.listadoTarea.indexOf(tarea),1,tarea);
    //Guardo en localStorage
    this.guardarLocalStorage(this.listadoTarea)
    //Modifico los array de tareas
    this.modArrayTareas(tarea);
  }
  public guardarLocalStorage(listadoTarea:ITarea[]):void{
    console.log(localStorage.getItem('listaTarea'))
    if(localStorage.getItem('listaTarea')===null){
      localStorage.setItem('listaTarea',JSON.stringify(listadoTarea));
    }else{
      localStorage.removeItem('listaTarea');
      localStorage.setItem('listaTarea',JSON.stringify(listadoTarea));
    }
    
  }

  public borrarCampos():void{
    this.nombre='';
    this.hora ='';
    this.dia='';
    this.detalle='';
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
    this.rellenarListados(this.listadoTarea);
  }
  public rellenarListados(listadoTarea:ITarea[]):void{
    for(let i=0;i<listadoTarea.length;i++){
      if(listadoTarea[i].estado==true){
        this.listadoTareasHechas.push(listadoTarea[i]);
      }else{
        this.listadoTareasPendientes.push(listadoTarea[i]);
      }
    }
  }
  public modArrayTareas(tarea:ITarea):void{
    if(tarea.estado==true){
      this.listadoTareasPendientes.splice(this.listadoTareasPendientes.indexOf(tarea),1);
      this.listadoTareasHechas.push(tarea);
    }else{
      this.listadoTareasHechas.splice(this.listadoTareasHechas.indexOf(tarea),1);
      this.listadoTareasPendientes.push(tarea);
    }

  }
}
