import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import firebase from 'firebase';
import {User} from '../model/user.class';
import {switchMap} from 'rxjs/operators';
import auth = firebase.auth;


export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

@Injectable({
  providedIn: 'root'
})

export class InboxService {
  private user: firebase.User;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.afAuth.authState.subscribe(auth=>{
      if(auth!=null||auth!=undefined){
        this.user=auth;
      }
    })
  }

  getUser(){
    return this.user;
  }

  googleLogin(){
    const provider= new firebase.auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider)
      .then((auth) => {
        console.log(auth.user);
        const roomname=`room_${auth.user.displayName}`;
        const nickname=`${auth.user.displayName}`;
        this.createRoom(roomname,nickname);
        this.createUser();
      })
      .catch(error => console.log(error));
  }

  facebookLogin(){
    const provider= new firebase.auth.FacebookAuthProvider();
    return this.afAuth.signInWithPopup(provider)
      .then((auth) => {
        console.log(auth.user);
        const roomname=`room_${auth.user.displayName}`;
        const nickname=`${auth.user.displayName}`;
        this.createRoom(roomname,nickname);
        this.createUser();
      })
      .catch(error => console.log(error));
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(user => {
      const data = {
        uid: user.user.uid,
        emailUser: email,
        displayName: user.user.displayName,
        status: 'online'
      };
      firebase.database().ref().child('/users/' + data.uid).update(data);
    });
  }

  signUp(email: string, password: string, nickName: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.user.updateProfile({displayName: nickName, photoURL: null})
          .then(() => {
            this.afAuth.updateCurrentUser(this.user);
          })
          .catch(err => {
            console.log(err);
          });
        const data = {
          uid: user.user.uid,
          emailUser: email,
          nickname: nickName,
          status: 'online'
        };
        firebase.database().ref().child('/users/' + data.uid).update(data);
      }).then(() => {
        this.createRoom(`room_${nickName}`, nickName);
      })
      .catch(error => console.log(error));
  }

  logout() {
    this.afAuth.signOut();
  }

  createRoom(roomname: string, nickname: string) {
    const data={
      roomname:roomname,
      nickname:nickname,
      uid:this.user.uid
    }
    firebase.database().ref().child('/rooms/' + data.uid).update(data);
  }

  sendMessage(msg: string,roomname:string) {
    console.log(this.user);
    const data = {msg: '', uid: '', nickname: '', roomname: ''};
    data.msg = msg;
    data.uid = this.user.uid;
    data.nickname = this.user.displayName;
    data.roomname = roomname;
    firebase.database().ref('messages').push().set(data);
  }

  sendMessageByAdmin(msg:string,roomname:string){
    const data={
      msg:msg,
      uid:'',
      nickname:'admin',
      roomname:roomname
    }
    firebase.database().ref('messages').push().set(data);
  }

  getMessage(roomName: string) {
    return this.db.list('messages',ref => ref.orderByChild('roomname').equalTo(roomName)).valueChanges()
  }

  getNickName(){
    return this.user.displayName;
  }

  createUser(){
    const data = {
      uid: this.user.uid,
      emailUser: this.user.email,
      nickname: this.user.displayName,
      status: 'online'
    };
    firebase.database().ref().child('/users/' + data.uid).update(data);
  }
}
