import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-detail-posts',
  templateUrl: './profile-detail-posts.component.html',
  styleUrls: ['./profile-detail-posts.component.css']
})
export class ProfileDetailPostsComponent implements OnInit {

  public posts = [
    {title: 'First post!', message: 'test post let me look how this new social platform works'},
    {title: 'Lorem ipsum bacon thingy', message: 'Bacon ipsum dolor amet tail short loin kevin pancetta filet mignon, bacon drumstick rump venison pork loin leberkas flank bresaola. Kielbasa leberkas beef alcatra jerky. Pork loin jowl venison short loin andouille tri-tip pig kielbasa frankfurter. Hamburger pancetta turkey pork chop spare ribs capicola biltong. Pancetta t-bone boudin, burgdoggen pork loin andouille fatback ham hock pork chop ground round shankle strip steak turducken pastrami. Shoulder shank strip steak beef ribs drumstick beef pork loin ground round.'},
    {title: 'Lorem ipsum bacon thingy', message: 'Bacon ipsum dolor amet tail short loin kevin pancetta filet mignon, bacon drumstick rump venison pork loin leberkas flank bresaola. Kielbasa leberkas beef alcatra jerky. Pork loin jowl venison short loin andouille tri-tip pig kielbasa frankfurter. Hamburger pancetta turkey pork chop spare ribs capicola biltong. Pancetta t-bone boudin, burgdoggen pork loin andouille fatback ham hock pork chop ground round shankle strip steak turducken pastrami. Shoulder shank strip steak beef ribs drumstick beef pork loin ground round.'},
    {title: 'Lorem ipsum bacon thingy', message: 'Bacon ipsum dolor amet tail short loin kevin pancetta filet mignon, bacon drumstick rump venison pork loin leberkas flank bresaola. Kielbasa leberkas beef alcatra jerky. Pork loin jowl venison short loin andouille tri-tip pig kielbasa frankfurter. Hamburger pancetta turkey pork chop spare ribs capicola biltong. Pancetta t-bone boudin, burgdoggen pork loin andouille fatback ham hock pork chop ground round shankle strip steak turducken pastrami. Shoulder shank strip steak beef ribs drumstick beef pork loin ground round.'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
