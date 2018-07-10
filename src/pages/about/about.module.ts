import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import { IonicImageViewerModule } from 'ionic-img-viewer';


@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    IonicImageViewerModule,
    IonicPageModule.forChild(AboutPage),
  ],
})
export class AboutPageModule {}
