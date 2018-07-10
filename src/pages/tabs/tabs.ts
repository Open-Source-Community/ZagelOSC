import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular/umd';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab2Root = "PostsPage";
  tab3Root = "ContactPage";
  tab4Root = "AboutPage"; 

  constructor() {

  }
}
