import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  public param = '';
  public showMenu = true;

  constructor(private navbarService: NavbarService) { }

  ngOnInit() {
    this.navbarService.navbarIsOut.subscribe(next => {
      this.showMenu = !next;
    });
  }

  toggleNav() {
    this.navbarService.toggleNavbar();
  }

}
