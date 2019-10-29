import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,Platform } from 'ionic-angular';
import { MitraPage } from '../mitra/mitra';
import { MapPage } from '../map/map';
import * as $ from 'jquery';
import { AlertController } from 'ionic-angular';	
// declare var $: $;
import { Storage } from '@ionic/storage';
import { Pemakaian2Page }from '../pemakaian2/pemakaian2';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { UriProvider  } from '../../providers/uri/uri';
import { Device } from '@ionic-native/device';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the PemakaianPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-pemakaian',
  templateUrl: 'pemakaian.html',
})
export class PemakaianPage {
	nama_mitra: any ;
	start_date: any ;
	
	end_date: any ;
	no_wo: any ="00";
	sto: any ;
	witel: any ;
	no_permintaan: any ;
	no_telepon: any ;	
	no_inet: any ;
	nama_pelanggan: any ;
	menu: any  = "order";
	alamat_pelanggan: any;
	//nik: any = '95130809';
	//nik: any = '17930960';

	lat_odp: any = "-";
	lng_odp: any = "-";
	lat_pel: any = "-";
	lng_pel: any = "-";

	nik: any;
	no_kontak: any;
	no_material: any = false;

	hk: any ;
	dp: any ;
	klem_primer: any ;
	klem_sec: any  ;

	tanggal_mulai: any;
	tanggal_selesai: any;

	panjang_drop_core: any = "" ;
	drop_core: any ="";
	panjang_utp: any ="";
	panjang_pvc: any ="";
	panjang_tray_cable: any ="";
	jumlah_breket: any ="";
	jumlah_klem_ring: any ="";
	jumlah_tiang_telpn: any ="";

	panjang_drop_core_v: any = "" ;
	drop_core_v: any ="";
	panjang_utp_v: any ="";
	panjang_pvc_v: any ="";
	panjang_tray_cable_v: any ="";
	jumlah_breket_v: any ="";
	jumlah_klem_ring_v: any ="";
	jumlah_tiang_telpn_v: any ="";

	view_nama_mitra: any = 1;
	perusahaan: any = "telkom akses";
	no_row: any = 0;
	no_row_dsg: any = 0;
	data_material: any;
	arr_material: any;

	meter_awal: any;
	meter_akhir: any;
	
	// material
	pages: Array<{title: string, component: any}>;
	number_index: any;
	loader: any;
	path: any;
	nama_file: any;
	platform_device: any;

	bangunan: any;
	no_kontak_2: any;
	
	uri_api_alista: any;
	uri_app_amalia: any;
	uri_api_wimata: any;
	modeKeys: any[];
	count_wo: any;
	public nol: number = 0;
	data_wo: Array<{id_barang: string,stok: string,satuan: string}>;
	optionsList: Array<{ value: number, text: string, checked: boolean }> = [];
  
	
  constructor(public navCtrl: NavController,
	   public navParams: NavParams,
	   public uri: UriProvider,
	   public platform: Platform,
	   public alertCtrl: AlertController,
	   public modalCtrl: ModalController,
	   public http: Http,
	   public loadingCtrl: LoadingController,
	   private device: Device,
	   private storage: Storage
   ){

   	  this.storage.set('session',"oke");
   	  this.tanggal_mulai 	 = new Date().toISOString();
	  this.tanggal_selesai = new Date().toISOString();
      var date2 = new Date();
      this.start_date = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
      this.end_date   = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
      

      this.platform.ready().then(() => {
	  	this.storage.get('nik').then((val) => {
	  	this.nik = val;
	  	 //this.actionGetMaterial();
	  	 console.log("ini niknya"+this.nik);
	  	 this.loadMaterial(this.nik);
	  	});
	  })  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PemakaianPage');
  }

   presentProfileModal(x) {

   		let profileModal = this.modalCtrl.create(MitraPage, { sto:x,witel:this.witel });
   		profileModal.onDidDismiss(data => {
		     console.log("inii"+data.data);
		     if(data.jenis == 'mitra'){
		     	this.nama_mitra = data.data;
		     }else if(data.jenis == 'witel'){
				this.witel = data.data;
		     }else{
		     	this.sto = data.data;
		     }
		     
		});
   		profileModal.present();
 	}

 	changeStart(val: any){
 		console.log("start");
 		this.start_date = val.year+"-"+val.month+"-"+val.day;
		console.log("ee"+JSON.stringify(val));

 	}

 	changeEnd(val: any){
 		console.log("end");
 		this.end_date = val.year+"-"+val.month+"-"+val.day;
 		console.log(this.start_date);
 	}

 	changePerusahan(val){
 		if(val == 'mitra'){
 			this.view_nama_mitra = 2;
 		}else{
 			this.view_nama_mitra = 1;
 		}
 	}

