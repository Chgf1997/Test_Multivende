import { Component, OnInit, Input } from '@angular/core';

import { MultivendeService } from '../multivende.service'
import { HttpClient } from '@angular/common/http'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {
  @Input() title = 'nombre';
  @Input() callback = (email:string, password: string)=> {};
  
  email: string = 'chgf1997@gmail.com';
  password: string = '123456';

  constructor(private multivendeService: MultivendeService, private router: Router) { }
  ngOnInit(){};

  submit(){

    this.callback(
      this.email,
      this.password
    );

    return false;
  }


  async login(){
    // console.log('authLogin', {email: this.email, password: this.password})

    let response = await this.multivendeService.login(this.email, this.password);
    console.log('authLogin', response)

    this.router.navigateByUrl('providers')
  }
}
