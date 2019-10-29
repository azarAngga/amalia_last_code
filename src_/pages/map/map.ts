import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { GoogleMaps,
		GoogleMap,
		LocationService,
		CameraPosition,
    GoogleMapOptions,
    MyLocationOptions,
		Marker,
    GeocoderResult,
    Geocoder,
    MyLocation,
		GoogleMapsEvent
		 } from '@ionic-native/google-maps';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: GoogleMap;
  isRunning: any;
  mapOptions: GoogleMapOptions;
  latitude: any 	= "-";
  longitude: any 	= "-";
  data: any = "-";
  alamat: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    this.data = navParams.get('data'); 
  }

   ionViewDidLoad(){
  	this.loadMap();
  }

  loadMap(){
  	let options: MyLocationOptions = {
	  enableHighAccuracy: true
	};

	LocationService.getMyLocation(options).then((location: MyLocation) => {
	  console.log(location);
    this.mapOptions = {
       controls: {
      'compass': true,
      'myLocationButton': true,
      'myLocation': true,   // (blue dot)
      'indoorPicker': true,
      'zoom': true,          // android only
    }
    };
	 	this.setCamera(location.latLng.lat,location.latLng.lng);
	 	this.map = GoogleMaps.create('map_canvas',this.mapOptions);
	 	this.map.one(GoogleMapsEvent.MAP_READY).then(() => {});

        this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
            (data) => {
            	  console.log(data);
                //alert(data[0]['lat']);
                this.latitude = data[0]['lat'];
                this.longitude = data[0]['lng'];
                this.setMarker(this.latitude,this.longitude);
          }
      );

	}).catch((err)=>{

		this.map = GoogleMaps.create('map_canvas');
	 	this.map.one(GoogleMapsEvent.MAP_READY).then(() => {});

	          this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
	              (data) => {
	              	  console.log(data);
	                  //alert(data[0]['lat']);
	                  this.latitude = data[0]['lat'];
	                  this.longitude = data[0]['lng'];
	                  this.setMarker(this.latitude,this.longitude);
	            }
	        );
	});
  }


  setCamera(lat,lng){
  	  this.mapOptions = {
      camera: {
         target: {
           lat: lat,
           lng: lng
         },
         zoom: 18,
         tilt: 30
       },
       controls: {
	    'compass': true,
	    'myLocationButton': true,
	    'myLocation': true,   // (blue dot)
	    'indoorPicker': true,
	    'zoom': true,          // android only
	  }
    };
  }

  setMarker(lat,lng){
  	this.map.clear();
  	let marker: Marker = this.map.addMarkerSync({
      title: 'Marker '+this.data,
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: lat,
        lng: lng
      }
    });
  }

  searchPlace(){

    //this.alamat = 'Kyoto, Japan';

    // Address -> latitude,longitude
    Geocoder.geocode({
      "address": this.alamat
    }).then((results: GeocoderResult[]) => {
      console.log(results);
      
      this.latitude = results[0].position.lat;
      this.longitude = results[0].position.lng;

      if (!results.length) {
        this.isRunning = false;
        return null;
      }

      //Add a marker
      let marker: Marker = this.map.addMarkerSync({
        'position': results[0].position,
        'title':  JSON.stringify(results[0].position)
      });

      // Move to the position
      this.map.animateCamera({
        'target': marker.getPosition(),
        'zoom': 17
      }).then(() => {
        //marker.showInfoWindow();
        this.map.clear();
        this.isRunning = false;
      });
    });

  
  }


  setKoordinat(){
  	if(this.latitude == "-"){
  		alert("Tandai peta terlebih dahulu dengan cara klik pada peta");
  	}else{
      let data = { 'latitude': this.latitude,'longitude':this.longitude,'data': this.data };
      this.viewCtrl.dismiss(data);
  	}
  	
  }

  ionViewWillLeave() {

    const nodeList = document.querySelectorAll('._gmaps_cdv_');

    for (let k = 0; k < nodeList.length; ++k) {
        nodeList.item(k).classList.remove('_gmaps_cdv_');
    }

}

}
