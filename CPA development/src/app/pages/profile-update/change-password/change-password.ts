export class ChangePassword {
  id!: number;
  lastName!: string;
  mobileNo!: string;
  email!: string;
  firstName!: string;
  password!:string
  clear() {
    this.id = 0;
    (this.lastName = ""),
      (this.mobileNo = ""),
      (this.email = ""),
      (this.firstName = "");
      (this.password = "");
  }
}
