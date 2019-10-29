import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Pemakaian3Page } from '../pemakaian3/pemakaian3';
import { AlertController } from 'ionic-angular';	
/**
 * Generated class for the Pemakaian2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-pemakaian2',
  templateUrl: 'pemakaian2.html',
})
export class Pemakaian2Page {
	test_voice: any = '1';
	test_internet: any = '1';
	test_use_tv: any = '1';

	test_ping: any;
	test_upload: any;
	test_download: any;
	hasil_ukur: any;

	catatan_khusus: any ="1";
	other: any = "";

	test_voice_val: any = "";
	test_internet_val: any = "";
	test_use_tv_val: any = "";

	other_view: any = 0;

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController,
		private storage: Storage) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad Pemakaian2Page');
	}

	actionNext(){
		if(this.test_ping == undefined){
			this.showAlert("Test Ping tidak boleh kosong");
		}else if(this.test_upload == undefined){
			this.showAlert("Test Upload tidak boleh kosong");
		}else if(this.test_download == undefined){
			this.showAlert("Test Download tidak boleh kosong");
		}else if(this.hasil_ukur == undefined){
			this.showAlert("Hasil Ukur tidak boleh kosong");
		}else{
			var data = {
				'test_voice':this.test_voice,
				'test_internet':this.test_internet,
				'test_use_tv':this.test_use_tv,
				'test_ping':this.test_ping,
				'test_upload':this.test_upload,
				'test_download':this.test_download,
				'hasil_ukur':this.hasil_ukur,
				'catatan_khusus':this.catatan_khusus,
				'test_voice_val':this.test_voice_val,
				'test_internet_val':this.test_internet_val,
				'test_use_tv_val':this.test_use_tv_val,
				'other_catatan':this.other
			}

		  	this.storage.set('data2',data);
		  	this.navCtrl.push(Pemakaian3Page);
		}

	  }

	changeCatatanKhusus(x){
		if(x == '3'){
			this.other_view = 1;
		}else{
			this.other_view  = 0;
		}
	}


	actionBack(){
		this.navCtrl.pop();
	}

 	showAlert(x){
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: x,
        buttons: ['OK']
      });
      alert.present();
    }

}
