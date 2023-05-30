import { Component } from '@angular/core';

@Component({
  selector: 'app-mi-menu',
  templateUrl: './mi-menu.component.html',
  styleUrls: ['./mi-menu.component.css']
})
export class MiMenuComponent {
  mostrarMenu: boolean = false;
  ancho: number = window.screen.width;
  constructor() {
    this.anchoPantalla();
  }
  public anchoPantalla(): void {
    if (this.ancho >= 1024) {
      this.mostrarMenu = true
    }
  }
}
