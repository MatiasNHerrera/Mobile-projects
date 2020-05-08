import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../../app.component';
import * as $ from 'jquery';
import { element } from 'protractor';
import { exists } from 'fs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  email : string;
  clave : string;
  datosList : any[];

  actualizar: any;
  selectedItem : any;
  
  select = document.getElementById('#elegir');


  constructor(private db : AppComponent, private ruta : Router, private vibration : Vibration)
  { 
  }

  ngOnInit() {

    $("#container").fadeOut();

    this.loading();

    this.db.getDatosBd().subscribe(val => {
        this.datosList = val;
    });
  
  }

  OnLogin()
  {
    this.email = $("#email").val();
    this.clave = $("#pass").val();

    if(this.ValidarVacios(this.email, this.clave))
    {     
      if(this.ValidarEmail(this.email))
      {
         if(this.ValidarBD(this.email, this.clave))
         {
            this.loading();
            setTimeout( () => 
            {
              this.ruta.navigate(["home"]);
            } ,2000);
         }
         else
         {
            $("#mensajeTexto").text("Usuario no registrado, vuelva a interntarlo");
            $("#mensaje").removeAttr('hidden');
            this.Vibracion();
         }
      }
      else
      {
        $("#mensajeTexto").text("El campo no cumple con los requisitos de tipo correo");
        $("#mensaje").removeAttr('hidden');
        this.Vibracion();
      }
    }
    else
    {
      $("#mensajeTexto").text("No se permiten campos vacios");
      $("#mensaje").removeAttr('hidden');
      this.Vibracion();
    }

  }

  completar(correo : string)
  {

    for(let item of this.datosList)
    {
      if(item.correo == correo)
      {
         $("#email").val(item.correo);
         $("#pass").val(item.clave);
         break;
      }
    }
  } 

  ValidarVacios(email: string, password : string) : boolean
  {
      let retorno : boolean = true
      
      if(this.email == "" || this.clave == "" || this.email == null || this.clave == null)
      {
         retorno = false;
      }

      return retorno;
  }

  ValidarEmail(email:string) : boolean
  {
    let regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    let retorno : boolean = false;

    if(regex.test(email))
    {
        retorno = true;
    }

    return retorno;
  }

  Ocultar()
  {
    $("#mensaje").attr('hidden',true);
  }

  ValidarBD(correo : string, clave : string) : boolean
  {
    let retorno = false;
  
    for(let item of this.datosList)
    {
      if(item.correo == correo && item.clave == clave)
      {
         localStorage.setItem("usuario", item.perfil);
         retorno = true;
      }
    }
    return retorno;
  }

  Limpiar()
  {
    $("#email").val(null)
    $("#pass").val(null)
  }

  Vibracion()
  {
      this.vibration.vibrate(500);
  }

  loading()
  {
    $("#loading").removeAttr("hidden");
    $("#backdrop").removeAttr("hidden");
    setTimeout( () => {
        $("#loading").attr("hidden",true);
        $("#backdrop").attr("hidden",true);
    }, 2500);
  }

}
