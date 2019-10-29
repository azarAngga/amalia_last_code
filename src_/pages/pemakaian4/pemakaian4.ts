import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController,Platform } from 'ionic-angular';
import {SignaturePage} from '../signature/signature'
import {DenahPage} from '../denah/denah'
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import 'rxjs/add/operator/map';
import { UriProvider  } from '../../providers/uri/uri';
import { AlertController } from 'ionic-angular';
import { PemakaianPage } from '../pemakaian/pemakaian';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LoadingController } from 'ionic-angular';
import { map } from "rxjs/operators/map";
import { FotoPage } from '../foto/foto';


/**
 * Generated class for the Pemakaian4Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-pemakaian4',
  templateUrl: 'pemakaian4.html',
})
export class Pemakaian4Page {

  kendala: any;
  loader_gif: any = 'off';
  alasan_decline: any ;
  harga: any ;
  harga_view: any;
  menggunakan_isp_view: any;
  public signatureImage1 : any;
  public signatureImage2 : any;
  public denah : any;
  signatureImage: any;
  data: any;
  data2: any;
  data3: any;
  uri_api_alista: any;
  uri_app_amalia: any;
  uri_api_wimata: any;
  nik: any;
  tanggal_ttd: any
  loader: any;
  generate: any = "on";

  sum_denah: any = 0;
  sum_mitra: any = 0;
  sum_pelanggan: any = 0;

  nama_signature: any;
  tempat_ttd: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public TransferObject: FileTransferObject,
    private transfer: FileTransfer,
    private screenOrientation: ScreenOrientation,
    public http: Http,
    public platform: Platform,
    public uri: UriProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalController:ModalController,
    public viewCtrl: ViewController) {

    this.platform.ready().then(() => {

        this.storage.get('nik').then((val) => {
        this.nik = val;  
    	  var date = new Date();

        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var millisecond = date.getMilliseconds();

        this.tanggal_ttd = day+"-"+month+"-"+year;

        this.nama_signature = year+""+month+""+day+""+hours+""+minutes+""+seconds+""+millisecond+""+this.nik;
        console.log(this.nama_signature);
        this.uri_api_alista = this.uri.uri_api_alista;
        this.uri_app_amalia = this.uri.uri_app_amalia;
        this.uri_api_wimata = this.uri.uri_api_wimata;
          this.storage.get('data').then((val) => {
            this.data = val;
          });

          this.storage.get('data2').then((val) => {
            this.data2 = val;
          });

          this.storage.get('data3').then((val) => {
            console.log('con', val);
            this.data3 = val;
          });
        });
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pemakaian4Page');
  }

  openSignatureModel1(){
       let modal1 = this.modalController.create(SignaturePage);
        this.sum_pelanggan++;
        modal1.onDidDismiss(data => {
          console.log(data);
          this.loading();
         this.signatureImage1 = data.signatureImage;
         console.log(data.signatureImage);
         this.sendPostRequest(this.signatureImage1,this.nama_signature+"_1_"+this.sum_pelanggan+".png");
       });
      modal1.present();
  }

  openSignatureModel2(){
      let modal2 = this.modalController.create(SignaturePage);
      this.sum_mitra++;
      modal2.onDidDismiss(data =>{
       	  this.loading();
          this.signatureImage2 = data.signatureImage;
          this.sendPostRequest(this.signatureImage2,this.nama_signature+"_2_"+this.sum_mitra+".png");
       });
      modal2.present();
  }

  openModalDenah(){
       let modal3 = this.modalController.create(DenahPage);
       this.sum_denah++;
       modal3.onDidDismiss(data =>{
        this.loading();
        this.denah = data.signatureImage;
        this.sendPostRequest(this.denah,this.nama_signature+"_denah_"+this.sum_denah+".png");
       });
      modal3.present();
  }

  actionPut(){ 
    if(this.tempat_ttd == undefined){
        this.showAlert("Kolom Kota tidak boleh kosong");
    }else if(this.signatureImage1 == undefined){
        this.showAlert("Tanda tangan pelanggan tidak boleh kosong");
    }else if(this.signatureImage2 == undefined){
        this.showAlert("Tanda tangan pelanggan tidak boleh kosong");
    }else{
      var data4 = {
            nik:this.nik,
            kendala:this.kendala,
            alasan_decline:this.alasan_decline,
            harga:this.harga,
            tempat_ttd:this.tempat_ttd,
            harga_view:this.harga_view,
            menggunakan_isp_view:this.menggunakan_isp_view,
            url_ttd_pelanggan:this.nama_signature+"_1_"+this.sum_pelanggan+".png",
            url_ttd_mitra:this.nama_signature+"_2_"+this.sum_mitra+".png",
            denah:this.nama_signature+"_denah_+"+this.sum_denah+".png",}

            this.storage.set('data4',data4);
            this.navCtrl.push(FotoPage);

    }
  }

  upload(nama,path){
    console.log("test");
      var options = {
        fileKey: "file",
        fileName: nama,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'fileName': nama}
      };
     
      var url = this.uri.uri_prod_upload+"upload.php";
      console.log(url);
      const fileTransfer: FileTransferObject = this.transfer.create();
    
      //Use the FileTransfer to upload the image
      fileTransfer.upload(path, url, options).then(data => {
      	this.loader.dismiss();
        console.log("berhasil berhasil uye :"+JSON.stringify(data));
      }, err => {
      	this.loader.dismiss();
        console.log("ddd");
        console.log("error",err);
        alert(err);
      });
  }

  showAlert(x){
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: x,
      buttons: ['OK']
    });
    alert.present();
  }

  //  showConfirm() {

  //   let confirm = this.alertCtrl.create({
  //     title: 'Sertakan email pelanggan ',
  //     inputs: [
  //       {
  //         name: 'email',
  //         placeholder: 'masukan email pelanggan (Wajib)'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: () => {
  //           console.log('Disagree clicked');
  //         }
  //       },
  //       {
  //         text: 'OK',
  //         handler: (data) => {


            
  //           var ini = this.uri.uri_api_alista+"amalia_app/put_data_pemakaian2.php?halaman1="+
  //           js+"&halaman2="+
  //           js2+"&halaman3="+
  //           js3+"&halaman4="+
  //           js4+"&versi="+
  //           this.uri.versi;
  //           console.log(ini);   
  //           this.http.get(ini)
  //             .map(res => res.json())
  //             .subscribe(data => {
  //               this.loader.dismiss();
  //               this.loader_gif = 'off';
  //               if(data.status == "ok"){
  //                   this.showAlert(data.message);
  //                   this.navCtrl.setRoot(PemakaianPage);
  //               }else{
  //                 this.loader_gif = 'off';
  //                 this.showAlert(data.message);
  //               }
  //             },error =>{
  //                  this.loader_gif = 'off';
  //                  console.log('error put '+error);
  //             });

  //           console.log('Agree clicked');
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }

  actionBack(){
    this.navCtrl.pop();
  }

   showPromptDialog() {
    let prompt = this.alertCtrl.create({
      title: 'Email pelanggan',
      message: "Isi email pelanggan ..",
      inputs: [
        {
          name: 'email',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'submit',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  loading(){
  	this.loader = this.loadingCtrl.create({
  		content: "please Wait.."
  	})
  	// execute loading 
  	this.loader.present();
  }

   sendPostRequest(data,nama){
     var link = 'http://alista.telkomakses.co.id/amalia/upload_base64.php';
     var myData = JSON.stringify({data: data,nama: nama});
     
     console.log(myData);
     this.http.post(link, myData)
     .subscribe(data => {
      this.loader.dismiss();
     }, error => {
      alert(error);
      this.loader.dismiss();
     console.log("Oooops!");
     });
   }

   actionGenerate(){
    this.generate = "off";
    var js = this.data;
    var ini = this.uri.uri_api_alista+"amalia_app/push_sms_client.php?nik="+this.nik+"&no_wo="+js.no_permintaan+"&versi="+this.uri.versi+"&nomor="+js.no_kontak;
    console.log(ini);   
    this.loading();
    this.http.get(ini)
      .map(res => res.json())
      .subscribe(data => {
        this.loader.dismiss();
        if(data.status == "T"){
            alert("setelah muncul pesan ini OTP sedang di generate,mintalah kode pada pelanggan kode di kirim melalui nomor kontak pelanggan yang di inputkan pada halaman-1, masukan kode saat setelah kode submit di kolom OTP");
        }else{
          this.showAlert(data.message);
        }
      },error =>{
           console.log('error put '+error);
      });
   }


}
