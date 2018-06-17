import { Component } from '@angular/core';
import { /*IonicPage, */NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';

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

  homeData: any = {
    agent: null,
    app_info: null,
    orders: [],
  };

  constructor(public navCtrl: NavController, 
    private api: ApiService,
    private users: Users,
    private tools: Tools,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HomePage');
    this.loadData();
  }

  loadData() {
    this.users.token().then(token => {
      this.api.GET('agent/home', { token: token }, '正在加载')
        .then(res => {
          this.homeData = res['data'];
        })
        .catch(error => {
          this.tools.showToast(error.message || error);
        });
    });
  }

}
