import { Component } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../servicios/auth.service';
import { GuardsCheckEnd, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  titulo: String;
  divisa: any = "$";
  cuenta: any = "+";
  plata: any;
  dia: String;

  dolaresTotales: any = "";
  pesosTotales: any = "";

  user_id: String;

  plataTotal: any;

  constructor(public afDB: AngularFireDatabase, public alertController: AlertController, private AFauth : AngularFireAuth, private authService : AuthService, public router : Router, public toastController: ToastController) 
  {
    this.AFauth.authState.subscribe(user => {
      if(user)
      {     
        this.user_id = user.uid;
        this.afDB.list("/Users/" + this.user_id + "/plata").valueChanges().subscribe(
          data =>{
            this.dolaresTotales = data[0];
            this.pesosTotales = data[1];
          }
        )
      }
    })
  }

  async logForm()
  {
    if(this.titulo == null || this.divisa == null || this. cuenta == null || this.plata == null || this.dia == null)
    {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error',
        message: 'Asegurate de haber completado todos los campos',
        buttons: ['OK']
      });
  
      await alert.present();
    }
    else
    {
      this.afDB.list("/Users/" + this.user_id + "/historial").push({
      titulo: this.titulo,
      divisa: this.divisa,
      cuenta: this.cuenta,
      plata: this.plata,
      dia: this.dia.substring(0, 10)
    });

      if(this.cuenta == "+")
      {
        if(this.divisa == "$")
        {
          this.plataTotal = parseInt(this.pesosTotales) + parseInt(this.plata);
          this.afDB.database.ref("/Users/" + this.user_id + "/plata/pesos/").set(this.plataTotal);
        }
        else if(this.divisa == "USD")
        {
          this.plataTotal = parseInt(this.dolaresTotales) + parseInt(this.plata);
          this.afDB.database.ref("/Users/" + this.user_id + "/plata/dolares/").set(this.plataTotal);
        }
      }
      else if(this.cuenta == "-")
      {
        if(this.divisa == "$")
        {
          this.plataTotal = parseInt(this.pesosTotales) - parseInt(this.plata);
          this.afDB.database.ref("/Users/" + this.user_id + "/plata/pesos/").set(this.plataTotal);
        }
        else if(this.divisa == "USD")
        {
          this.plataTotal = parseInt(this.dolaresTotales) - parseInt(this.plata);
          this.afDB.database.ref("/Users/" + this.user_id + "/plata/dolares/").set(this.plataTotal);
        }
      }

      this.mensajeToast();

      sleep(1000).then(() => { 
        this.router.navigate(["/tabs/tabs/tab1"]);
        this.plata = "";
        this.titulo = "";
        });
    }
    
    }

    async mensajeToast() {
      const toast = await this.toastController.create({
        message: this.cuenta + this.divisa + this.plata + " fueron guardados en tu cuenta correctamente",
        duration: 4000
      });
      toast.present();
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}