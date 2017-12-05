export class Login {

  private _username: string;
  private _token: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public get username(): string {
    return this._username;
  }

  public set username(n: string) {
    this._username = n;
  }

  public get token(): string {
    return this._token;
  }

  public set token(n: string) {
    this._token = n;
  }
}
