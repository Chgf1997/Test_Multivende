import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms'
import { RouterModule, Route } from '@angular/router'
import { AuthFormComponent } from './auth-form/auth-form.component';
import { ProvidersComponent } from './providers/providers.component';
import { StocksComponent } from './stocks/stocks.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Component
import { AppComponent } from './app.component';
import { MultivendeService } from './multivende.service'
import { HttpClientModule } from '@angular/common/http'

const routes: Route[] = [
  { path: '', component: AuthFormComponent },
  { path: 'providers', component: ProvidersComponent},
  { path: 'stocks', component: StocksComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthFormComponent,
    ProvidersComponent,
    StocksComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    MultivendeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
