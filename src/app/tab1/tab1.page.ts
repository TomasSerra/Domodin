import { Component } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
var luz = false;
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
  
  constructor(public afDB: AngularFireDatabase, private AFauth : AngularFireAuth) {
   this.getData();
   this.AFauth.authState.subscribe(user => {
     if(user) this.user_id = user.uid
   })
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

  getData()
  {
    this.afDB.list("/Users/" + this.user_id).snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.dispositivos = [];
      actions.forEach(action => {
        this.dispositivos.push({
          key: action.key,
          luz: action.payload.exportVal().luz, 
          aire: action.payload.exportVal().aire,
          cortina: action.payload.exportVal().aire
        });
      });
    });

  }

  recargar()
  {
    this.afDB.database.ref("/Users/" + this.user_id + "/" + "living" + "/luz").on('value', function(snapshot){
      console.log(snapshot.val());
      luz = snapshot.val();
    });
    this.luz_estado_liv = luz;
  }






  
}
