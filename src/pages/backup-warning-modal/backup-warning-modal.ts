import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the BackupWarningModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-backup-warning-modal',
  templateUrl: 'backup-warning-modal.html',
})
export class BackupWarningModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BackupWarningModalPage');
  }

  close() {
    this.navCtrl.push('BackupGamePage');
    this.viewCtrl.dismiss();
  }

}
