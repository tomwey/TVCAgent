import { Component, ViewChild } from '@angular/core';
import { /*IonicPage,*/ NavController, NavParams, Content, App } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { DomSanitizer } from '@angular/platform-browser';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  agent: any = {
    login: '',
    password: '',
  }

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private api: ApiService,
    private san: DomSanitizer,
    private users: Users,
    private iosFixed: iOSFixedScrollFreeze,
    private tools: Tools,
    private app: App,
  ) {
  }

  ionViewDidLoad() {
    this.iosFixed.fixedScrollFreeze(this.content);
    // console.log('ionViewDidLoad LoginPage');
    // this.loadUserAgreement();
  }

  doLogin() {
    // this.users.login
    this.users.login(this.agent)
      .then(() => {
        this.tools.showToast('登录成功');
        this.app.getRootNavs()[0].setRoot(TabsPage);
      })
      .catch(error => {
        this.tools.showToast(error.message || '登录失败');
      });
  }

}
