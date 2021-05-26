import { Component, Renderer2 } from '@angular/core';

import { MultivendeService } from './multivende.service'
import { HttpClient } from '@angular/common/http'

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';

  isAuth = false;

  constructor(private multivendeService: MultivendeService){

  }

}
