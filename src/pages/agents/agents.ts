import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { ApiService } from '../../provider/api-service';

/**
 * Generated class for the AgentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agents',
  templateUrl: 'agents.html',
})
export class AgentsPage {

  agents: any = [];
  error: any = null;

  constructor(public navCtrl: NavController, 
    private users: Users,
    private api: ApiService,
    private modalCtrl: ModalController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AgentsPage');
    setTimeout(() => {
      this.loadData();
    }, 100);
  }

  loadData() {
    this.users.token().then(token => {
      this.api.GET('agent/children', { token: token })
        .then(res => {
          if (res && res['data']) {
            this.agents = res['data'];
            this.error = this.agents.length == 0 ? '暂无下级分销商' : null;
          } else {
            this.error = '未知错误';
          }
        })
        .catch(error => this.error = error.message || '服务器出错了~');
    });
  }

  newAgent() {
    let modal = this.modalCtrl.create('NewAgentPage');
    modal.onDidDismiss((data) => {
      if (data) {
        this.loadData();
      }
    });
    modal.present();
  }

}
