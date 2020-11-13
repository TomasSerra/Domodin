import { Component, ViewChild, OnInit } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../servicios/auth.service';
import { GuardsCheckEnd, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import {IonSearchbar} from "@ionic/angular";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  @ViewChild("search", {static: false}) search: IonSearchbar;

  historiales = [];
  id: string;

  searchedItem: any;
  dolaresTotales: any;
  pesosTotales: any;

  constructor(public afDB: AngularFireDatabase, private AFauth : AngularFireAuth, private authService : AuthService, public router : Router) 
  {
    this.AFauth.authState.subscribe(user => {
      if(user)
      {     
        this.afDB.list("/Users/" + user.uid + "/plata").valueChanges().subscribe(
          data =>{
            this.dolaresTotales = data[0];
            this.pesosTotales = data[1];
          }
        )
        this.getHistorial(user.uid);
      }
    })
  }

  ngOnInit()
  {

  }

  getHistorial(user_id: string) {
    this.id = user_id;
    this.afDB.list('Users/' + user_id + "/historial/").snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.historiales = [];
      actions.forEach(action => {
        this.historiales.push({
          key: action.key,
          titulo: action.payload.exportVal().titulo,
          divisa: action.payload.exportVal().divisa,
          cuenta: action.payload.exportVal().cuenta,
          plata: action.payload.exportVal().plata,
          dia: action.payload.exportVal().dia
        });
      });
    });
    sleep(1000).then(() =>{
      this.searchedItem = this.historiales;
    })
  }

  borrar(historia: any) 
  {
    if(historia.cuenta == "-")
    {
      if(historia.divisa == "$")
      {
        this.pesosTotales = parseInt(this.pesosTotales) + parseInt(historia.plata);
        this.afDB.database.ref("/Users/" + this.id + "/plata/pesos").set( this.pesosTotales);
      }
      else
      {
        this.pesosTotales = parseInt(this.dolaresTotales) + parseInt(historia.plata);
        this.afDB.database.ref("/Users/" + this.id + "/plata/dolares").set(this.pesosTotales);
      }
    }
    else
    {
      if(historia.divisa == "$")
      {
        this.pesosTotales = parseInt(this.pesosTotales) - parseInt(historia.plata);
        this.afDB.database.ref("/Users/" + this.id + "/plata/pesos").set( this.pesosTotales);
      }
      else
      {
        this.pesosTotales = parseInt(this.dolaresTotales) - parseInt(historia.plata);
        this.afDB.database.ref("/Users/" + this.id + "/plata/dolares").set(this.pesosTotales);
      }
    }
    this.afDB.list('Users/' + this.id + "/historial/").remove(historia.key);
  }

  public ionChange(event)
  {
    const val = event.target.value;
    this.searchedItem = this.historiales;

    if(val && val.trim() != "")
    {
      this.searchedItem = this.searchedItem.filter((item: any) =>
      {
        return (item.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

  }

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}