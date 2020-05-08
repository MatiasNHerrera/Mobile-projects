import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { storage } from 'firebase/app';
import * as $ from 'jquery';

@Component({
  selector: 'app-grafica-lindas',
  templateUrl: './grafica-lindas.page.html',
  styleUrls: ['./grafica-lindas.page.scss'],
})
export class GraficaLindasPage implements OnInit {

  listadoImagenes = [];
  listadoConVotos = [];
  listadoFavoritas = [];
  url = [];

  constructor(private db : AngularFirestore) 
  { 
  }

  ngOnInit() {
    this.loading();
    this.db.collection("favoritas").valueChanges().subscribe((datos) => {
      this.listadoFavoritas = datos;
      this.traerFotos();
      setTimeout(() => {
        this.contarVotos();
      },2000);
    });
  }

  contarVotos()
  {
    this.listadoConVotos = [];
    let contador : number = 0;
    for(let item of this.url)
    {
       for(let foto of this.listadoFavoritas)
       {
          if(item == foto.foto)
          {
            contador++;
          }
       }

       if(contador != 0){
        this.listadoConVotos.push({path : item, votos : contador});
        contador = 0;
       }
    }

    console.log(this.listadoConVotos);
  }

  traerFotos()
  {
      const imagenes = storage().ref("cosas-lindas");

      imagenes.listAll().then((imagenes) => {
      this.listadoImagenes = imagenes.items;
      
        for(let path of this.listadoImagenes)
        {
          storage().ref().child(path.location.path).getDownloadURL().then((dato) =>{
            this.url.push(dato);
          });
          
        }
      })
  }

  loading()
  {
    $("#loadingMasVotadas").removeAttr("hidden");
    $("#backdropMasVotadas").removeAttr("hidden");
    setTimeout( () => {
        $("#loadingMasVotadas").attr("hidden",true);
        $("#backdropMasVotadas").attr("hidden",true);
    }, 4000);
  }


}
