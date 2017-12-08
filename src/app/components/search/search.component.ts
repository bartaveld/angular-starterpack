import { User } from './../../models/user.model';
import { UsersService } from './../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public param: string;
  public searching = true;
  public results: User[] = [];

  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.param = params['param'];
          this.usersService.doSearch(this.param)
          .then((searchResults) => {
            this.results = searchResults;
            this.searching = false;
          });
    });
  }
}
