import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ColorpickerPage } from './colorpicker';

@NgModule({
  declarations: [
    ColorpickerPage,
  ],
  imports: [
    IonicPageModule.forChild(ColorpickerPage),
  ],
})
export class ColorpickerPageModule {}
