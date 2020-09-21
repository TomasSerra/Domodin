import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  luz_estado: boolean;
  aire_estado: boolean;
  dispositivos: any [];
  
  constructor(public afDB: AngularFireDatabase,) {
   this.getDatos();
  }

  luz()
  {
    
    this.luz_estado = !this.luz_estado

    if(this.dispositivos[0] == null)
    {
      this.afDB.list('/ESP32/').push({
      luz: this.luz_estado,
      aire: this.aire_estado
      });
    }
    else
    {
      this.afDB.database.ref("/ESP32/" + this.dispositivos[0].key + "/luz").set(this.luz_estado);
    }

    this.dispositivos[0].luz = this.luz_estado;
    
  }

  aire()
  {
    
    this.aire_estado = !this.aire_estado;

    if(this.dispositivos[0] == null)
    {
      this.afDB.list('/ESP32/').push({
      luz: this.luz_estado,
      aire: this.aire_estado
      });
    }
    else
    {
      this.afDB.database.ref("/ESP32/" + this.dispositivos[0].key + "/aire").set(this.aire_estado);
    }

    this.dispositivos[0].aire = this.aire_estado;
  }

  getDatos()
  {
    this.afDB.list('/ESP32/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.dispositivos = [];
      actions.forEach(action => {
        this.dispositivos.push({
          key: action.key,
          luz: action.payload.exportVal().luz, 
          aire: action.payload.exportVal().aire
        });
      });
    });
  }

  recargar()
  {
    this.getDatos();
    this.aire_estado = this.dispositivos[0].aire;
    this.luz_estado = this.dispositivos[0].luz;
  }






  
}
