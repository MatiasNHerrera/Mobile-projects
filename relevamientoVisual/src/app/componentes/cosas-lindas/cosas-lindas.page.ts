import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { firestore, storage } from 'firebase/app';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage implements OnInit {

  perfil : string;
  foto : any;
  constructor(private camera : Camera, private navegador : Router) 
  {
    this.loading();
    this.perfil = localStorage.getItem("usuario");
    console.log(this.perfil);
  }

  ngOnInit() {

  }

  tomarFoto()
  {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum : true
    }

    this.camera.getPicture(options).then((imageData) => {

     }, (err) => {
      
     });
  }

  async subirFoto()
  {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation : true,
      saveToPhotoAlbum : true
    }

    await this.camera.getPicture(options).then((imageData) => {

      this.foto = 'data:image/jpeg;base64,' + imageData;

     }, (err) => {

     });

    $("#mensajeCosasLindas").text("SUBIENDO IMAGEN");
    this.loading();
    const subirString = storage().ref(`cosas-lindas/${this.getFecha()}_${this.perfil}`);
    subirString.putString(this.foto, 'data_url');
  }

  loading()
  {
    $("#containerCosasLindas").css("filter","blur(10px)");
    $("#loadingCosasLindas").removeAttr("hidden");
    $("#backdropCosasLindas").removeAttr("hidden");
    setTimeout( () => {
        $("#containerCosasLindas").css("filter","none");
        $("#loadingCosasLindas").attr("hidden",true);
        $("#backdropCosasLindas").attr("hidden",true);
    }, 2500);
  }

  getFecha() : string
  {
    var fecha = new Date();
    let d,m,y,h,min,s;
    d = fecha.getDate();
    m = fecha.getUTCMonth();
    y = fecha.getFullYear();
    h = fecha.getHours().toString();
    min = fecha.getMinutes().toString();
    s = fecha.getSeconds().toString();

    return y + "-" + m + "-" + d + "_" + h + "-" + min + "-" + s;
  }

  redirigir(ruta : string)
  {
    this.navegador.navigate([ruta]);
  }

}
