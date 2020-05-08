import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-numeros',
  templateUrl: './numeros.page.html',
  styleUrls: ['./numeros.page.scss'],
})
export class NumerosPage implements OnInit {

  constructor(private route : ActivatedRoute) { }

  idioma : string;

  ngOnInit() {

    this.loading();

    setTimeout(() => {
      this.idioma = this.route.snapshot.paramMap.get("idioma");
      $(`#${this.idioma}Numeros`).addClass("seleccionado");
    },2500)
  }

  cambiarIdioma(idioma : string)
  {
    $(`#${this.idioma}Numeros`).removeClass("seleccionado");
    this.idioma = idioma;
    $(`#${this.idioma}Numeros`).addClass("seleccionado");
  }

  reproducirAudio(numero : string)
  {
    let audio = new Audio("../../../assets/audios/" + numero + this.idioma + ".mp3");
    audio.play()
  }

  loading()
  {
    $("#loadingNumeros").removeAttr("hidden");
    $("#backdrop").removeAttr("hidden");
    setTimeout( () => {
        $("#loadingNumeros").attr("hidden",true);
        $("#backdrop").attr("hidden",true);
    }, 2500);
  }

}
