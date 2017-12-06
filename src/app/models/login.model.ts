export class Login {

  private _username: string;
  private _firstName: string;
  private _lastName: string;
  private _imagePath: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public get username(): string {
    return this._username;
  }

  public set username(n: string) {
    this._username = n;
  }

  public get firstName() {
    return this._firstName;
  }

  public set firstName(n: string) {
    this._firstName = n;
  }

  public get lastName() {
    return this._lastName;
  }

  public set lastName(n: string) {
    this.lastName = n;
  }

  public get imagePath() {
    return this._imagePath;
  }

  public set imagePath(n: string) {
    this._imagePath = n;
  }

  public setName(first: string, last: string) {
    this.firstName = first;
    this.lastName = last;
  }
}
