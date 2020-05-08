import { Component } from '@angular/core';
import * as $ from 'jquery';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  acumuladorCreditos: number = 0;
  perfil : string;
  scanSub : any;
  valorObtenido;
  contadores = {contadorDiez : 0, contadorCiencuenta : 0, contadorCien : 0};

  constructor(private scanner : QRScanner, private platform : Platform, private ruta : ActivatedRoute, private vibracion : Vibration) 
  {
    this.platform.backButton.subscribeWithPriority(0, () => { //cuando apreto el boton volver de la pantalla de android, dejo de intentar scanear el codigo
      document.getElementsByTagName("body")[0].style.opacity = "1";
      this.scanSub.unsubscribe();
    })
  }

  ngOnInit()
  {
    this.perfil = this.ruta.snapshot.params.perfil;
  }

  limpiarCreditos()
  {
     $("#creditoCargado").text("Disponible: " + 0);
     this.acumuladorCreditos = 0;
     this.contadores.contadorCien = 0;
     this.contadores.contadorCiencuenta = 0;
     this.contadores.contadorDiez = 0;
  }

  Ocultar()
  {
    $("#mensajeHome").attr('hidden',true);
  }

  scannearQR()
  {
    this.scanner.prepare().then( (status : QRScannerStatus) => { //pido permisos para ingresar a la camara
      if(status.authorized)
      {
          this.scanner.show();
          document.getElementsByTagName("body")[0].style.opacity = "0"; // pongo el fondo con opacidad para que aparezca la camara

          this.scanSub = this.scanner.scan().subscribe( (respuesta) => { //espero que scanea el codigo y si es correcto que entre

          document.getElementsByTagName("body")[0].style.opacity = "1";
          this.guardarValor(respuesta);
          this.cargarCreditos();
          this.scanner.hide(); // hide camera preview
          this.scanSub.unsubscribe(); //paro de scannear

        }, (error) => {

            this.mostrarError(error); // si incorrecto muestra error
        });
      }
      else if(status.denied)
      {
        this.mostrarError("DENEGADO");
      }
    }, (error) =>{
      this.mostrarError("No autorizado");
    });
  }

  mostrarError(mensaje : string)
  {
    $("#mensajeTextoHome").text(mensaje);
    $("#mensajeHome").removeAttr('hidden');
    this.vibrar();
  }
  
  guardarValor(codigo : string)
  {
    switch(codigo)
    {
      case '8c95def646b6127282ed50454b73240300dccabc':
        this.valorObtenido = 10;
        break;
      case 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ':
        this.valorObtenido = 50;
        break;
      case '2786f4877b9091dcad7f35751bfcf5d5ea712b2f':
        this.valorObtenido = 100;
        break;
      default:
        this.valorObtenido = null;
        break;
    }
  }


  cargarCreditos()
  {

    switch(this.perfil)
    {
      case "otros":
        this.cargarOtros();
        break;
      case "admin":
        this.cargarAdmin();
        break;
    }
    
  }

  cargarOtros()
  {
     if(this.valorObtenido == 10 && this.contadores.contadorDiez == 0)
     {
        this.acumuladorCreditos += this.valorObtenido;
        $("#creditoCargado").text("Disponible: " + this.acumuladorCreditos);
        this.contadores.contadorDiez++;
     }
     else if(this.valorObtenido == 50 && this.contadores.contadorCiencuenta == 0)
     {
        this.acumuladorCreditos += this.valorObtenido;
        $("#creditoCargado").text("Disponible: " + this.acumuladorCreditos);
        this.contadores.contadorCiencuenta++;
     }
     else if(this.valorObtenido == 100 && this.contadores.contadorCien == 0)
     {
        this.acumuladorCreditos += this.valorObtenido;
        $("#creditoCargado").text("Disponible: " + this.acumuladorCreditos);
        this.contadores.contadorCien++;
     }
     else if(this.valorObtenido == null)
     {
        this.mostrarError("El codigo QR es incorrecto");
     }
     else
     {
        this.mostrarError("Pasaste el limite de carga para este codigo");
     }
  }


  cargarAdmin()
  {
     if(this.valorObtenido == 10 && this.contadores.contadorDiez <= 1)
     {
        this.acumuladorCreditos += this.valorObtenido;
        $("#creditoCargado").text("Disponible: " + this.acumuladorCreditos);
        this.contadores.contadorDiez++;
     }
     else if(this.valorObtenido == 50 && this.contadores.contadorCiencuenta <= 1)
     {
        this.acumuladorCreditos += this.valorObtenido;
        $("#creditoCargado").text("Disponible: " + this.acumuladorCreditos);
        this.contadores.contadorCiencuenta++;
     }
     else if(this.valorObtenido == 100 && this.contadores.contadorCien <= 1)
     {
        this.acumuladorCreditos += this.valorObtenido;
        $("#creditoCargado").text("Disponible: " + this.acumuladorCreditos);
        this.contadores.contadorCien++;
     }
     else if(this.valorObtenido == null)
     {
       this.mostrarError("El codigo QR es incorrecto");
     }
     else
     {
        this.mostrarError("Pasaste el limite de carga para este codigo");
     }
  }

  vibrar()
  {
    this.vibracion.vibrate(500);
  }

}
