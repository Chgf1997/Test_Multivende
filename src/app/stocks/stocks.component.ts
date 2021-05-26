import { Component, OnInit } from '@angular/core';
import { MultivendeService } from '../multivende.service'

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  products: Array<{
    url: String,
    code: String,
    name: String,
    _id: String,
    stock: Number 
  }> = [];

  constructor(private multivendeService: MultivendeService) {
    this.getStores();
  }

  ngOnInit(): void {
  }

  async getStores(){
    await this.multivendeService.getStores();
    this.getData();
  }

  getData(){
    this.multivendeService.getStocks()
      .toPromise()
      .then(response => {
        // console.log('producst', response.entries)
        let products = response.entries.map(stock => ({
          url: stock.Product.ProductPictures[0].url,
          code: stock.code,
          name: stock.Product.name,
          _id: stock.Product._id,
          stock: stock.ProductStocks[0].amount
        }))

        this.products = products;
        console.log('products', products)
      })
  }

  updateStock(){

    console.log('products', this.products)

    let newStocks = this.products.map(prod => ({
      code: prod.code,
      amount: prod.stock
    }))

    this.multivendeService.updateStockBulk(newStocks)
    .toPromise()
    .then(response => {
      console.log(response);
    })
    

  }

}
