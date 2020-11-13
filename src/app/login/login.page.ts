import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service'
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user : string;
  password :string;
  user_id: string;

  constructor(private authService : AuthService, public router : Router, public alertController: AlertController, public afDB: AngularFireDatabase) { 
  }

  ingresar(){
    this.authService.login(this.user, this.password).then(res =>{
      this.router.navigate(['/tabs/tabs/tab1']);
    }).catch(err => this.alerta())
  }

  async alerta()
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: 'Datos incorrectos',
      buttons: ['OK']
    });

    await alert.present();
  }

  registrar()
  {
    this.router.navigate(['/register']);
  }

  ngOnInit() {
  }

}
