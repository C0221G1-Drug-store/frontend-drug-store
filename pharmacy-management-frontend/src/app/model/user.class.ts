export class User{
  uid: string;
  username: string = "";

  constructor(auth) {
    this.uid = auth.uid
  }
}
