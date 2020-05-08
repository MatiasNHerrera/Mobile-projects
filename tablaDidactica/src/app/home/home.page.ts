import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  idioma : string = "español";
  tema : string = "colores";

  constructor(private navegador : Router) {}

  ngOnInit()
  {
    $("#" + this.idioma).addClass("seleccionadoHome");
    $("#" + this.tema).addClass("seleccionadoHome");
  }

  cambiarIdioma(idiomaSeleccionado : string)
  {
    $("#" + this.idioma).removeClass("seleccionadoHome");
    this.idioma = idiomaSeleccionado;
    $("#" + idiomaSeleccionado).addClass("seleccionadoHome");
  }

  cambiarTema(temaSeleccionado : string)
  {
    $("#" + this.tema).removeClass("seleccionadoHome");
    this.tema = temaSeleccionado;
    $("#" + temaSeleccionado).addClass("seleccionadoHome");
  }

  redirigir()
  {
     switch(this.tema)
     {
        case "colores":
          this.navegador.navigate(["colores",this.idioma]);
          break;
        case "animales":
          this.navegador.navigate(["animales",this.idioma]);
          break;
        case "numeros":
          this.navegador.navigate(["numeros",this.idioma]);
          break;
     }
  }

}
