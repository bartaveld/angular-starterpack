//
// Domain class
//

export class User {

  private _username: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public get username(): string {
    return this._username;
  }

  public set username(n: string) {
    this._username = n;
  }
}
