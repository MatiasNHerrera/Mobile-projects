import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-mas-ganadores',
  templateUrl: './mas-ganadores.page.html',
  styleUrls: ['./mas-ganadores.page.scss'],
})
export class MasGanadoresPage implements OnInit {

  perfil : string;
  jugadores = [];
  ordenado = [];

  constructor(private ruta : ActivatedRoute, private navegador : Router, private db : AngularFirestore) 
  { 
    this.db.collection("jugadores").valueChanges().subscribe((datos) => {
      this.jugadores = datos;
      this.ordenar();
    })
  }

  ngOnInit() {
    this.perfil = this.ruta.snapshot.params.perfil;

    this.loading();
    setTimeout( () => {
        console.log("espera terminada");
    },2500);
  }

  loading()
  {
    $("#loadingGanadores").removeAttr("hidden");
    $("#backdrop").removeAttr("hidden");
    setTimeout( () => {
        $("#loadingGanadores").attr("hidden",true);
        $("#backdrop").attr("hidden",true);
    }, 2500);
  }

  volver()
  {
    this.navegador.navigate([`listado/${this.perfil}`]);
  }

  ordenar()
  {
    this.jugadores.sort((a,b) => {
      return (a.ganados - b.ganados);
    })

    this.jugadores.reverse();

    for(let i = 0; i < 5; i++)
    {
      this.ordenado.push(this.jugadores[i]);
    }
  }

}
