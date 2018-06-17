import { Component } from '@angular/core';
import { /*IonicPage, */NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserCardPage');
  }

}
