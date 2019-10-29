import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { Http }from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UriProvider  } from '../../providers/uri/uri';
/**
 * Generated class for the ListWoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-wo',
  templateUrl: 'list-wo.html',
})
export class ListWoPage {
  items: any;
  loader: any;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public http: Http,
   public platform: Platform,
   public uri: UriProvider,
  public storage: Storage,

   public loadingCtrl: LoadingController
   ){
    this.platform.ready().then(() => {
      this.loading();
      this.storage.get('nik').then(val =>{
        console.log(this.uri.uri_api_alista+'ios/get_data_list_material.php?nik='+val);
        this.http.get(this.uri.uri_api_alista+'ios/get_data_list_material.php?nik='+val)
        .map(res => res.json())
        .subscribe(data =>{
          console.log(data);
          this.items = data;
          this.loader.dismiss();
        });
      });
    
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListWoPage');
  }

  loading(){
    this.loader = this.loadingCtrl.create({
      content: "please Wait.."
    })
    this.loader.present();
  }
}
