import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Http }from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from'@ionic/storage';


/**
 * Generated class for the ModalNikBawahanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-nik-bawahan',
  templateUrl: 'modal-nik-bawahan.html',
})
export class ModalNikBawahanPage {
items: any;
data_json: any;
find: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public view: ViewController,public storage: Storage) {
  	 // constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
    this.storage.set('bawahan','-');
    this.storage.get('witel')
    .then(data =>{
      console.log("witel",data);
    })
  }
  
  ionViewDidLoad(){
    console.log('ionViewDidLoad ModalNikBawahanPage');
  }

  dismissItem(nik,nama){
      this.setNikNamaBawahan(nama+" - "+nik);
      this.view.dismiss();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      if(isNaN(val)){
        this.items = this.items.filter((x) => {
          console.log("pass find",x.nama.toLowerCase().indexOf(val.toLowerCase()));
             return (x.nama.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }else{
        this.items = this.items.filter((x) => {
          console.log("pass find",x.nama.toLowerCase().indexOf(val.toLowerCase()));
             return (x.nik.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
  }

  setNikNamaBawahan(nik_nama){
      this.storage.set('bawahan',nik_nama);
  }

    initializeItems() {
    this.items = this.data_json;
  }

  findActon(){
      this.storage.get('witel')
      .then(val =>{
          console.log('http://api.telkomakses.co.id/API/amalia/get_data_witel.php?nik='+this.find+"&witel="+val);
          this.http.get('http://api.telkomakses.co.id/API/amalia/get_data_witel.php?nik='+this.find+"&witel="+val)
            .map(res => res.json())
            .subscribe(data =>{
              console.log(data);
              this.items = data;
              this.data_json = data;
          });
      });

  }

}
