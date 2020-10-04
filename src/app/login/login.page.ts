import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user : string;
  password :string;
  constructor(private authService : AuthService, public router : Router) { 
  
  }

  ingresar(){
    this.authService.login(this.user, this.password).then(res =>{
      this.router.navigate(['/tabs/tabs/tab1']);
    }).catch(err => alert('Los datos son incorrectos'))
  }

  ngOnInit() {
  }

}
