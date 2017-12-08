import { Login } from './login.model';

export  class Mock {
  public static login() {
    return { username: '', firstName: '', lastName: '', imagePath: '' };
  }
}
