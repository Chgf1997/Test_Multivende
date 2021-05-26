import { Component, OnInit } from '@angular/core';
import { MultivendeService } from '../multivende.service'
import Provider from './provider.model'

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  providers: Array<Provider> = [];

  action: string = 'create';

  id: string = '';
  name : string = '';
  email: string = '';
  phoneNumber: string = '';
  

  constructor(private multivendeService: MultivendeService) {
    this.getData();
  }
  
  ngOnInit(): void {
  }

  getData(){

    this.multivendeService.getProviders()
      .toPromise()
      .then(response => {
        console.log('res', response.entries)
        this.providers = response.entries

      })
      .catch(error => {
        console.log('error', error)
      })

  }
  

  modalEdit = (btnModal: HTMLElement, provider: Provider) => {
    this.action = 'edit';

    this.id = provider._id;
    this.name = provider.name;
    this.email = provider.email;
    this.phoneNumber = provider.phoneNumber;

    btnModal.click();
  }

  modalCreate = (btnModal: HTMLElement) => {
    this.action = 'create';
    this.clean();
    btnModal.click();
  }

  async createProvider(){
    console.log('createProvider')
    this.multivendeService.createProvider(
      {
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber
      }
    ).then(response => {
      console.log('res', response)
      this.providers = [...this.providers, response];

      this.clean()
    })

    return true;
  }

  clean(){
    this.id = '';
    this.name = '';
    this.email = '';
    this.phoneNumber = '';
  }

  validate(){
    if (!this.name.length || !this.email.length || !this.phoneNumber.length){
      return ;
    }
    this.action == 'edit' ? this.updateProvider() : this.createProvider();
  }

  async updateProvider(){

    this.multivendeService.updateProvider(
        this.id,
        this.name,
        this.email,
        this.phoneNumber
    ).then(response => {
      console.log('res', response)
      this.providers = this.providers.map(p => p._id !== response._id ? p : response)

      document.getElementById('btnModal')?.click();
      this.clean()
    })

    this.clean()
    console.log('update')

    return true;
  }

  async destroyProvider(provider: Provider){
   
    this.multivendeService.destroyProvider(provider)
      .then(response => {
        console.log('destroy', response)
        this.providers = this.providers.filter(p => p._id !== provider._id)
      })

    return true;
  }

}