 	newElement(){
 		this.no_row = this.no_row+1;
 		var no = this.no_row;
 		var data = this.arr_material;
 		var no_ = 0;
 		var str_app = "";

 		if(data[0]['id_barang'] != "-"){
      		while(no_ < data.length){
      			str_app +="<option>"+data[no_]['id_barang']+"</option>";
	      		no_++;
	      	}
      	}

 		$('#parent').append('<div id="el'+no+'">New Item '+no+'<table><tr><td><select  style="width:150px"  id="id_barang'+no+'" >'+str_app+'</select></td><td width="30%"><input type="text" placeholder="volume" id="volume'+no+'" class="classInput"/></td></tr></table></div>');
 	}

 	newElementDsg(){
 		var data = this.arr_material;
 		var no_ = 0;
 		var str_app = "";

 		if(data[0]['id_barang'] != "-"){
      		while(no_ < data.length){
      			str_app +="<option value='"+data[no_]['id_barang']+"'>"+data[no_]['id_barang']+"</option>";
	      		no_++;
	      	}
      	}

 		this.no_row_dsg = this.no_row_dsg+1;
 		var no = this.no_row_dsg;
 		$('#parentDsg').append('<div id="dsg'+no+'"><table width="100%"><tr><td width="50%"><div align="center">Designator</div></td><td width="40%" colspan="2"><div align="center">Jumlah</div></td></tr><tr><td width="40%"><div align="center"><select width="10" id="designator'+no+'">'+str_app+'</select></div><td><td width="40%"><div align="center"><input  width="5" type="number" id="jumlah_dsg'+no+'" style="border-width: 1px;" /></div><td><td width="20%"><br/><br/><br/></td><td></tr></table></div>');
 	}
 	
