import { Component } from '@angular/core';
import { /*IonicPage, */NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the UserCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-user-card',
  templateUrl: 'user-card.html',
})
export class UserCardPage {

  state: string = 'pending';

  cards: any = [];
  error: any = null;

  pageNo: number = 1;
  pageSize: number = 10;
  totalPage: number = 1;

  hasMore: boolean = false;

  constructor(public navCtrl: NavController, 
    private api: ApiService,
    private users: Users,
    private tools: Tools,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad UserCardPage');
    this.loadData();
  }

  loadData(): Promise<any> {
    return new Promise(resolve => {
      this.users.token().then(token => {
        this.api.GET('agent/cards', { token: token, state: this.state })
          .then(res => {
            let data = res['data'] || [];
            if (this.pageNo == 1) {
              this.cards = data;
            } else {
              let temp = this.cards || [];
              this.cards = temp.concat(data);
            }

            if (data.length === 0) {
              if (this.pageNo === 1) {
                this.error = '暂无数据';
              } else {
                this.error = null;

                this.tools.showToast('没有更多数据了');
              }
            }

            this.totalPage = (res['total'] + this.pageSize - 1) / this.pageSize;
            
            this.hasMore = this.totalPage > this.pageNo;

            resolve(true);
          })
          .catch(error => {
            if (this.pageNo == 1) {
              this.error = error;
            } else {
              this.tools.showToast(error);
              this.error = null;
            }
            resolve(false);
          });
      });
    });
    
  }

  segmentChanged(ev) {
    this.cards = [];
    this.pageNo = 1;
    this.totalPage = 1;

    this.hasMore = false;
    this.error = null;

    this.loadData();
  }

  sendCard(card) {
    this.users.token().then(token => {
      this.api.POST('agent/send_card', { token: token, 
                                         id: card.id, 
                                         uid: card.user_id })
        .then(res => {
          this.tools.showToast('发卡成功！');
          this.segmentChanged(null);
        })
        .catch(error => {
          this.tools.showToast(error.message || '发卡失败！');
        });
    })
  }

  loadMore(e) {
    if (this.pageNo < this.totalPage) {
      this.pageNo ++;
      this.loadData().then(() => {
        e.complete();
      })
    }
  }

}
