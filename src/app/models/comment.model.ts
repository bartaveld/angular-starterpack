export class Comment {

  private _id: string;
  private _username: string;
  private _message: string;
  private _postedOn: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public get id(): string {
    return this._id;
  }

  public set id(n: string) {
    this._id = n;
  }

  public get username(): string {
    return this._username;
  }

  public set username(n: string) {
    this._username = n;
  }

  public get message() {
    return this._message;
  }

  public set message(n: string) {
    this._message = n;
  }

  public get postedOn() {
    return this._postedOn;
  }

  public set postedOn(n: Date) {
    this._postedOn = n;
  }
}
