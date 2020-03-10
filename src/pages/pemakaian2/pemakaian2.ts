import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FotoPage } from '../foto/foto';
import { AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import {  UriProvider } from "../../providers/uri/uri";
import 'rxjs/add/operator/timeout';
import { error } from 'util';

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
	test_voice: any ;
	test_internet: any;
	test_use_tv: any ;

	test_ping: any;
	test_upload: any;
	test_download: any;
	hasil_ukur: any;

	psb: any;
	migrasi: any;
	catatan_khusus_new: any;
	catatan_khusus_new_val: any;
	

	internet_before: any= -1;
	voice_before: any= -1;
	usee_before: any= -1;


	catatan_khusus: any;
	other: any = "";

	test_voice_val: any = "";
	test_internet_val: any = "";
	test_use_tv_val: any = "";

	other_view: any = 0;
	data_layanan: any;
	loader: any;

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public http: Http,
		public loadingCtrl: LoadingController,
		public uri:  UriProvider,
		public alertCtrl: AlertController,
		private storage: Storage){

			this.storage.get("data2").then((val)=>{
				this.psb = val.psb
				//alert(val.psb)
				this.migrasi = val.migrasi
				this.data_layanan = val
			})

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad Pemakaian2Page');
	}

	actionNext(){

		// if(this.test_voice_val == ""){
		// 	this.showAlert("Test Voice tidak boleh kosong");
		// }else if(this.test_internet_val == ""){
		// 	this.showAlert("Test Internet tidak boleh kosong");
		// }else if(this.test_use_tv_val == ""){
		// 	this.showAlert("Test USEE TV tidak boleh kosong");
		// }else if(this.test_ping == undefined){
		// 	this.showAlert("Test Ping tidak boleh kosong");
		// }else if(this.test_upload == undefined){
		// 	this.showAlert("Test Upload tidak boleh kosong");
		// }else if(this.test_download == undefined){
		// 	this.showAlert("Test Download tidak boleh kosong");
		// }else if(this.hasil_ukur == undefined){
		// 	this.showAlert("Hasil Ukur tidak boleh kosong");
		// }else{
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
				'other_catatan':this.other,
				'catatan_khusus_new':this.catatan_khusus_new,
				'catatan_khusus_new_val':this.catatan_khusus_new_val	
			}

			this.storage.set('data4',data);
			
			let data1 = JSON.stringify(this.data_layanan)
			let data2 = JSON.stringify(data)
			this.loading();
			console.log(this.uri.uri_api_alista+"amalia_app/check_test_layanan.php?layanan="+data1+"&test_layanan="+data2)
			this.http.get(this.uri.uri_api_alista+"amalia_app/check_test_layanan.php?layanan="+data1+"&test_layanan="+data2)
			.map(res => res.json())
			.timeout(30000)
			.subscribe(
				data => {
				this.loader.dismiss();
				if(data.status == "ok"){
					this.navCtrl.push(FotoPage);
				}else{
				//this.psb = "0";
				//this.migrasi = "0";
				alert(data.message);
				}
			},error => {
				alert("Koneksi terputus mohon coba lagi");
				this.loader.dismiss();
			}
			
			);


		// }

	  }

	changeCatatanKhusus(x){
		if(x == '3'){
			this.other_view = 1;
		}else{
			this.other_view  = 0;
		}
	}

	voiceClick(val: any){
		if(val == this.voice_before){
		  this.voice_before = -1;
		  this.test_voice = -1;
		}else{
		  this.voice_before = val;
		}
	}

	internetClick(val: any){
		if(val == this.internet_before){
		  this.internet_before = -1;
		  this.test_internet = -1;
		}else{
		  this.internet_before = val;
		}
	}

	useeClick(val: any){
		if(val == this.usee_before){
		  this.usee_before = -1;
		  this.test_use_tv = -1;
		}else{
		  this.usee_before = val;
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

	loading(){
		this.loader = this.loadingCtrl.create({
		  content: "please Wait.."
		})
		// execute loading 
		this.loader.present();
	  }
	
	// catatan(){
	// 	// alert(this.catatan_khusus_new)
	// 	if(this.catatan_khusus_new == "true"){

	// 	}
	// }

}
