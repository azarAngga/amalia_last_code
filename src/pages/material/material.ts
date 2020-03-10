import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform  } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { Device  } from "@ionic-native/device";
import { UriProvider } from "../../providers/uri/uri";
import { Http,RequestOptions,Headers } from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { Pemakaian2Page } from '../pemakaian2/pemakaian2';
import * as $ from 'jquery';
import 'rxjs/add/operator/timeout';
import { parse } from 'querystring';

/**
 * Generated class for the MaterialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-material',
  templateUrl: 'material.html',
})
export class MaterialPage {

  nik: any;
  pages: any;
  number_index: any;
  path: any;
  nama_file: any;
  platform_device: any;
  uri_api_alista: any;
  uri_app_amalia: any;
  uri_api_wimata: any;
  nol: number = 0;
  no_material: any = false;


	modeKeys: any[];
  count_wo:any;
	data_wo: Array<{id_barang: string,stok: string,satuan: string}>;

  loader: any;
	optionsList: Array<{ value: number, text: string, checked: boolean }> = [];

  constructor(public navCtrl: NavController,
     public storage: Storage,
     public loadingCtrl: LoadingController,
     public uri: UriProvider,
     public platform: Platform,
     public http : Http,
     public device: Device,
     public navParams: NavParams) {

      
  }

  loadMaterial(nik :any){
		this.pages = [];
		this.number_index = 0;
		this.path = "-";
		this.nama_file = "-";
		this.platform_device = this.device.platform;
		console.log(this.device);
		this.uri_api_alista = this.uri.uri_api_alista;
		this.uri_app_amalia = this.uri.uri_app_amalia;
		this.uri_api_wimata = this.uri.uri_api_wimata;		
		this.onLoad(nik);
	}

  arr_designator_tambahan : any = []
  arr_satuan_tambahan : any =[]

  select_designator : any = ""

  materialTambahan(){
    this.http.get(this.uri.uri_api_alista+'/amalia_app/get_material_tambahan.php')
      .map(res => res.json())
      .timeout(10000)
	  	.subscribe(data => {
        let count = data.length
        
        for(let no = 0;no < count;no++){
          this.arr_designator_tambahan.push(data[no]['designator'])
          this.arr_satuan_tambahan.push(data[no]['satuan'])
          this.select_designator += "<option value='"+data[no]['designator']+"'>"+data[no]['designator']+"</option>"
        }
      },error => {
        // alert("Koneksi terputus mohon coba lagi");
      }); 
  }

  onLoad(nik : any){
		this.modeKeys = [];
		console.log(this.modeKeys[0]);  

		this.count_wo = 0 ;
		this.data_wo = [
	      { id_barang: '-',stok: "0",satuan: "-"}
	    ];

	     this.optionsList.push({ value: 1, text: 'option 1', checked: false });
	     this.optionsList.push({ value: 2, text: 'option 2', checked: false });

	     this.loading();
	    
		  let headers = new Headers({
	  		'Content-Type' : 'application/x-www-form-urlencoded'
	  	});	

	  	let requestOptions = new RequestOptions({
	  		headers : headers
	  	});

      let wo = 'nik='+nik;
      this.http.post(this.uri_api_alista+'ios/get_data_list_material2.php',wo,requestOptions)
      .timeout(10000)
	  	.map(res => res.json())
	  	.subscribe(data => {
	  		try{
	  			this.data_wo = data;
	  		for(var idx = 0;idx < data.length;idx++){
	  			this.modeKeys[idx] = 0;
	  		}
	  		}catch(e){

	  		}
	  		this.loader.dismiss();
	  	},error => {
        alert("Koneksi terputus mohon coba lagi");
        this.loader.dismiss();
      }); 
  }
  
  loading(){
    this.loader = this.loadingCtrl.create({
      content: "please Wait.."
    })

    this.loader.present();
  }


  ionViewDidLoad() {

    this.platform.ready().then(() => {
      this.storage.get('nik').then((val) => {
      this.nik = val;
       console.log("ini niknya"+this.nik);
       this.loadMaterial(this.nik);
      });
    })   
    this.materialTambahan();   
    
  }

  actionNext(){
    this.loading();

    let id_barang_m = [];
            let stok_m = [];
            let satuan_m = [];
            let volume_m = [];
            let wo_number_m = [];

            let id_barang_m2 = []; 	
            let stok_m2 = []; 		 
            let satuan_m2 = []; 	 
            let volume_m2 = [];	
            let wo_number_m2 = []; 
            let material_tambahan_designator = []
            let material_tambahan_volume = []

            try{
              for(var idx = 0;idx < this.data_wo.length ; idx++){
              id_barang_m[idx] 	= this.data_wo[idx].id_barang;
              stok_m[idx] 		= this.data_wo[idx].stok; 
              satuan_m[idx] 		= this.data_wo[idx].satuan; 
              volume_m[idx]		= this.modeKeys[idx];
              
              id_barang_m2.push(this.data_wo[idx].id_barang);
              stok_m2.push(this.data_wo[idx].stok); 
              satuan_m2.push(this.data_wo[idx].satuan); 
              volume_m2.push(this.modeKeys[idx]);

              
             }
            }catch(error){
              
            }

            
            try{
              for(var idx = 1;idx <= this.no_row ; idx++){
                material_tambahan_designator.push($('#designator_'+idx).val())
                material_tambahan_volume.push($('#volume_tambahan_'+idx).val())
              }
            }catch(error){

            }
            
            var data_new = {
              'id_barang':id_barang_m2,
              'stok':stok_m2,
              'satuan':satuan_m2,
              'volume':volume_m2,
              'material_tambahan_designator': material_tambahan_designator,
              'material_tambahan_volume': material_tambahan_volume
            }
      this.storage.get('data').then(val_pelanggan =>{
          var pelangga_data = val_pelanggan
          this.storage.get('data2').then(val =>{
            var parse =  JSON.stringify(val)
            var parse_material =  JSON.stringify(data_new)
            var parse_pelanggan =  JSON.stringify(pelangga_data)
            console.log(this.uri.uri_api_alista+"amalia_app/material_validation.php?pelanggan="+parse_pelanggan+"&layanan="+parse+"&material="+parse_material+"&nik="+this.nik+"&no_material="+this.no_material)
            this.http.get(this.uri.uri_api_alista+"amalia_app/material_validation.php?pelanggan="+parse_pelanggan+"&layanan="+parse+"&material="+parse_material+"&nik="+this.nik+"&no_material="+this.no_material)
            .map(res => res.json())
            .timeout(30000)
            .subscribe(data => {
              if(data.status){
                this.storage.set('data3',data_new);
                this.navCtrl.push(Pemakaian2Page);
              }else{
                alert(data.message);
              }
              this.loader.dismiss()
            },error => {
              alert("Koneksi terputus mohon coba lagi");
              this.loader.dismiss();
            });
          })
      })
      
  }

  no_row: any = 0

  newElement(){
    this.no_row = this.no_row+1;
    var no = this.no_row;
    var no_ = 0;
    var str_app = "";

      $('#parent').append(
      '<html>'+
          '<head>'+
          '<style>'+
          '#customers {'+
            'font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;'+
            'border-collapse: collapse;'+
            ' width: 100%;'+
            ' }'+

            '#customers td, #customers th {'+
              'border: 1px solid #ddd;'+
              'padding: 8px;'+
              ' }'+

              '#customers tr:nth-child(even){}'+

              '#customers tr:hover {}'+

              ' #customers th {'+
                ' padding-top: 12px;'+
                'padding-bottom: 12px;'+
                'text-align: left;'+
                'background-color: #f2f2f2;'+
                ' }'+
                '</style>'+
                '</head>'+
                '<body >'+
                '<div id= "el_'+no+'">'+
                '<table id="customers">'+
                '<tr>'+
                '<th>Designator : <select class="designator"  id="designator_'+no+'">'+this.select_designator+'</select></th>'+
                '</tr>'+

                '<tr>'+
                '<td><div  style="float:left"> Satuan &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; </div><div style="float:left" id="satuan_'+no+'">'+this.arr_satuan_tambahan[0]+'</div> </td>'+
                '</tr>'+

                '<tr>'+
                '<td>Volume &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <input type="number" value="0" id="volume_tambahan_'+no+'"/></td>'+
                '</tr>'+
            
                '</table>'+
                '<div>'+
                ' </body>'+
                '</html>'
    );
      
      var arr = this.arr_satuan_tambahan;
    
      $('#designator_'+no).change(function(){
          var numb = $( "#designator_"+no ).val();
          $('#satuan_'+no).text(arr[numb[0]])
          
      })
  }


  removeElememt(){
    var no = this.no_row;
    $('#el_'+no).remove();
    this.no_row = this.no_row-1;
    if(this.no_row < 0){
      this.no_row = 0;
    }
  }


}


