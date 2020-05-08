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
  selectedItem : any = "usuario@usuario.com";
 

  constructor(private db : AppComponent, private ruta : Router, private vibracion : Vibration)
  { 
    this.db.getDatosBd().subscribe(val => {
      
      this.datosList = val;

    });
  }

  ngOnInit() {

    this.loading();
  }

  OnLogin()
  {
    this.email = $("#correo").val();
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
            this.mostrarError("Usuario no registrado, vuelva a intentarlo");
         }
      }
      else
      {
        this.mostrarError("El campo no cumple con los requisitos de tipo correo");
      }
    }
    else
    {
      this.mostrarError("No se permiten campos vacios");
    }

  }




  completar(correo : string)
  {
    
    for(let item of this.datosList)
    {
      if(item.correo == correo)
      {
         $("#correo").val(item.correo);
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
         localStorage.removeItem("usuario");
         localStorage.setItem("usuario", JSON.stringify(item));
         retorno = true;
      }
    }
    return retorno;
  }

  Limpiar()
  {
    $("#correo").val(null)
    $("#pass").val(null)
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

  vibrar()
  {
    this.vibracion.vibrate(500);
  }

  mostrarError(mensaje : string)
  {
     $("#mensajeTexto").text(mensaje);
     $("#mensaje").removeAttr('hidden');
     this.vibrar();
  }

}
