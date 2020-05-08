import { Component, OnInit } from '@angular/core';
import { storage } from 'firebase';
import * as $ from 'jquery';
import { AngularFirestore } from 'angularfire2/firestore';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-galeria-linda',
  templateUrl: './galeria-linda.page.html',
  styleUrls: ['./galeria-linda.page.scss'],
})
export class GaleriaLindaPage implements OnInit {

  dato : any;
  subs : any;
  mostrarError : boolean;
  mostrarSoloUsuarios : boolean = false;
  perfil : string;
  arrayPath : string[]= [];
  listadoImagenes : any;
  url = [];
  urlOrdenado = [];
  favoritas = [];

  constructor(private db : AngularFirestore, private vibracion : Vibration) {
    this.perfil = localStorage.getItem("usuario");
   }

  ngOnInit() {
    this.loading();
    this.traerFotos('todas');
  }

  traerFotos(queTraer)
  {
    this.url = [];
    const imagenes = storage().ref("cosas-lindas");
    imagenes.listAll().then((imagenes) => {
    this.listadoImagenes = imagenes.items;
    
    for(let path of this.listadoImagenes)
    {

      if(queTraer == "todas")
      {
        this.mostrarSoloUsuarios = false;
      }
      else
      {
        this.mostrarSoloUsuarios = true;
      }
      
        let array = path.location.path.split("/");
        console.log(array);
        let validacion = path.location.path.includes(`${this.perfil}`);
        let refStorage = storage().ref("cosas-lindas");

        if(validacion && this.mostrarSoloUsuarios)
        {
          refStorage.child(array[1]).getDownloadURL().then((dato) =>{
            this.url.push(dato);
          });
        }
        else if(!this.mostrarSoloUsuarios)
        {
          refStorage.child(array[1]).getDownloadURL().then((dato) =>{
            this.url.push(dato);
          });
        }
        
      }

      setTimeout(()=>{
        this.ordenar();
      },1000);
    });
  }

  ordenar()
  {
    this.url.sort((a,b) => {
      if(a < b)
        return 1
      else
        return -1
    })
    console.log(this.url);
    this.urlOrdenado = this.url;
  }

  loading()
  {
    $("#loadingGaleriaCosasLindas").removeAttr("hidden");
    $("#backdropGaleriaCosasLindas").removeAttr("hidden");
    setTimeout( () => {
        $("#loadingGaleriaCosasLindas").attr("hidden",true);
        $("#backdropGaleriaCosasLindas").attr("hidden",true);
    }, 2500);
  }

  agregarFavorita(path : string)
  {
    this.db.collection("favoritas").add({
      foto : path,
      usuario : this.perfil
    })

    this.subs.unsubscribe();
  }

  validarFavoritas(foto : string)
  {
    let retorno = false;

    this.subs = this.db.collection("favoritas").valueChanges().subscribe((favoritas) => {
      this.favoritas = favoritas;
      
      for(let item of this.favoritas)
      {
        if(this.perfil == item.usuario && foto == item.foto)
        {
          retorno = true;
          break;
        }
      }

      if(retorno == true)
      {
        this.displayError();
      }
      else
      {
        this.agregarFavorita(foto);
      }
    })
  }

  displayError()
  {
      this.mostrarError = true;
      this.vibracion.vibrate(500);
      setTimeout(()=> {
        this.mostrarError = false;
      },2000);

      this.subs.unsubscribe();
  }

}

