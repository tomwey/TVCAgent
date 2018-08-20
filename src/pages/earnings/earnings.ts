import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { ApiService } from '../../provider/api-service';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the EarningsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-earnings',
  templateUrl: 'earnings.html',
})
export class EarningsPage {

  error: any = null;
  earns: any = [];
  page: number = 1;
  size: number = 30;
  totalPage: number = 1;

  hasMore: boolean = false;

  constructor(public navCtrl: NavController, 
    private users: Users,
    private api: ApiService,
    private tools: Tools,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDsidLoad EarningsPage');
    this.loadData();
  }

  loadData(): Promise<any> {
    return new Promise((resolve) => {
      this.users.token().then(token => {
        this.api.GET('agent/earns', { token: token, page: this.page, size: this.size })
        .then(data => {
          console.log(data);
          const total = parseInt(data['total']);
          this.totalPage = (total + this.size - 1) / this.size;
          const arr = data['data'] || [];
          if (this.page == 1) {
            this.earns = arr;
            if (this.earns.length == 0) {
              this.error = '暂无佣金明细';
            } else {
              this.error = null;
            }
          } else {
            this.error = null;
            this.earns = this.earns.concat(arr);
          }
          // console.log(data);
          
          this.hasMore = this.totalPage > this.page;
        })
        .catch(error => {
          if (this.page == 1) {
            this.error = error.message || '服务器出错了~';
          } else {
            this.error = null;
            this.tools.showToast(error.message || '服务器出错了~');
          }
        });
      });
      
    });
  }

}
