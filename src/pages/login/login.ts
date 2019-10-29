import { Component } from '@angular/core';
import { NavController, NavParams , Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import { ListWoPage } from '../list-wo/list-wo';
import { UriProvider  } from '../../providers/uri/uri';
import { Device } from '@ionic-native/device';
import { PemakaianPage } from '../pemakaian/pemakaian';
import { BaPage } from '../ba/ba';
import { HTTP } from '@ionic-native/http';
import { AndroidPermissions } from '@ionic-native/android-permissions';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: any;
  password: any;
  uri_api_amalia: any;
  items: any;
  versi: any;
  rootPage: any = LoginPage;
  loader: any;
  pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public http: HTTP,
  public http2: Http,
  public alertCtrl: AlertController,
  public loadingCtrl: LoadingController,
  public storage: Storage,
  public device: Device,
  public platform: Platform,
  public uri: UriProvider,
  private androidPermissions: AndroidPermissions,
  public events: Events) 
  {
    this.uri_api_amalia = this.uri.uri_api_amalia;
    this.versi = this.uri.versi;
    this.setData("nok");
    this.pages = [];
    this.events.publish('menu:tampil', this.pages);
    this.events.publish('menu:tampilNama',"","","hana_splashx3.png");
      this.platform.ready().then(() => {
        // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        //   result =>{
        //       this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
        //   },
        //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
        // );

        // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
        //   result =>{
        //       this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
        //       this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
        //           },
        //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
        // );

        // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
        //   result =>{
        //       this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
        //           },
        //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
        // );

        

      })
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad LoginPage');
  }

  putLogin(){
    if(this.username != null && this.password != null && this.username != "" && this.password != ""){
        this.presentLoading();
        //console.log('http://10.40.108.153/api_test/amalia/login.php?username='+this.username+'&password='+this.password);
        //this.http.get('http://apps.telkomakses.co.id/hana/ios/get_data_hana_login_default.php?username='+this.username+'&password='+this.password).map(res => res.json()).subscribe(data => {
        this.http2.get(this.uri_api_amalia+'get_data_hana_login_default.php?username='+this.username+'&password='+this.password+"&versi="+this.uri.versi).map(res => res.json()).subscribe(data => {
        //this.http.get('http://10.40.108.153/api_test/amalia/login.php?username='+this.username+'&password='+this.password).map(res => res.json()).subscribe(data => {
         this.items = data;
         console.log(this.items);

         // this.loadMenu();
         //    this.setFoto(this.items.result[0].foto);
         //    this.events.publish('menu:tampil', this.pages);
         //    this.loadMenu();
         //    this.setData("oke");
         //    this.setNik(this.username); 
         //    //this.setNik('16940495');

         //    this.navCtrl.setRoot(HomePage);
         //    this.loader.dismiss();

         if(this.items.result[0].status != ""){
          if(this.items.result[0].status == "sukses"){
            this.loadMenu();
            this.setFoto(this.items.result[0].foto);
            this.events.publish('menu:tampil', this.pages);
            this.loadMenu();
            //this.setData("oke");
            this.setNik(this.username); 
            //this.setNik('16940495');

            this.navCtrl.setRoot(PemakaianPage);
            this.loader.dismiss();
         }else{
          //cheat
          //this.navCtrl.setRoot(HomePage);
          //this.setNik('15980003');
          //--

            this.showAlert(this.items.result[0].message);
            this.loader.dismiss();
         }
       }

        });
    }else{
        //   this.http2.get("https://api.telkomakses.co.id/API/amalia/get_data_hana_login_default.php?username=15892288&password=a").map(res => res.json()).subscribe(data => {
        //   //this.http.get('http://10.40.108.153/api_test/amalia/login.php?username='+this.username+'&password='+this.password).map(res => res.json()).subscribe(data => {
        //  alert(data);
        // });
         this.showAlert("username dan password tidak boleh kosong");
    }

    
  }

   showAlert(x) {
    let alert = this.alertCtrl.create({
      title: 'Mohon Maaf',
      subTitle: x,
      buttons: ['OK']
    });
    alert.present();
  }


  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();

  }

  setData(x){
    console.log("set data set");
    this.storage.set('session',x);
  }

  setFoto(x){
    this.storage.set('foto',x);
  }

  setNik(x){
    this.storage.set('nik',x);
  }

  loadMenu(){
    this.pages = [
        { title: 'Update Material Alista', component: HomePage },
        { title: 'List Stok Barang', component: ListWoPage },
         { title: 'Create BA Digital', component: PemakaianPage },
        { title: 'List BA Digital', component: BaPage },
        { title: 'Logout', component: LoginPage }
    ];
  }

  testHttp(){
    this.http.get('http://api.telkomakses.co.id/API/amalia/test.php', {}, {})
    .then(data => {

      alert(data.data);  
      console.log(data.status);
      console.log(data.data); // data received by server
      console.log(data.headers);

    })
    .catch(error => {

      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);

    });
  }



}
