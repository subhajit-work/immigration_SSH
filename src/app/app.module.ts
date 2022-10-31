import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorProvider } from './services/interceptors/interceptor';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AddCommonModelPageModule } from './pages/modal/add-common-model/add-common-model.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StickyHeaderDirective } from './directives/sticky-header.directive';
import { ResponsiveService } from './services/responsive.service';

@NgModule({
  declarations: [AppComponent,StickyHeaderDirective],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }), 
    IonicModule.forRoot(), 
    AppRoutingModule,
    SharedModule,
    AddCommonModelPageModule, //add common modal module
    BrowserAnimationsModule,
    HttpClientModule],
    
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LocationStrategy, useClass: PathLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider,multi: true},
    // ResponsiveService  
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
