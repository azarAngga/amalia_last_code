import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { UriProvider  } from '../../providers/uri/uri';

import { LoadingController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

/**
 * Generated class for the BaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-ba',
  templateUrl: 'ba.html',
})
export class BaPage {

  nik: any;
  loader: any;
  
  items: any;
  search: any;
  json_data_vendor2: any;

  list: any;
  uri_app_amalia: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private transfer: FileTransfer,
    private fileOpener: FileOpener,
    private http: HTTP,
    //private androidPermissions: AndroidPermissions,
    public uri: UriProvider,
    private storage: Storage,
    public platform: Platform,
    public https: Http,
    public loadingCtrl: LoadingController,
    private file: File) {
    this.uri_app_amalia = this.uri.uri_app_amalia;
        this.platform.ready().then(() => {
            this.storage.get('nik').then((val) => {
              this.nik = val;  
              this.getlistBA(this.nik);
            });   
        })
	}

  getlistBA(nik){

    var ini = this.uri.uri_api_alista+'amalia_app/get_data_list_wo.php?nik='+this.nik;
    console.log(ini)
    this.http.get(ini, {}, {})
    .then(data => {

      this.list = JSON.parse(data.data);
      this.json_data_vendor2 = JSON.parse(data.data);
      this.initializeItems();
      var i = JSON.parse(data.data);
      console.log(i[0].no_wo);
      console.log(data.status);
      console.log(data.headers);

    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaPage');
  }

  initializeItems() {
    var arr = [];
    var ini = 0;
    while(ini < this.json_data_vendor2.length){
        arr.push(this.json_data_vendor2[ini]['no_wo']+"_"+this.nik+".pdf");
        ini++;
    }
    this.items = arr;
  }

  download(no_wo){
    this.loading();
    const fileTransfer: FileTransferObject = this.transfer.create();
    var no_w = no_wo.split("_");
    const url = this.uri.uri_api_alista+'ios/TCPDF/examples/isi_ba_v3.php?no_wo='+no_w[0];
    // const url = "https://alista.telkomakses.co.id/amalia/PDF_BA/2020_03_05/20200305502568311159015066.pdf";
    console.log(encodeURI(url));
    fileTransfer.download(encodeURI(url), this.file.externalRootDirectory + no_w[0]+"_"+this.nik+".pdf").then((entry) => { 
          this.fileOpener.open(this.file.externalRootDirectory + no_w[0]+"_"+this.nik+".pdf", 'application/pdf')
            .then(() => this.loader.dismiss())
            .catch(e => alert(e));
    }, (error) => {
      alert(error);
    });
  }

  loading(){
    this.loader = this.loadingCtrl.create({
      content: "please Wait.."
    })

    // execute loading 
    this.loader.present();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    //console.log("search"+this.items);
    console.log(val);
    // if the value is an empty strin g don't filter the items

    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        try{
           return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }catch(err){
           return "error"; 
        }
      })
    }
  }

}
