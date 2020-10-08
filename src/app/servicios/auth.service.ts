import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
var usu = null;
var uidd;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private AFauth : AngularFireAuth) { 
    usu = this.AFauth.currentUser;
    this.AFauth.setPersistence("none");
    this.AFauth.authState.subscribe(user => {
      if(user) uidd = user.uid
    })
    console.log(uidd);
  }
  comprobacion(){
    if(uidd != undefined){
      return true;
    } 
    else{
      return false;
    } 
  }
  
  login(email:string, password:string){
    return new Promise((resolve, rejected) =>{
      this.AFauth.signInWithEmailAndPassword(email, password).then(res =>{
        resolve(res);
        this.AFauth.setPersistence("none").then().catch();
      }).catch(err => rejected(err))
    });
  }
  logout(){
    return new Promise((resolve, rejected) =>{
      this.AFauth.signOut().then(res =>{
        resolve(res);
      }).catch(err => rejected(err))
    });
  }
}
