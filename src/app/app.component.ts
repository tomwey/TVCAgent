import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
// import { RedpackDetailPage } from '../pages/redpack-detail/redpack-detail';
import { Users } from '../provider/Users';
// import { Utils } from '../provider/Utils';
import { Tools } from '../provider/Tools';
// import { AppManager } from '../provider/AppManager';

// import { RedpackOwnerScanPage } from '../pages/redpack-owner-scan/redpack-owner-scan';
// import { UserScanRedpackPage } from '../pages/user-scan-redpack/user-scan-redpack';
// import { Wechat } from '../provider/Wechat';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any; //= TabsPage;

  constructor(platform: Platform, statusBar: StatusBar,
    private users: Users, 
    private tools: Tools,
    // private appManager: AppManager,
    // private wechat: Wechat,
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.users.token().then(token => {
        if (!token) {
          this.rootPage = LoginPage;
        } else {
          this.rootPage = TabsPage;
        }
      })
    });
  }

}
