import { Component,ViewChild,Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Pemakaian4Page} from'../pemakaian4/pemakaian4';
import {  MaterialPage } from'../material/material';
import { FotoPage} from'../foto/foto';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import * as $ from 'jquery';
import { UriProvider  } from '../../providers/uri/uri';
import { Http, Headers, RequestOptions } from '@angular/http';

//declare var $: $;
//import jQuery from "jquery";

/**
 * Generated class for the Pemakaian3Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-pemakaian3',
  templateUrl: 'pemakaian3.html',
})
export class Pemakaian3Page {
    @ViewChild('atri') atri;
    @ViewChild('stb1') stb1;

 	sn_ont: any;
 	sn_modem: any;
 	modem: any;
 	power: any;
 	dsl: any;
 	internet: any;
 	mac_address: any;
  sn_plc: any;
  sn_wifi_extender: any;
  psb_before: any= 0;
  migrasi_before: any= 0;
  tambahan_before: any= 0;
  speed_before: any= 0;

  speed_other: any;
 	nama: any;
 	notel_teknisi: any;
 	psb: any;
 	migrasi: any;
 	tambahan: any;
 	speed: any;

 	other: any;
  atribut: any;
 	other_view: any = 0;
  //atribut: any = 1;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   private storage: Storage,
   public http: Http,
   public uri: UriProvider,
   private barcodeScanner: BarcodeScanner,
   public alertCtrl: AlertController,
   private renderer: Renderer2) {


  }

  ngAfterViewInit() {
    //declare var $: $;
    //document.getElementById('atribut');
   // $("#atribut").val("test")
   //         //console.log();
   // // alert(input);
       
  }


// changeColor(){ $('#xn').text('white'); }

 scanSeconStb(){
  //declare var $: $;
  //alert($("#atribut").val());
    //alert("test");
    this.barcodeScanner.scan().then((barcodeData) => {
       // Success! Barcode data is here
       var atribut = $("#atribut").val();
      // this.renderer.setProperty(this.stb1.nativeElement, 'value', 'test');
       $("#txt_"+atribut).val(barcodeData.text);
       this.mac_address = barcodeData.text;
      }, (err) => {
        alert(err);
      });
 }

  actionScanOnt(){
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     this.sn_ont = barcodeData.text;
    }, (err) => {
      alert(err);
    });
  }

  actionModem(){
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     this.sn_modem = barcodeData.text;
    }, (err) => {
      alert(err);
    });
  }
  
  actionMac(){
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     this.mac_address = barcodeData.text;
    }, (err) => {
      alert(err);
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Pemakaian3Page');
  }


  psbClick(val: any){
      if(val == this.psb_before){
        this.psb_before = 0;
        this.psb = 0;
      }else{
        this.psb_before = val;
      }
  }
  
  migrasiClick(val: any){
      if(val == this.migrasi_before){
        this.migrasi_before = 0;
        this.migrasi = 0;
      }else{
        this.migrasi_before = val;
      }
  }

  tambahanClick(val: any){
      if(val == this.tambahan_before){
        this.tambahan_before = 0;
        this.tambahan = 0;
      }else{
        this.tambahan_before = val;
      }
  }
  
  speedClick(val: any){
      if(val == this.speed_before){
        this.speed_before = 0;
        this.speed = 0;
      }else{
        this.speed_before = val;
      }
  }

  actionWifi(){
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     this.sn_wifi_extender = barcodeData.text;
    }, (err) => {
      alert(err);
    });
  }

  actionPlc(){
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     this.sn_plc = barcodeData.text;
    }, (err) => {
      alert(err);
    });
  }

  checkPaket(data_var){
    var data_2 = JSON.stringify(data_var);

    console.log(this.uri.uri_api_alista+"amalia_app/check_layanan.php?data="+data_2);
    this.http.get(this.uri.uri_api_alista+"amalia_app/check_layanan.php?data="+data_2)
      .map(res => res.json())
      .subscribe(data => {

        if(data.status == "ok"){
          this.storage.set('data2',data_var);
          this.navCtrl.push(MaterialPage);
        }else{
          //this.psb = "0";
          //this.migrasi = "0";
          alert(data.message);
        }

      });
  }


  actionNext(){

    var stb = [];
    if(this.no_row > 0){
      var no = 1;
      
      while(no <= this.no_row){
          stb.push($('#txt_'+no).val());
          no++;
        }
    }
        var data2 = {
            sn_ont:this.sn_ont,
            sn_modem:this.sn_modem,
            modem:this.modem,
            power:this.power,
            dsl:this.dsl,
            sn_plc:this.sn_plc,
            sn_wifi_extender:this.sn_wifi_extender,
            internet:this.internet,
            mac_address:this.mac_address,
            nama:this.nama,
            notel_teknisi:this.notel_teknisi,
            psb:this.psb,
            migrasi:this.migrasi,
            tambahan: this.tambahan,
            speed:this.speed,
            other_speed:this.speed_other,
            stb:stb
          }
          this.checkPaket(data2);
           
  }

  no_row: any = 0;
  arr_material: any= [];

  newElement(){
    this.no_row = this.no_row+1;
    var no = this.no_row;
    var data = this.arr_material;
    var no_ = 0;
    var str_app = "";

    if(no <= 3){
      $('#parent').append('<div id="el'+no+'"><table><tr><td><button id="btn_'+no+'" class="button"><div><img src="scan_barcode.png"/></div></button></td><td> <input placeholder="tulis disini" id="txt_'+no+'" type="text"/></td></tr></table><br/></div>');
      
      $("#btn_"+no).click(function() {
            $("#atribut").val(no);
            $("#k").click();
          });
   }else{
    alert("Maksimal STB hanya 3 saja");
    this.no_row = 3;
   }
  }

  removeElememt(){
    var no = this.no_row;
    //alert(x);
    $('#el'+no).remove();
    this.no_row = this.no_row-1;
    if(this.no_row < 0){
      this.no_row = 0;
    }
  }

  actionBack(){
  	this.navCtrl.pop();
  }

  actionChangeKecepatan(x){
  	if(x == 'other'){
  		this.other_view = 1;
  	}else{
  		this.other_view = 0;
  	}
  }

  // ngAfterViewInit(){
  //   //this.newElement()
  //   this.no_row = this.no_row+1;
  //   var no = this.no_row;
  //   var data = this.arr_material;
  //   var no_ = 0;
  //   var str_app = "";

  //   if(no <= 3){
  //     $('#parent').append('<div id="el'+no+'"><table><tr><td><button id="btn_'+no+'" class="button"><div><img src="scan_barcode.png"/></div></button></td><td> <input placeholder="tulis disini" id="txt_'+no+'" type="text"/></td></tr></table><br/></div>');
      
  //     $("#btn_"+no).click(function() {
  //           $("#atribut").val(no);
  //           $("#k").click();
  //         });
  //  }else{
  //   alert("Maksimal STB hanya 3 saja");
  //   this.no_row = 3;
  //  }

  // }

  showAlert(x){
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: x,
      buttons: ['OK']
    });
    alert.present();
  }



}
