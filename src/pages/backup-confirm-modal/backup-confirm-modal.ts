import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BackupConfirmModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-backup-confirm-modal',
  templateUrl: 'backup-confirm-modal.html',
})
export class BackupConfirmModalPage {

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BackupConfirmModalPage');
  }

  closeBackupResultModal() {
    // TODO waiting for bwc
    // profileService.isDisclaimerAccepted(function(val) {
    //   if (val) {
    //     $ionicHistory.removeBackView();
    //     $state.go('tabs.home');
    //   } else $state.go('onboarding.disclaimer', {
    //     walletId: $stateParams.walletId,
    //     backedUp: true
    //   });
    // });
    this.viewCtrl.dismiss();
  }

}
