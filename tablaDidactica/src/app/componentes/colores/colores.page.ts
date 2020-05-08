import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-colores',
  templateUrl: './colores.page.html',
  styleUrls: ['./colores.page.scss'],
})
export class ColoresPage implements OnInit {

  idioma : string;
  constructor(private route : ActivatedRoute, private navegador : Router) { }

  ngOnInit() {

    this.loading();

    setTimeout( () => {
      this.idioma = this.route.snapshot.paramMap.get("idioma");
      $(`#${this.idioma}Colores`).addClass("seleccionado");
    }, 2500);
  }

  cambiarIdioma(idioma : string)
  {
    $(`#${this.idioma}Colores`).removeClass("seleccionado");
    this.idioma = idioma;
    $(`#${this.idioma}Colores`).addClass("seleccionado");
  }

  reproducirAudio(color : string)
  {
    let audio = new Audio("../../../assets/audios/" + color + this.idioma + ".mp3");
    audio.play()
  }

  loading()
  {
    $("#loadingColores").removeAttr("hidden");
    $("#backdrop").removeAttr("hidden");
    setTimeout( () => {
        $("#loadingColores").attr("hidden",true);
        $("#backdrop").attr("hidden",true);
    }, 2500);
  }

  redirigir(tema : string)
  {
    this.navegador.navigate([`${tema}/${this.idioma}`]);
  }

}
