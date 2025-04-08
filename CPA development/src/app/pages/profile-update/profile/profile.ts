export class Profile {
  newPassword!: string;
  oldPassword!: string;
  id: any;
  clear() {
    this.id = 0;
    this.newPassword = "";
    this.oldPassword = "";
  }
}
