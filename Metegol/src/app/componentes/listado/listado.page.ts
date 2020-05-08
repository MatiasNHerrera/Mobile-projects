import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { storage } from 'firebase/app';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  listadoImagenes;
  perfil : string;
  listadoResultados = [];
  listadoOrdenado = [];

  constructor(private ruta : ActivatedRoute, private navegador : Router, private db : AngularFirestore) { }

  ngOnInit() {
    this.perfil = this.ruta.snapshot.params.perfil
    this.db.collection("partidos").valueChanges().subscribe( (datos) => {
      this.listadoResultados = datos;
      this.ordenar();
      this.traerFotos();
    })
    
  } 

  volver()
  {
      if(this.perfil == "otros")
      {
        this.navegador.navigate(["login"]);
      }
      else
      {
        this.navegador.navigate(["home/admin"]);
      }
  }

  traerFotos()
  {
    let split = [];
    const imagenes = storage().ref("partidos");
      imagenes.listAll().then((imagenes) => {
      this.listadoImagenes = imagenes.items;

      for(let foto of this.listadoImagenes)
      {
        split = foto.location.path.split("/");
        
        for(let item of this.listadoOrdenado)
        {
          if(item.foto == split[1])
          {
            storage().ref().child(foto.location.path).getDownloadURL().then((dato) =>{
              item.foto = dato;
            });
          }
        }

      }

      console.log(this.listadoOrdenado);
    });

  }

  ordenar()
  {
    this.listadoResultados.sort((a,b) => {
      if(a.foto > b.foto)
      {
        return 1
      }
      else
      {
        return -1;
      }
    })

    this.listadoResultados.reverse();
    this.listadoOrdenado = this.listadoResultados;
    console.log(this.listadoOrdenado);
    console.log(this.listadoResultados);
  }
}
