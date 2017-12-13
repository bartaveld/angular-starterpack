import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavbarService {

  public navbarIsOut = new Subject<boolean>();
  public navbarIsOutBool = false;

  constructor() {
    this.navbarIsOut.next(this.navbarIsOutBool);
   }

   public toggleNavbar() {
    if (this.navbarIsOutBool) {
      this.navbarIsOutBool = false;
      this.navbarIsOut.next(this.navbarIsOutBool);
    } else {
      this.navbarIsOutBool = true;
      this.navbarIsOut.next(this.navbarIsOutBool);
    }
   }

}
