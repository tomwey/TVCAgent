import { Component } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, App, AlertController } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';
import { LoginPage } from '../login/login';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  agent: any = {};

  constructor(public navCtrl: NavController, 
    private api: ApiService,
    private users: Users,
    private tools: Tools,
    private app: App,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HomePage');
    this.loadData();
  }

  logout() {

    this.alertCtrl.create({
      title: '退出登录',
      subTitle: '您确定吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',

        },
        {
          text: '确定',
          handler: () => {
            this.users.logout().then(() => {
              setTimeout(() => {
                this.app.getRootNavs()[0].setRoot(LoginPage);
              }, 10);
            });
          }
        }
      ]
    }).present();

    
  }

  sendCards() {
    this.navCtrl.push('SendCardsPage');
  }

  openEarn() {
    this.navCtrl.push('EarningsPage');
  }

  openAgents() {
    this.navCtrl.push('AgentsPage');
  }

  openOrders() {
    this.navCtrl.push('OrderPage');
  }

  download() {
    this.navCtrl.push('BrowserPage', {
      slug: 'app_qrcode',
      title: 'APP下载'
    });
  }

  iosHelp() {
    this.navCtrl.push('BrowserPage', {
      slug: 'ios_help',
      title: '苹果安装教程'
    });
  }

  loadData() {
    this.users.token().then(token => {
      this.api.GET('agent/home', { token: token }, '正在加载')
        .then(res => {
          this.agent = res['data'];
        })
        .catch(error => {
          this.tools.showToast(error.message || error);
        });
    });
  }

}