 	removeElememtDsg(){
 		var no = this.no_row_dsg;
 		$('#dsg'+no).remove();
 		this.no_row_dsg = this.no_row_dsg-1;
 		if(this.no_row_dsg < 0){
 			this.no_row_dsg = 0;
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

 	actionNext(){
 		
 		var no = 1;
 		var id_barang = [];
 		var volume = [];
 		var satuan = [];
 		this.no_wo = this.no_permintaan;

 		if(this.no_kontak == undefined){
 			this.showAlert("No no kontak tidak boleh kosong");
 		}else if(this.sto == undefined){
 			this.showAlert("STO Tidak boleh kosong");
 		}else if(this.no_permintaan == undefined){
 			this.showAlert("No Permintaan Tidak boleh kosong");
 		}else if(this.no_telepon == undefined){
 			this.showAlert("No Telepon Tidak boleh kosong");
 		}else if(this.no_inet == undefined){
 			this.showAlert("No Inet Tidak boleh kosong");
 		}else if(this.start_date == undefined){
 			this.showAlert("Start Date Tidak boleh kosong");
 		}else if(this.end_date == undefined){
 			this.showAlert("End Date Tidak boleh kosong");
 		}else if(this.nama_pelanggan == undefined){
 			this.showAlert("Nama Pelanggan Tidak boleh kosong");
 		}else if(this.alamat_pelanggan == undefined){
 			this.showAlert("Nama alamat pelanggan Tidak boleh kosong");
 		}else if(this.dp == undefined){
 			this.showAlert("ODP Tidak boleh kosong");
 		}else if(this.lat_odp == "-" && this.lat_pel == "-"){
 			this.showAlert("Koordinat pelanggan atau ODP tidak boleh kosong");
 		}else{
 			
 			while(no <= this.no_row){
	 			var id_barang_ = $('#id_barang'+no).val();
	 			var volume_ = $('#volume'+no).val();
	 			var satuan_ = $('#satuan'+no).val();
	 			id_barang.push(id_barang_);
	 			volume.push(volume_);
	 			satuan.push(satuan_);
	 			no++;
	 		}

	 		no = 1;
	 		var designator = [];
	 		var jumlah     = [];
			
			// material
			var id_barang_m = []; 	
			var stok_m = []; 		 
			var satuan_m = []; 	 
			var volume_m = [];	
			var wo_number_m = []; 
			
			// material2
			var id_barang_m2 = []; 	
			var stok_m2 = []; 		 
			var satuan_m2 = []; 	 
			var volume_m2 = [];	
			var wo_number_m2 = []; 
			

	 		while(no <= this.no_row_dsg){
	 			designator.push($('#designator'+no).val());
	 			jumlah.push($('#jumlah_dsg'+no).val());
	 			console.log($('#designator'+no).val());
	 			no++;
	 		}

	 		try{
	 			for(var idx = 0;idx < this.data_wo.length ; idx++){
				 id_barang_m[idx] 	= this.data_wo[idx].id_barang;
				 stok_m[idx] 		= this.data_wo[idx].stok; 
				 satuan_m[idx] 		= this.data_wo[idx].satuan; 
				 volume_m[idx]		= this.modeKeys[idx];
				 wo_number_m  		= this.no_wo;
				 
				 id_barang_m2.push(this.data_wo[idx].id_barang);
				 stok_m2.push(this.data_wo[idx].stok); 
				 satuan_m2.push(this.data_wo[idx].satuan); 
				 volume_m2.push(this.modeKeys[idx]);
				 wo_number_m2.push(this.no_wo);
			}
	 		}catch(error){
	 		//	alert("error pada saat parsing data wo");
	 		}
			
			
			
			
			let headers = new Headers({
				'Content-Type' : 'application/x-www-form-urlencoded'
			});	

			// create option 
			let requestOptions = new RequestOptions({
				headers : headers
			});
			
			
			console.log("no string "+volume_m);
			console.log("with string "+JSON.stringify(volume_m));
			let wo = 'wo_number='+this.no_wo+'&no_material='+this.no_material+'&nik='+this.nik+'&id_barang='+id_barang_m+'&volume='+volume_m+'&flag=ionic&namafile='+this.nama_file+"&versi="+this.uri.versi+"&nik="+this.nik;
			//this.showAlertNews(wo);
			console.log("ini_parmeter :"+wo);
			console.log("ini_url :"+this.uri_api_alista+'ios/put_data_pemakaian_halaman1.php',wo,requestOptions);

			//execute url post
			this.loading();
			this.http.post(this.uri_api_alista+'ios/put_data_pemakaian_halaman1.php',wo,requestOptions)
			.map(res => res.json())
			.subscribe(data => {
				this.loader.dismiss();

				var datas = {
						'jumlah_tiang_telpn':this.jumlah_tiang_telpn,
						'jumlah_klem_ring':this.jumlah_klem_ring,
						'jumlah_breket':this.jumlah_breket,
						'panjang_pvc':this.panjang_pvc,
						'panjang_utp':this.panjang_utp,
						'panjang_drop_core':this.panjang_drop_core,
						'panjang_tray_cable':this.panjang_tray_cable,
						'drop_core':this.drop_core,
						'nama_mitra':this.nama_mitra,
						'no_wo':this.no_wo,
						'no_kontak':this.no_kontak,
						'meter_awal': this.meter_awal,
						'meter_akhir': this.meter_akhir,
						'sto':this.sto,
						'witel':this.witel,
						'bangunan':this.bangunan,
						'no_kontak_2':this.no_kontak_2,
						'no_material':this.no_material,
						'lat_odp':this.lat_odp,
						'lng_odp':this.lng_odp,
						'lat_pel':this.lat_pel,
						'lng_pel':this.lng_pel,
						'no_permintaan':this.no_permintaan ,
						'no_telepon':this.no_telepon ,
						'no_inet':this.no_inet ,
						'start_date':this.start_date ,
						'end_date':this.end_date ,
						'nama_pelanggan':this.nama_pelanggan ,
						'alamat_pelanggan':this.alamat_pelanggan ,
						'hk':this.hk ,
						'dp':this.dp ,
						'klem_primer':this.klem_primer ,
						'klem_sec':this.klem_sec ,
						'other': {'id_barang':id_barang,'volume':volume,'satuan':satuan} ,
						'other_m2': {'id_barang':id_barang_m2,'stok':stok_m2,'satuan':satuan_m2,'volume':volume_m2,'wo_number':wo_number_m2} ,
						'designator': {'designator':designator,'jumlah':jumlah} ,
					};

				var data_response = data.status;
				if(data_response == true){
					console.log(datas);
					this.storage.set('data',datas); 
	 				this.navCtrl.push(Pemakaian2Page);
				}else{
					this.showAlert(data.message);
				}
			}); 
 		}
 	}

 	actionGetMaterial(){
 	  console.log(this.uri.uri_api_alista+"ios/get_data_list_material.php?nik="+this.nik);
 	  this.http.get(this.uri.uri_api_alista+"ios/get_data_list_material.php?nik="+this.nik)
      .map(res => res.json())
      .subscribe(data => {
      	var no = 0;
      	//var arr_ = [];
      	this.arr_material = data;
      	console.log(data[0].id_barang);
      	while(no < data.length){

      		if(data[no].id_barang.indexOf("drop core") > -1){
      			this.drop_core = data[no].id_barang;
      			this.drop_core_v = data[no].id_barang;
      			this.panjang_drop_core = data[no].jumlah_permintaan_barang;
      			this.panjang_drop_core_v = data[no].jumlah_permintaan_barang;
      			console.log(JSON.stringify(data[no]));
      		}


      		if(data[no].id_barang.indexOf("utp") > -1){
      			this.panjang_utp = data[no].jumlah_permintaan_barang;
      			this.panjang_utp_v = data[no].jumlah_permintaan_barang;
      		}

      		if(data[no].id_barang.indexOf("tray") > -1){
      			this.panjang_tray_cable = data[no].jumlah_permintaan_barang;
      			this.panjang_tray_cable_v = data[no].jumlah_permintaan_barang;
      		}

      		if(data[no].id_barang.indexOf("braket") > -1){
      			this.jumlah_breket = data[no].jumlah_permintaan_barang;
      			this.jumlah_breket_v = data[no].jumlah_permintaan_barang;
      		}

      		if(data[no].id_barang.indexOf("klem") > -1){
      			this.jumlah_klem_ring = data[no].jumlah_permintaan_barang;
      			this.jumlah_klem_ring_v = data[no].jumlah_permintaan_barang;
      		}

      		if(data[no].id_barang.indexOf("tiang") > -1){
      			this.jumlah_tiang_telpn = data[no].jumlah_permintaan_barang;
      			this.jumlah_tiang_telpn_v = data[no].jumlah_permintaan_barang;
      		}

      		no++;
      	}

      },error =>{});
 	}

 	showAlert(x){
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: x,
        buttons: ['OK']
      });
      alert.present();
    }

