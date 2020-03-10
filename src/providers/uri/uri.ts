import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UriProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UriProvider {
 
  //uri_api_alista: any = 'http://180.250.124.181/API/alista/';
  //uri_api_alista: any = 'http://10.204.200.8/API/alista/';
  /*uri_api_alista: any = 'http://180.250.124.181/API/alista/';
  uri_app_amalia: any = 'http://180.250.124.181/API/amalia/';
  uri_api_wimata: any = 'http://180.250.124.181/API/wimata/';
  uri_api_amalia: any = 'http://180.250.124.181/API/amalia/';
   //uri_api: any = 'http://180.250.124.181/API/';*/
  
  //prod: any= 'https://api.telkomakses.co.id/';
  prod: any= 'http://180.250.124.181/';
  // prod: any= 'http://10.204.200.8/';
  versi = "1.3.1";
  uri_api_alista: any = this.prod+'API/alista/';
  uri_app_amalia: any = this.prod+'API/amalia/';
  uri_api_wimata: any = this.prod+'API/wimata/';
  uri_api_amalia: any = this.prod+'API/amalia/';
  uri_api: any = this.prod+'API/';
  uri_prod_upload = 'http://alista.telkomakses.co.id/amalia/';
  
  constructor(public http: Http) {
    console.log('Hello UriProvider Provider');
  }

}
