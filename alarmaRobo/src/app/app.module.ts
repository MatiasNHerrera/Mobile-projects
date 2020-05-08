import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { firebaseConfig } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Gyroscope } from '@ionic-native/gyroscope/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  AngularFireModule.initializeApp(firebaseConfig), AngularFirestoreModule,
  AngularFireStorageModule,AngularFireAuthModule], 
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Vibration,Gyroscope,
    ScreenOrientation, Flashlight, DeviceMotion

  ],
  bootstrap: [AppComponent]
})
export class AppModule{}
