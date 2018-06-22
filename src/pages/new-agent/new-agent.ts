import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { ApiService } from '../../provider/api-service';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the NewAgentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-agent',
  templateUrl: 'new-agent.html',
})
export class NewAgentPage {

  agent: any = {
    name: '',
    mobile: '',
    login: '',
    password: ''
  };
  constructor(
    public navCtrl: NavController, 
    private users: Users,
    private api: ApiService,
    private tools: Tools,
    private viewCtrl: ViewController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NewAgentPage');
  }

  commit() {
    if (!this.agent.name) {
      this.tools.showToast('名字不能为空');
      return;
    }

    if (!this.agent.mobile) {
      this.tools.showToast('手机不能为空');
      return;
    }

    if (!this.agent.login) {
      this.tools.showToast('登录名不能为空');
      return;
    }

    if (!this.agent.password || this.agent.password.length < 6) {
      this.tools.showToast('密码至少为6位');
      return;
    }

    let params = JSON.parse(JSON.stringify(this.agent));
    this.users.token().then(token => {
      params['token'] = token;
      this.api.POST('agent/create_child', params)
        .then(res => {
          this.tools.showToast('新建成功！');
          this.viewCtrl.dismiss(1).catch();
        })
        .catch(error => {
          this.tools.showToast(error.message || '服务器出错了~');
        });
    });
  }

  close() {
    this.viewCtrl.dismiss().catch();
  }

}
