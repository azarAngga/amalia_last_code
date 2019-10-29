import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController ,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage' 
import { SignaturePage } from '../signature/signature'
import { Http } from '@angular/http'

/**
 * Generated class for the ResumePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resume',
  templateUrl: 'resume.html',
})
export class ResumePage {

  sum_pelanggan: any;
  signatureImage1 : any;
  loader: any;
  signatureImage2: any;
  sum_mitra: any;
  nama_signature: any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public loadingCtrl: LoadingController,
     public modalController: ModalController,
     public storage: Storage,
     public http: Http
     ){
       this.storage.get('data').then((val)=>{
         
       })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResumePage');
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


  

}
