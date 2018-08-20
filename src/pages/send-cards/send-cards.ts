import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { ApiService } from '../../provider/api-service';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the SendCardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-cards',
  templateUrl: 'send-cards.html',
})
export class SendCardsPage {

  orders: any = [];
  error: any = null;

  card: any = {
    id: null,
    need_active: false,
    uids: ''
  };

  constructor(public navCtrl: NavController, 
    private users: Users,
    private api: ApiService,
    private tools: Tools,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SendCardsPage');
    setTimeout(() => {
      this.loadData();
    }, 100);
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

  sendCards() {
    this.users.token().then(token => {
      this.api.POST('agent/send_cards', { token: token, 
        id: this.card.id, 
        uids: this.card.uids,
        need_active: this.card.need_active ? 1 : 0,
       })
        .then(res => {
          this.tools.showToast("发卡成功");
          this.loadData();
          this.card = {
            id: null,
            uids: '',
            need_active: false
          };
        })
        .catch(error => {
          // this.error = error.message;
          this.tools.showToast(error.message || '发卡失败');
        });
    })
  }

}
