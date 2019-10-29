import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ModalNikBawahanPage } from '../modal-nik-bawahan/modal-nik-bawahan'; 
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the CreateWoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-wo',
  templateUrl: 'create-wo.html',
})
export class CreateWoPage {
	wo_number: any;
  date_wo: any;
	date1_v: any;
	nik_bawahan: any;
  searchModal: any;
  nik: any;
  witel: any;
  loader: any;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public modalCtrl: ModalController,
   public storage: Storage,
   public http: Http,
    public platform: Platform,
   public alertCtrl: AlertController,
   public loadingCtrl: LoadingController
   ){
      this.date_wo    = new Date().toISOString();
      var date1 = new Date();
      this.date1_v = date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();

      this.nik_bawahan = "-";
      this.platform.ready().then(() => {
        this.storage.get('nik')
        .then(val=>{
          this.nik = val;
        });

        this.storage.get('witel')
        .then(val =>{
          this.witel = val;
        });

      })
      

      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateWoPage');
  }

  onChange(ev: any) {
    console.log(ev);
    console.log(ev.year);
      this.date1_v = ev.year+"-"+ev.month+"-"+ev.day;
  }

  loading(){
    this.loader = this.loadingCtrl.create({
      content: "please Wait.."
    })
  }

  showModel(){
    this.searchModal = this.modalCtrl.create(ModalNikBawahanPage);
    this.searchModal.onDidDismiss(data => {
        this.storage.get('bawahan')
        .then((val) => {
          console.log("dismiss",val);
          this.nik_bawahan = val;
        });
    });
    this.searchModal.present();
  }

  SubmitWo(){
    if(this.nik_bawahan != "-"){
      this.loading();
      console.log('http://api.telkomakses.co.id/API/amalia/put_wo_number.php?'+
        'niktl='+this.nik+
        '&nikBawahan='+this.nik_bawahan+
        '&date='+this.date1_v+
        '&wo='+this.wo_number+'&witel='+this.witel);
      this.http.get('http://api.telkomakses.co.id/API/amalia/put_wo_number.php?'+
        'niktl='+this.nik+
        '&nikBawahan='+this.nik_bawahan+
        '&date='+this.date1_v+
        '&wo='+this.wo_number+'&witel='+this.witel)
      .map(res => res.json())
      .subscribe(data =>{
        console.log("response",data.message);
         if(data.status == 'gagal'){
            this.showAlert(data.message);
         }else{
            this.showAlert(data.message);
            this.wo_number = "";
            this.nik_bawahan = "-";
         } 

         this.loader.dismiss();
      });
    }else{
      this.showAlert("Isi terlebih dahulu nik Naker");
    }
  }

  showAlert(x) {
    let alert = this.alertCtrl.create({
      title: 'response server',
      subTitle: x,
      buttons: ['OK']
    });
    alert.present();
  }

}
