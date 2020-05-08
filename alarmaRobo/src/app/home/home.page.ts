import { Component } from '@angular/core';
import * as $ from 'jquery';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { DeviceMotion, DeviceMotionAccelerometerOptions, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private screenOrientation : ScreenOrientation, 
  private flash : Flashlight, private vibracion : Vibration, private device : DeviceMotion, private navegador : Router) {}

  activada : boolean;
  clave : string;
  subsAcc;
  reproducir : boolean = false;
  subsFlash;

  ngOnInit()
  {}

  activar()
  {
    $("#img").addClass("animacion");
    setTimeout( () => {

      $("#img").removeClass("animacion");
      $("#mensajeHome").text("¡NO TOCAR!");
      this.getDev();
      this.getFlash();
      this.activada = true;

    }, 1000);

  }

  desactivar()
  {
    let usuario = JSON.parse(localStorage.getItem("usuario"));

    if(this.clave == usuario.clave)
    {
      document.getElementById("containerHome").style.opacity = "1";
      document.getElementById("container").style.opacity = "1";
      $("#validarClave").attr("hidden",true);
      $("#mensajeHome").text("DESACTIVADA");
      this.subsAcc.unsubscribe();
      this.subsFlash.unsubscribe();
      this.activada = false;
    }
    else
    {
      console.log("no coinciden");
    }
  }

  getDev(){

    let options: DeviceMotionAccelerometerOptions = {
      frequency: 500
    };
    
    this.subsAcc = this.device.watchAcceleration(options).subscribe((acc: DeviceMotionAccelerationData) => {

      if(acc.x > 4 && acc.x < 8 && !this.reproducir)
      {
        this.reproducirAudio("../../assets/audio/estanrobando.mp3");
      }
      else if(acc.x < -4 && acc.x > -8 && !this.reproducir)
      {
        this.reproducirAudio("../../assets/audio/queestasporhacer.mp3");
      }
      console.log(acc.x);
    });
    
  }

  getFlash()
  {
       this.subsFlash = this.screenOrientation.onChange().subscribe(() => {
       console.log(this.screenOrientation.type)
       if((this.screenOrientation.type == "landscape-primary" || this.screenOrientation.type == "landscape-secondary") 
       && !this.reproducir){

          this.vibracion.vibrate(5000);
          this.reproducirAudio("../../assets/audio/modolandscape.mp3");

       }
       else if (!this.reproducir)
       {
          this.flash.switchOn();
          this.reproducirAudio("../../assets/audio/modoportrait.mp3");
          setTimeout(()=>{
            this.flash.switchOff();
          },5000);
       }
     })
  }

  reproducirAudio(ruta : string)
  {
    let audio = new Audio(ruta);
    audio.play();
    this.reproducir = true;
    setTimeout(() => {
      this.reproducir = false;
    },1500);
  }

  validarClave()
  {
    if(this.activada)
    {
      document.getElementById("containerHome").style.opacity = "0.2";
      document.getElementById("container").style.opacity = "0";
      $("#validarClave").removeAttr("hidden");
    }
  }

  volver()
  {
    this.activada = false;
    this.subsAcc.unsubscribe();
    this.subsFlash.unsubscribe();
    this.navegador.navigate(["login"]);
  }

}
