import { Component } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../servicios/auth.service'
import { GuardsCheckEnd, Router } from '@angular/router'

var existe = true

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public pesos: any;
  public dolares: any;

  constructor(public afDB: AngularFireDatabase, private AFauth : AngularFireAuth, private authService : AuthService, public router : Router) 
  {
    this.AFauth.authState.subscribe(user => {
      if(user)
      {     
        this.recargar(user.uid);
      }
    })
  }

  recargar(user_id: string)
  {
    this.afDB.database.ref("/Users/" + user_id).once('value').then(function(snapshot) {
      existe = snapshot.exists();
    });

    sleep(2000).then(() => { 
      if(existe == false)
      {
        this.afDB.database.ref("/Users/" + user_id + "/plata/").set({
        pesos: "00000",
        dolares: "00000"
        })
      }
      });


      this.afDB.list("/Users/" + user_id + "/plata").valueChanges().subscribe(
        data =>{
          this.dolares = data[0];
          this.pesos = data[1];
        }
      )

      sleep(2000).then(() => {
        if(this.dolares == 0 || this.dolares == "0")
      {
        this.afDB.database.ref("/Users/" + user_id + "/plata/").set({
          pesos: this.pesos,
          dolares: "00000"
          })
      }
      if (this.pesos == 0 || this.pesos == "0")
      {
        this.afDB.database.ref("/Users/" + user_id + "/plata/").set({
          pesos: "00000",
          dolares: this.dolares
          })
      }
      })
      
  }

  salir()
  {
    this.authService.logout().then(res =>{
      this.router.navigate(['/login']);
    }).catch(err => alert('Error'))
  }

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


