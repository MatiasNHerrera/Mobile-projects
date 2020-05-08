import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { storage } from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { Vibration } from '@ionic-native/vibration/ngx';
import { timer } from 'rxjs';

@Component({
  selector: 'app-galeria-fea',
  templateUrl: './galeria-fea.page.html',
  styleUrls: ['./galeria-fea.page.scss'],
})
export class GaleriaFeaPage implements OnInit {

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

  traerFotos(queTraer : string)
  {
      this.url = [];
      const imagenes = storage().ref("cosas-feas");
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
          let refStorage = storage().ref("cosas-feas");

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
    this.urlOrdenado = this.url;
  }

  loading()
  {
    $("#loadingGaleriaCosasFeas").removeAttr("hidden");
    $("#backdropGaleriaCosasFeas").removeAttr("hidden");
    setTimeout( () => {
        $("#loadingGaleriaCosasFeas").attr("hidden",true);
        $("#backdropGaleriaCosasFeas").attr("hidden",true);
    }, 2500);
  }

  agregarFavorita(path : string)
  {
    this.db.collection("favoritasFeas").add({
      foto : path,
      usuario : this.perfil
    })

    this.subs.unsubscribe();
  }

  validarFavoritas(foto : string)
  {
    let retorno = false;

    this.subs = this.db.collection("favoritasFeas").valueChanges().subscribe((favoritas) => {
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
