import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFirestore } from 'angularfire2/firestore';
import { storage } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.page.html',
  styleUrls: ['./partido.page.scss'],
})
export class PartidoPage implements OnInit {

  listadoImagenes;
  url;
  hora;
  jugadores;
  base64Image : string;
  datos;
  finalizo : boolean;
  golesJ1 = 0;
  golesJ2 = 0;

  constructor(private camara : Camera, private db : AngularFirestore, private navegador : Router) { }

  ngOnInit() {

    this.db.collection("jugadores").valueChanges().subscribe((datos) => {
      this.jugadores = datos});

    this.datos = JSON.parse(localStorage.getItem("partidoCreado"));

    this.loading();

    setTimeout( () => {
        console.log("espera terminada");
    },2500)
  }

  sumarGoles(jugador : string, operacion : string)
  {
      if(jugador == "jugadorUno" && operacion == "sumar")
      {
        this.golesJ1++
      }
      else if(jugador == "jugadorUno" && operacion == "restar" && this.golesJ1 > 0)
      {
        this.golesJ1--
      }
      else if(jugador == "jugadorDos" && operacion == "sumar")
      {
        this.golesJ2++;
      }
      else if(jugador == "jugadorDos" && operacion == "restar" && this.golesJ2 > 0)
      {
        this.golesJ2--;
      }
  }

  finalizar()
  {
    $("#jug1").attr("hidden", true);
    $("#jug2").attr("hidden", true);
    this.finalizo = true;
  }

  loading()
  {
    $("#loadingPartido").removeAttr("hidden");
    $("#backdropPartido").removeAttr("hidden");
    setTimeout( () => {
        $("#loadingPartido").attr("hidden",true);
        $("#backdropPartido").attr("hidden",true);
    }, 2500);
  }

  async tomarFotografia()
  {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE,
      correctOrientation : true
    }

    await this.camara.getPicture(options).then((imageData) => {

    this.base64Image = 'data:image/jpeg;base64,' + imageData;

     }, (err) => {

     });

     this.url = this.getFecha();
     const subirString = storage().ref(`partidos/${this.url}`);
     subirString.putString(this.base64Image, 'data_url');
  }

  cargarResultados()
  {
    if(this.url != null)
    {
      this.db.collection("partidos").add(
        {
          fecha : this.datos.fecha,
          foto : this.url,
          jugadorDos: this.datos.jugadorDos,
          jugadorUno : this.datos.jugadorUno,
          resultado : this.golesJ1 + "-" + this.golesJ2
        })
      
        this.agregarVictoria();
        this.navegador.navigate(["home/admin"]);
    }
    else
    {
      this.fadeIn();
    }
  }

  quienGano() : string
  {
    let gano : string;

    if(this.golesJ1 > this.golesJ2)
    {
      gano = "jugadorUno";
    }
    else if(this.golesJ1 < this.golesJ2)
    {
      gano = "jugadorDos"
    }
    else
    {
      gano = "empate";
    }

    return gano;
  }

  agregarVictoria()
  {
     for(let jugador of this.jugadores)
     {
       if(this.quienGano() == "jugadorUno" && jugador.nombre == this.datos.jugadorUno)
       {
          jugador.ganados++;
          this.db.collection("jugadores").doc(jugador.nombre).update({
              nombre: this.datos.jugadorUno,
              ganados: jugador.ganados
          }).catch(error => {
            console.log(error);
          });
          break;

       }
       else if(this.quienGano() == "jugadorDos" && jugador.nombre == this.datos.jugadorDos)
       {
          jugador.ganados++;
          this.db.collection("jugadores").doc(jugador.nombre).update({
              nombre: this.datos.jugadorDos,
              ganados: jugador.ganados
          });
          break;
       }
     }
  }

  getFecha() : string
  {
    var fecha = new Date();
    let d,m,y;
    d = fecha.getDate();
    m = fecha.getUTCMonth();
    y = fecha.getFullYear();

    return y + "-" + m + "-" + d + "_" + fecha.toLocaleTimeString();
  }

  fadeIn()
  {
    $("#mensajeTextoPartido").text("Debes cargar una foto primero");
    $("#mensajePartido").fadeIn();
    setTimeout(() => {
      $("#mensajePartido").fadeOut();
    },2000);
  }

}
