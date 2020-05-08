import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.page.html',
  styleUrls: ['./animales.page.scss'],
})
export class AnimalesPage implements OnInit {

  idioma : string;

  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    
    this.loading();
    setTimeout( () => {
      this.idioma = this.route.snapshot.paramMap.get("idioma");
      $(`#${this.idioma}Animales`).addClass("seleccionado");
    },2500);
  }

  cambiarIdioma(idioma : string)
  {
    $(`#${this.idioma}Animales`).removeClass("seleccionado");
    this.idioma = idioma;
    $(`#${this.idioma}Animales`).addClass("seleccionado");
  }

  reproducirAudio(animal : string)
  {
    let audio = new Audio("../../../assets/audios/" + animal + this.idioma + ".mp3");
    audio.play()
  }

  loading()
  {
    $("#loadingAnimales").removeAttr("hidden");
    $("#backdrop").removeAttr("hidden");
    setTimeout( () => {
        $("#loadingAnimales").attr("hidden",true);
        $("#backdrop").attr("hidden",true);
    }, 2500);
  }


}
