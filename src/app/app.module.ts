import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';



const firebaseConfig = {
  apiKey: "AIzaSyAglN0W2MQ10b8prqxeVv_49a-fQHbLW-A",
  authDomain: "domotica-120ce.firebaseapp.com",
  databaseURL: "https://domotica-120ce.firebaseio.com",
  projectId: "domotica-120ce",
  storageBucket: "domotica-120ce.appspot.com",
  messagingSenderId: "889692156725",
  appId: "1:889692156725:web:f7d15c59f3b36b2c08927c"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }), AngularFireAuthModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
