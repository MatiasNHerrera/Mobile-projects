import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as $ from 'jquery';
import { storage } from 'firebase/app';

@Component({
  selector: 'app-grafica-feas',
  templateUrl: './grafica-feas.page.html',
  styleUrls: ['./grafica-feas.page.scss'],
})
export class GraficaFeasPage implements OnInit {

  listadoImagenes = [];
  listadoConVotos = [];
  listadoFavoritas = [];
  url = [];

  constructor(private db : AngularFirestore) 
  { 
  }

  ngOnInit() {
    this.loading();
    this.db.collection("favoritasFeas").valueChanges().subscribe((datos) => {
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
      const imagenes = storage().ref("cosas-feas");

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
    $("#loadingMasVotadasFeas").removeAttr("hidden");
    $("#backdropMasVotadasFeas").removeAttr("hidden");
    setTimeout( () => {
        $("#loadingMasVotadasFeas").attr("hidden",true);
        $("#backdropMasVotadasFeas").attr("hidden",true);
    }, 4000);
  }

}
