import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewAgentPage } from './new-agent';

@NgModule({
  declarations: [
    NewAgentPage,
  ],
  imports: [
    IonicPageModule.forChild(NewAgentPage),
  ],
})
export class NewAgentPageModule {}
