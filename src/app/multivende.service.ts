import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'

import Provider from './providers/provider.model'

@Injectable({
  providedIn: 'root'
})
export class MultivendeService {
  baseUrl: string = 'https://app.multivende.com';
  accessToken: string = '';
  requestOptions = {
    headers: new HttpHeaders({
      'Authorization' : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI3OGRlN2Q4Yy02OWQyLTRhNDItOGJjMC1mYzBmZGU0MTQ0NDEiLCJyb2xlIjoibWVyY2hhbnQtdXNlciIsImlhdCI6MTYyMTk3MTU2MSwiZXhwIjo0Nzc1NTcxNTYxfQ._nrE4WJlLpC_9ymqBt1NEyvrVPHHsdfedtqiFRgotx0`
    })
  };
  merchantId = '57b685df-7cd6-4055-895d-e04626ba7f19';
  warehouseId: String = "";
  userInfo = {};

  constructor(private http: HttpClient) { 
    console.log('service esta trabajando')
  }

  login(email:string, password:string){

    return this.http.post<{token: string}>(`${this.baseUrl}/auth/local`, {
      email: email,
      password: password
    })
    .toPromise()
    .then( response => {
      let { token } = response;
      this.accessToken = token;
  
      let headers = new HttpHeaders({
        'Authorization' : `Bearer ${token}`
      });
  
      this.requestOptions = { headers }

      return this.me();
    })
  }

  me(){
    return this.http.get<{
      profile: {},
      token: {},
      _id: string,
      Merchants: [
        {
          _id: string
        }
      ]
    }>(`${this.baseUrl}/api/users/me`, this.requestOptions)
    .toPromise()
    .then(response => {
      // console.log('me', response)

      this.userInfo = response;
      this.merchantId = response.Merchants[0]._id;

      return response;
    })
  }

  getProviders(){

    return this.http.get<{
        entries: []
      }>(`${this.baseUrl}/api/m/${this.merchantId}/providers/p/0`, this.requestOptions)

  }

  async createProvider(provider: {}){

    return this.http.post<Provider>(`${this.baseUrl}/api/m/${this.merchantId}/providers`, provider, this.requestOptions)
      .toPromise()
  }

  async updateProvider(id: string, name: string, email: string, phoneNumber: string){
    return this.http.put<Provider>(`${this.baseUrl}/api/providers/${id}`, {
      name,
      email,
      phoneNumber
    }, this.requestOptions).toPromise()
  }

  async destroyProvider(provider: Provider){
    return this.http.delete(`${this.baseUrl}/api/providers/${provider._id}`, this.requestOptions)
      .toPromise()
    
  }

  getProducts(){
    return this.http.get<{
      entries: Array<{
        ProductPictures: [{url: String}],
        _id: String,
        code: String,
        name: String,
        ProductStocks: [{}]
      }>
    }>(`${this.baseUrl}/api/m/${this.merchantId}/products/p/0`, this.requestOptions)
  }

  getStocks(){
    return this.http.get<{
      entries: [
        {
          code: String,
          Product: {
            ProductPictures: [{url: String}],
            _id: String,
            name: String
          },
          ProductStocks: [{
            amount: Number
          }]
        }
      ]
    }>(`${this.baseUrl}/api/m/${this.merchantId}/product-versions/p/1?_include_stock=true&warehouse_id=${this.warehouseId}`, this.requestOptions)
  }

  getStores(){
    return this.http.get<{
      entries: [{_id: String}]
    }>(`${this.baseUrl}/api/m/${this.merchantId}/stores-and-warehouses/p/0`, this.requestOptions)
      .toPromise()
      .then( response => {
        this.warehouseId = response.entries[0]._id;
        return response;
      })
  }

  updateStockBulk(newStock: Array<{code: String, amount: Number}>){

    return this.http.post<{}>(`${this.baseUrl}/api/product-stocks/stores-and-warehouses/${this.warehouseId}/bulk-set`,
      newStock
    , this.requestOptions)
  }


}