   //  validasiMaterial(datax){
   //    this.loading();
   //    var valid = JSON.stringify(datax);
   //    var url = this.uri.uri_api_alista+"ios/validation_put_ba.php?nik="+this.nik+"&wo="+this.no_wo+"&halaman1="+valid;
   //    console.log("validas :",url);
 	 //  this.http.get(url)
   //    .map(res => res.json())
   //    .subscribe(data => {
   //    	var return_data = data.status;
   //    	if(return_data){
			// //this.storage.set('data',datax);
			// console.log(datax);
	 	// 	this.navCtrl.push(Pemakaian2Page);
   //    	}else{
   //    		this.showAlert(data.message);
   //    	}
   //    	this.loader.dismiss();
   //    });
  	// }
	
	loadMaterial(nik){
		
		this.pages = [];
		this.number_index = 0;
		this.path = "-";
		this.nama_file = "-";
		this.platform_device = this.device.platform;
		console.log(this.device);
		// URI
		this.uri_api_alista = this.uri.uri_api_alista;
		this.uri_app_amalia = this.uri.uri_app_amalia;
		this.uri_api_wimata = this.uri.uri_api_wimata;

		//this.platform_device = 'iOS';
		//this.showAlertNews(device.platform);
			
		
		this.onLoad(nik);
	}
	
	onLoad(nik){
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

	  	// create option 
	  	let requestOptions = new RequestOptions({
	  		headers : headers
	  	});

      let wo = 'nik='+nik;
	  	//let wo = 'nik=97150427';
	  	
	  	//execute url post
      this.http.post(this.uri_api_alista+'ios/get_data_list_material2.php',wo,requestOptions)
	  	//this.http.post('http://api.telkomakses.co.id/API/alista/get_data_list_material.php',wo,requestOptions)
	  	.map(res => res.json())
	  	.subscribe(data => {
	  		try{
	  			this.data_wo = data;
	  		for(var idx = 0;idx < data.length;idx++){
	  			this.modeKeys[idx] = 0;
	  		}
	  		}catch(e){

	  		}
	  		
	  		// dismiss loading from loader
	  		this.loader.dismiss();
	  	}); 
	}
	
	loading(){
	  	this.loader = this.loadingCtrl.create({
	  		content: "please Wait.."
	  	})

	  	// execute loading 
	  	this.loader.present();
	  }

	changeNoKontak(value){
	    //manually launch change detection
	    this.no_kontak = value.length > 8 ? value.substring(0,8) : value;
	}

	presentOdpModal(x) {

   		let profileModal = this.modalCtrl.create(MapPage, { data: x  });
   		profileModal.onDidDismiss(data => {
		     
		     //alert(data.latitude);
		      if(data.data == 'ODP'){
		      	this.lat_odp = data.latitude;
		      	this.lng_odp = data.longitude;
		      }else{
		      	this.lat_pel = data.latitude;
		      	this.lng_pel = data.longitude;
		      }
		      console.log("inii"+this.lat_odp+" "+data.data);
		     
		});
   		profileModal.present();
 	}

 	ionViewWillLeave() {

    const nodeList = document.querySelectorAll('._gmaps_cdv_');

    for (let k = 0; k < nodeList.length; ++k) {
        nodeList.item(k).classList.remove('_gmaps_cdv_');
    }

}

}
