import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private AFauth : AngularFireAuth, private AFD : AngularFireDatabase) {}

  login(email:string, password:string): Promise<firebase.auth.UserCredential> {
    return this.AFauth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      return this.AFauth.signInWithEmailAndPassword(email, password);
    })
  }

  logout(){
    return new Promise((resolve, rejected) =>{
      this.AFauth.signOut().then(res =>{
        resolve(res);
      }).catch(err => rejected(err))
    });
  }

  getUser(): Promise<firebase.User> {
    return this.AFauth.authState.pipe(first()).toPromise();
  }
}
