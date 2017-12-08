import { User } from './user.model';

export  class Mock {
  public static login(): User {
    return { username: '', firstName: '', lastName: '', imagePath: '' } as User;
  }
}
