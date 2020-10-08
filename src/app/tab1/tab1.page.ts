import { Component } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../servicios/auth.service'
import { Router } from '@angular/router'
var luz_l = false;
var aire_l = false;
var luz_d = false;
var aire_d = false;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  habitacion: number = 0;
  luz_estado_liv: boolean = false;
  aire_estado_liv: boolean = false;
  luz_estado_dor: boolean = false;
  aire_estado_dor: boolean = false;
  cortina_estado: number = 10;
  dispositivos: any [];
  user_id: string;
  
  constructor(public afDB: AngularFireDatabase, private AFauth : AngularFireAuth, private authService : AuthService, public router : Router) {
    this.AFauth.authState.subscribe(user => {
      if(user) this.user_id = user.uid
    })
    this.recargar();
  }

  luz(room: string)
  {
    if(room == "living")
    {
      this.luz_estado_liv = !this.luz_estado_liv;
      this.afDB.database.ref("/Users/" + this.user_id + "/" + room + "/luz" ).set(this.luz_estado_liv);
    }
    else if(room == "dormitorio")
    {
      this.luz_estado_dor = !this.luz_estado_dor;
      this.afDB.database.ref("/Users/" + this.user_id + "/" + room + "/luz" ).set(this.luz_estado_dor);
    }
  }

  aire(room: string)
  {
    if(room == "living")
    {
      this.aire_estado_liv = !this.aire_estado_liv;
      this.afDB.database.ref("/Users/" + this.user_id + "/" + room + "/aire" ).set(this.aire_estado_liv);
    }
    else if(room == "dormitorio")
    {
      this.aire_estado_dor = !this.aire_estado_dor;
      this.afDB.database.ref("/Users/" + this.user_id + "/" + room + "/aire" ).set(this.aire_estado_dor);
    }
  }

  cortina(valor: number, room: string)
  {
    
    if(this.cortina_estado == 10 && valor == 0)
    {
      this.cortina_estado = 5;
    }
    else if (this.cortina_estado == 5 && valor == 0)
    {
      this.cortina_estado = 0;
    }
    else if (this.cortina_estado == 0 && valor == 1)
    {
      this.cortina_estado = 5;
    }
    else if (this.cortina_estado == 5 && valor == 1)
    {
      this.cortina_estado = 10;
    }

    this.afDB.database.ref("/Users/" + this.user_id + "/" + room + "/cortina").set(this.cortina_estado);
  }


  recargar()
  {
    this.afDB.database.ref("/Users/" + this.user_id + "/" + "living" + "/luz").on('value', function(snapshot){
      //console.log(snapshot.val());
      luz_l = snapshot.val();
    });
    this.afDB.database.ref("/Users/" + this.user_id + "/" + "living" + "/aire").on('value', function(snapshot){
      //console.log(snapshot.val());
      aire_l = snapshot.val();
    });
    this.afDB.database.ref("/Users/" + this.user_id + "/" + "dormitorio" + "/luz").on('value', function(snapshot){
      //console.log(snapshot.val());
      luz_d = snapshot.val();
    });
    this.afDB.database.ref("/Users/" + this.user_id + "/" + "dormitorio" + "/aire").on('value', function(snapshot){
      //console.log(snapshot.val());
      aire_d = snapshot.val();
    });
    this.luz_estado_liv = luz_l;
    this.aire_estado_liv = aire_l;
    this.luz_estado_dor = luz_d;
    this.aire_estado_dor = aire_d;
  }

  signout()
  {
    this.authService.logout().then(res =>{
      this.router.navigate(['/login']);
    }).catch(err => alert('Error'))
  }






  
}
