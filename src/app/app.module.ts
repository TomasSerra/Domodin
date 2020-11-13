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
  apiKey: "AIzaSyCbxggyUxLQUEYvW1CE1nJA-9IGH0EqWzY",
  authDomain: "billetera-214a6.firebaseapp.com",
  databaseURL: "https://billetera-214a6.firebaseio.com",
  projectId: "billetera-214a6",
  storageBucket: "billetera-214a6.appspot.com",
  messagingSenderId: "1028852374555",
  appId: "1:1028852374555:web:bcf81bb879c2f019b1acbe"
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
