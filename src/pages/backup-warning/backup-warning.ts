import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the BackupWarningPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-backup-warning',
  templateUrl: 'backup-warning.html',
})
export class BackupWarningPage {

  public currentIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BackupWarningPage');
  }

  openWarningModal() {
    const myModal = this.modalCtrl.create('BackupWarningModalPage', {}, { showBackdrop: true, enableBackdropDismiss: true, cssClass: "backup-modal-warning" });
    myModal.present();
  }

}
