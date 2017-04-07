import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MovieService} from '../services/movie'
//Conexion en Firebase 
import { AngularFireModule } from 'angularfire2';
export const CONFIG ={
    apiKey: "AIzaSyCAJ0yv0bjy5MY0pTP-r2mLJzmtibFNEyk",
    authDomain: "service-worker-app.firebaseapp.com",
    databaseURL: "https://service-worker-app.firebaseio.com",
    projectId: "service-worker-app",
    storageBucket: "service-worker-app.appspot.com",
    messagingSenderId: "1028477238202"
}
/*
//Conexion para Notificaciones
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
const CLOUDSETTINGS: CloudSettings={
  'core':{
    'app_id':'9a9d284b'
  },
  'push':{
    'sender_id':'1028477238202',
    'pluginConfig':{
      'ios':{
        'badge':true,
        'sound':true
      },
      'android':{
        'iconColor':'#343434'
      }
    }
}
}
*/

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(CONFIG),
   // CloudModule.forRoot(CLOUDSETTINGS)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MovieService
  ]
})
export class AppModule {}
