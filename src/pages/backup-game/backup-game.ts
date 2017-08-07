import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Navbar } from 'ionic-angular';

/**
 * Generated class for the BackupGamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-backup-game',
  templateUrl: 'backup-game.html',
})
export class BackupGamePage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild(Navbar) navBar: Navbar;

  public currentIndex: number;
  public deleted: boolean;
  public wallet: any;
  public mnemonicWords: Array<String>;
  public shuffledMnemonicWords: Array<String>;

  private keys: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // TODO replace for the original wallet object
    this.wallet = {
      name: 'Wallet name',
      credentials: {
        mnemonic: 'uno dos tres cuatro cinco seis siete ocho nueve diez once doce',
        mnemonicEncrypted: false,
      },
      n: 1,
      isPrivKeyEncrypted: this.isPrivKeyEncrypted(),
      mnemonicHasPassphrase: this.mnemonicHasPassphrase(),
      network: 'livenet',
    };

    // TODO waiting for bwc
    // walletService.getKeys($scope.wallet, function(err, k) {
    //   if (err || !k) {
    //     $log.error('Could not get keys: ', err);
    //     $ionicHistory.goBack();
    //     return;
    //   }
    //   $scope.credentialsEncrypted = false;
    //   keys = k;
    //   $scope.setFlow();
    // });
    this.keys = null;

    this.deleted = this.isDeletedSeed();
    console.log(this.wallet);
    console.log(this.deleted);
  }

  ngOnInit() {
    this.currentIndex = this.slides.getActiveIndex() || 0;
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.slidePrev();
    }

  }

  setFlow = function(step) {
    // if (!this.keys) return;

    // var words = keys.mnemonic;
    var words = this.wallet.mnemonic;
    // $scope.data = {};

    // $scope.mnemonicWords = words.split(/[\u3000\s]+/);
    // $scope.shuffledMnemonicWords = shuffledWords($scope.mnemonicWords);
    // $scope.mnemonicHasPassphrase = $scope.wallet.mnemonicHasPassphrase();
    // $scope.useIdeograms = words.indexOf("\u3000") >= 0;
    // $scope.data.passphrase = null;
    // $scope.customWords = [];
    // $scope.step = step || 1;
    // $scope.selectComplete = false;
    // $scope.backupError = false;
    //
    // words = lodash.repeat('x', 300);
    // $timeout(function() {
    //   $scope.$apply();
    // }, 10);
  };

  mnemonicHasPassphrase() {
    return false;
  }

  isPrivKeyEncrypted() {
    return false;
  }

  isDeletedSeed() {
    if (!this.wallet.credentials.mnemonic && !this.wallet.credentials.mnemonicEncrypted)
      return true;

    return false;
  }

  slidePrev() {
    if (this.currentIndex == 0) this.navCtrl.pop();
    else {
      this.slides.slidePrev();
      this.currentIndex = this.slides.getActiveIndex();
    }
  }

  slideNext() {
    this.slides.slideNext();
    this.currentIndex = this.slides.getActiveIndex();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BackupGamePage');
  }

}
