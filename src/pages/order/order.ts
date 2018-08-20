import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { Tools } from '../../provider/Tools';
import { Users } from '../../provider/Users';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  orders: any = [];
  error: any = null;
  
  constructor(public navCtrl: NavController, 
    private api: ApiService,
    private users: Users,
    private tools: Tools,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad OrderPage');
    this.loadData();
  }

  loadData() {
    this.users.token().then(token => {
      this.api.GET('agent/orders', { token: token, type: 0 })
        .then(res => {
          console.log(res);
          if (res && res['data']) {
            let orders = res['data'];
            this.orders = orders;
            if (this.orders.length == 0) {
              this.error = "没有会员卡订单";
            } else {
              this.error = null;
            }
          } else {
            this.error = "没有会员卡订单";
          }
        })
        .catch(error => {
          this.error = error.message;
        });
    })
  }

}
