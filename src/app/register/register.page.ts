import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service'
import { Router } from '@angular/router'
import {auth} from "firebase/app"
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  mail: string = "";
  password: string = "";
  cpassword: string = "";

  constructor(public afAuth: AngularFireAuth, public alertController: AlertController, public router: Router) { }

  ngOnInit() {
  }

  atras()
  {
    this.router.navigate(["/login"]);
  }

  async registrar()
  {
    const{ mail, password, cpassword } = this;
    if(password != cpassword)
    {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Cuidado',
        message: 'Las contraseñas no coinciden',
        buttons: ['OK']
      });
  
      await alert.present();
    }
    else
    {
      try
    {
      const res = await this.afAuth.createUserWithEmailAndPassword(mail, password);
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Muy bien',
        message: 'Usuario creado correctamente',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(["/login"]);
    }catch(error)
    {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Cuidado',
        message: error,
        buttons: ['OK']
      });
      await alert.present();
    }
    }
    
     
  }

}
