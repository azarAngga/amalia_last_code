import { Component,ViewChild } from '@angular/core';
import {  NavController, NavParams,ViewController } from 'ionic-angular';
import {SignaturePad} from 'angular2-signaturepad/signature-pad';
import {Pemakaian4Page} from '../pemakaian4/pemakaian4';
import { ScreenOrientation } from '@ionic-native/screen-orientation';


/**
 * Generated class for the DenahPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-denah',
  templateUrl: 'denah.html',
})
export class DenahPage {
@ViewChild(SignaturePad) public signaturePad : SignaturePad;

public signaturePadOptions : Object = {
'minWidth': 2,
'canvasWidth': 340,
'canvasHeight': 300
};
public signatureImage : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private screenOrientation: ScreenOrientation) {
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SignaturePage');
  }


  drawCancel() {
    this.navCtrl.push(Pemakaian4Page);
  }

   drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    this.navCtrl.push(Pemakaian4Page, {signatureImage: this.signatureImage});
  }

  drawClear() {
    this.signaturePad.clear();
  }

  canvasResize() {
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }

ngAfterViewInit() {
      this.signaturePad.clear();
      this.canvasResize();
}

dismiss() {
  this.signatureImage = this.signaturePad.toDataURL();
   let data = {signatureImage: this.signatureImage} ;
   this.viewCtrl.dismiss(data);
 }


}
