import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  subs;
  jugadoresBD;
  jugadorUno : string;
  jugadorDos: string;
  fecha : string;
  perfil : string;

  constructor(private ruta : ActivatedRoute, private navegador : Router, private db : AngularFirestore) 
  {
    this.subs = this.db.collection("jugadores").valueChanges().subscribe((datos) => {
      this.jugadoresBD = datos;
    });

    this.perfil = this.ruta.snapshot.params.perfil;
  }

  volver()
  {
    this.navegador.navigate(["login"]);
  }

  crearPartido()
  {
     this.subs.unsubscribe();
     this.agregarJugadoresInexistentes();
     localStorage.setItem("partidoCreado", JSON.stringify({"jugadorUno" : this.jugadorUno, "jugadorDos" : this.jugadorDos, "fecha" : this.fecha}));
     this.navegador.navigate(["partido"]);
     
  }

  agregarJugadoresInexistentes() : boolean
  {
     let retorno = false;  
     let jugadorUnoExiste: boolean = false;
     let jugadorDosExiste: boolean = false; 

     for(let jugador of this.jugadoresBD)
     {
       if(this.jugadorUno == jugador.nombre)
       {
          jugadorUnoExiste = true;
       }
       else if(this.jugadorDos == jugador.nombre)
       {
          jugadorDosExiste = true;
       }
     }

     if(!jugadorUnoExiste)
     {
        this.db.collection("jugadores").doc(this.jugadorUno).set({
          nombre: this.jugadorUno,
          ganados : 0
        })
     }
     
     if(!jugadorDosExiste)
     {
        this.db.collection("jugadores").doc(this.jugadorDos).set({
          nombre: this.jugadorDos,
          ganados : 0
        })
     }

     return retorno;
  }

}
