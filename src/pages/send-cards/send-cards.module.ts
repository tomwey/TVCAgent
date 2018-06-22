import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendCardsPage } from './send-cards';

@NgModule({
  declarations: [
    SendCardsPage,
  ],
  imports: [
    IonicPageModule.forChild(SendCardsPage),
  ],
})
export class SendCardsPageModule {}
