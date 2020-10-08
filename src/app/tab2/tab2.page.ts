import { Component } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

var luz_c = 2;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  luz: number = 2;
  user_id: string;

  constructor(public afDB: AngularFireDatabase, private AFauth : AngularFireAuth) 
  {
    this.AFauth.authState.subscribe(user => {
      if(user) this.user_id = user.uid
    })
    this.recargar();
  }


  recargar()
  {
    this.afDB.database.ref("/Users/" + this.user_id + "/config" + "/luz").on('value', function(snapshot){
      //console.log(snapshot.val());
      luz_c = snapshot.val();
    });
    this.luz = luz_c;
  }

  save()
  {
    this.afDB.database.ref("/Users/" + this.user_id + "/config" + "/luz" ).set(this.luz);
  }

}
