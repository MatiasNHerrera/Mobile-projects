import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { storage } from 'firebase/app';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as $ from 'jquery';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
})
export class CosasFeasPage implements OnInit {

  perfil : string;
  foto : any;
  constructor(private navegador : Router, private camera : Camera) 
  {}

  ngOnInit() {
    this.loading();
    this.perfil = localStorage.getItem("usuario");
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

    $("#mensajeCosasFeas").text("SUBIENDO IMAGEN");
    this.loading();
    const subirString = storage().ref(`cosas-feas/${this.getFecha()}_${this.perfil}`);
    subirString.putString(this.foto, 'data_url');
  }

  loading()
  {
    $("#containerCosasFeas").css("filter","blur(10px)");
    $("#loadingCosasFeas").removeAttr("hidden");
    $("#backdropCosasFeas").removeAttr("hidden");
    setTimeout( () => {
        $("#containerCosasFeas").css("filter","none");
        $("#loadingCosasFeas").attr("hidden",true);
        $("#backdropCosasFeas").attr("hidden",true);
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
