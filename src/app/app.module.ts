import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Utils } from '../provider/Utils';
import { Tools } from '../provider/Tools';
import { Users } from '../provider/Users';
import { ApiService } from '../provider/api-service';
import { AppManager } from '../provider/AppManager';
import { Pays } from '../provider/Pays';
import { iOSFixedScrollFreeze } from '../provider/iOSFixedScrollFreeze';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      backButtonText: '',
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Utils,
    // APIs,
    Tools,
    // ApiService,
    Users,
    ApiService,
    AppManager,
    // Redpacks,
    Pays,
    // Wechat,
    iOSFixedScrollFreeze,
    // jsClipboard,
  ]
})
export class AppModule {}
