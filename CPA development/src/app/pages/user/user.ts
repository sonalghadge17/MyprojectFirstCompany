export class User {
  firstName!: string;
  lastName!: string;
  email!: string;
  mobileNo!: string;
  password!: string;
  cPassword!:string;
  clear() {
    (this.firstName = ""),
      (this.lastName = ""),
      (this.email = ""),
      (this.mobileNo = ""),
      (this.password = "");
  }
}
