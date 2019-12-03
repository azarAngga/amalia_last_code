import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { UriProvider  } from '../../providers/uri/uri';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the MitraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-mitra',
  templateUrl: 'mitra.html',
})

export class MitraPage {
  nama_mitra: any;
  items: any;
  loader: any;
  search: any;
  no_wo: any;
  nik: any;
  sto: any;
  witel: any;
  string_placeholder: any;
  json_data_vendor2: any;
  constructor(public navCtrl: NavController,public uri: UriProvider,public platform: Platform,public loadingCtrl: LoadingController, public navParams: NavParams,public http: Http,public viewCtrl: ViewController) {
    this.platform.registerBackButtonAction(() => {}) 
    console.log('sto', navParams.get('sto'));
      this.sto = navParams.get('sto');
      this.witel = navParams.get('witel'); 
      this.nik = navParams.get('nik'); 
      if(this.sto == "witel"){
        this.string_placeholder = "Witel";
      }else if( this.sto == "sto"){
        this.string_placeholder = "STO";
      }else if(this.sto == "mitra"){
        this.string_placeholder = "Mitra";
      }else if(this.sto == "no_wo"){
        this.string_placeholder = "SC / Inet / Notel";
      }
	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MitraPage');
  }

  loadData(){
    let url = ""
    if(this.sto == "no_wo"){
      //url = this.uri.uri_app_amalia+"/telkom_no_wo.php?no_wo="+this.search+"&nik="+this.nik;
      url = "http://10.204.100.243/ibooster/telkom_no_wo.php?no_wo="+this.search+"&nik="+this.nik;
    }else{
       url = this.uri.uri_api+"master/get_data_all_master_mitra.php?nama="+this.search+"&jenis="+this.sto+"&witel="+this.witel;
    }
    
     console.log(url);
      this.loading();
      this.http.get(url)
      .map(res => res.json())
      .timeout(30000)
      .subscribe(data => {
        if(this.sto == "no_wo"){
          this.json_data_vendor2 = data.data;
          this.initializeItems();
        }else{
          this.json_data_vendor2 = data.mitra;
          this.initializeItems();
         
        }

        this.loader.dismiss();
      	
      },error => {
				alert(error)
				this.loader.dismiss();
			});
  }

  initializeItems() {
    this.items = this.json_data_vendor2;
  }

  searchAction(){
    this.loadData();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    //console.log("search"+this.items);

    // if the value is an empty string don't filter the items

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

 dismiss(x) {
   let data = { 'data': x,'jenis':this.sto };
   this.viewCtrl.dismiss(data);
 }

 dismiss_wo(no_wo: any,no_telfon: any,nama: any,alamat: any,sto : any){
  let no_inet = ""
  if( (this.search).substring(0,1,1) == "1" && this.search.length == 12){
    no_inet = this.search
 }

  let isi = {
    no_wo: this.search,
    no_telfon: no_telfon,
    nama: nama,
    alamat: alamat,
    no_inet: no_inet,
    sto:sto
  }

  let data = { 'data': isi,'jenis':this.sto };
  this.viewCtrl.dismiss(data);
 }

 loading(){
      this.loader = this.loadingCtrl.create({
        content: "please Wait.."
      })

      // execute loading 
      this.loader.present();
    }

  
}
