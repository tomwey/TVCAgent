import { Component } from '@angular/core';

import { SettingPage } from '../setting/setting';
import { HomePage } from '../home/home';
import { UserCardPage } from '../user-card/user-card';
// import { EarningsPage } from '../earnings/earnings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = UserCardPage;
  // tab3Root = SettingPage;

  constructor() {

  }
}
