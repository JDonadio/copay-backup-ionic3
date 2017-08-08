import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Navbar } from 'ionic-angular';
import * as _ from 'lodash';

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
  public shuffledMnemonicWords: Array<any>;
  public passphrase: String;
  public customWords: Array<any>;
  public selectComplete: boolean;
  public error: boolean;

  private keys: any;
  private useIdeograms: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // TODO replace for the original wallet object
    this.wallet = {
      name: 'Wallet name',
      credentials: {
        mnemonic: 'uno dos tres cuatro cinco seis siete ocho nueve diez once doce',
        mnemonicEncrypted: false,
      },
      n: 1,
      // isPrivKeyEncrypted: this.isPrivKeyEncrypted(),
      // mnemonicHasPassphrase: this.mnemonicHasPassphrase(),
      isPrivKeyEncrypted: false,
      mnemonicHasPassphrase: false,
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
    //   $scope.initFlow();
    // });
    this.keys = null;

    // this.deleted = this.isDeletedSeed();
    this.deleted = false;
  }

  ngOnInit() {
    this.currentIndex = 0;
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.slidePrev();
    }
    this.initFlow();
  }

  initFlow() {
    // if (!this.keys) return;

    // var words = keys.mnemonic;
    var words = this.wallet.credentials.mnemonic;
    // $scope.data = {};

    this.mnemonicWords = words.split(/[\u3000\s]+/);
    this.shuffledMnemonicWords = this.shuffledWords(this.mnemonicWords);
    this.useIdeograms = words.indexOf("\u3000") >= 0;
    this.passphrase = null;
    this.customWords = [];
    this.selectComplete = false;
    this.error = false;

    // words = _.repeat('x', 300);
  };

  shuffledWords(words: Array<String>) {
    var sort = _.sortBy(words);

    return _.map(sort, (w) => {
      return {
        word: w,
        selected: false
      };
    });
  };

  finalStep() {
    // ongoingProcess.set('validatingWords', true);
    this.confirm((err) => {
      // ongoingProcess.set('validatingWords', false);
      if (err) {
        this.backupError(err);
      }
      setTimeout(() => {
        this.showBackupResult();
        return;
      });
    });
  };

  addButton(index: number, item: any) {
    var newWord = {
      word: item.word,
      prevIndex: index
    };
    this.customWords.push(newWord);
    this.shuffledMnemonicWords[index].selected = true;
    this.shouldContinue();
  };

  removeButton(index: number, item: any) {
    // if ($scope.loading) return;
    this.customWords.splice(index, 1);
    this.shuffledMnemonicWords[item.prevIndex].selected = false;
    this.shouldContinue();
  };

  shouldContinue() {
    if (this.customWords.length == this.shuffledMnemonicWords.length)
      this.selectComplete = true;
    else
      this.selectComplete = false;
  };

  confirm(cb: Function) {
    this.error = false;

    var customWordList = _.map(this.customWords, 'word');

    if (!_.isEqual(this.mnemonicWords, customWordList)) {
      return cb('Mnemonic string mismatch');
    }

    setTimeout(() => {
      // if (this.mnemonicHasPassphrase) {
      //   var walletClient = bwcService.getClient();
      //   var separator = this.useIdeograms ? '\u3000' : ' ';
      //   var customSentence = customWordList.join(separator);
      //   var passphrase = this.data.passphrase || '';
      //
      //   try {
      //     walletClient.seedFromMnemonic(customSentence, {
      //       network: this.wallet.credentials.network,
      //       passphrase: passphrase,
      //       account: this.wallet.credentials.account
      //     });
      //   } catch (err) {
      //     walletClient.credentials.xPrivKey = _.repeat('x', 64);
      //     return cb(err);
      //   }
      //
      //   if (walletClient.credentials.xPrivKey.substr(walletClient.credentials.xPrivKey) != keys.xPrivKey) {
      //     delete walletClient.credentials;
      //     return cb('Private key mismatch');
      //   }
      // }

      // profileService.setBackupFlag($scope.wallet.credentials.walletId);
      return cb();
    });
  };

  backupError(err: any) {
    // ongoingProcess.set('validatingWords', false);
    console.log('Failed to verify backup: ', err);
    this.error = true;
  };

  showBackupResult() {
    if (this.error) {
      var title = "Uh oh...";
      var message = "It's important that you write your backup phrase down correctly. If something happens to your wallet, you'll need this backup to recover your money. Please review your backup and try again.";
      // popupService.showAlert(title, message, function() {
      //   $scope.initFlow(2);
      // })
      console.log(title, message);
    } else {
      // this.openConfirmBackupModal();
      console.log('###ASD');
    }
  };

  /*********************************
  * Hardcoded methods
  */

  mnemonicHasPassphrase() {
    return false;
  }

  isPrivKeyEncrypted() {
    return false;
  }

  /*
  * Hardcoded methods
  *********************************/

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

    if (this.currentIndex == 2) {
      if (!this.mnemonicHasPassphrase)
        this.finalStep();
      else
        this.slideNext();
    }
    if (this.currentIndex == 3)
      this.finalStep();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BackupGamePage');
  }

}
