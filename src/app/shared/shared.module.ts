import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
// import { IonicTimepickerModule } from '@logisticinfotech/ionic-timepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
// import { NgxTinymceModule } from 'ngx-tinymce';

// import { Ng5SliderModule } from 'ng5-slider'; //range slider


// import { HighlightDirective } from '../directives/directive.directive';
import { CommonHeaderComponent } from '../my-component/common-header/common-header.component';
import { CommonFooterComponent } from '../my-component/common-footer/common-footer.component';
import { RatingComponent } from '../my-component/rating/rating.component';
// import { FiltermultiPipe } from '../pipe/filter.pipe';
// import { RoundPipe } from '../pipe/roundof.pipe ';
// import { DragDropDirective } from '../directives/file-upload.directive';
// import { FileSizePipeConvertPipe } from '../pipe/fileSize-convert.pipe ';
import { SafeUrlPipe } from '../pipe/safeUrl.pipe ';
// import { MyTooltipDirective } from '../directives/my-tooltip.directive';
// import { OnlyNumberDirective } from '../directives/only-number.directive';
// import { AutofocusDirective } from '../directives/input-auto-focus.directive';
import { NgInitDirective } from '../directives/init.directive';
import { MustMatchDirective } from '../directives/must-match.directive';
import {OverlayModule} from '@angular/cdk/overlay';
// import { AutocompleteModule } from 'ng2-input-autocomplete'; // Import autocomplte library (npm install ng2-input-autocomplete --save

// //owl date time picker
// import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';

import { SlickCarouselModule } from 'ngx-slick-carousel'; //angular slick sider
import { SafeHtmlPipe } from '../pipe/safe-html.pipe';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterModule } from '@angular/router';


/* tslint:disable */ 
@NgModule({
  declarations: [
    // HighlightDirective, //directive share
    CommonHeaderComponent, //header component share
    CommonFooterComponent,  //footer component share
    RatingComponent, //rating component share
    // FiltermultiPipe, // custom filter multiple value
    // DragDropDirective, //file upload directive
    // FileSizePipeConvertPipe, //file size convert pipe/filter
    // MyTooltipDirective, //not ues any where
    // OnlyNumberDirective, // take only number
    // AutofocusDirective,
    // RoundPipe,
    SafeUrlPipe,
    SafeHtmlPipe,
    NgInitDirective,
    MustMatchDirective //match password or confirm password or email or confirm passwor
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule, //need for component share only
    MatRippleModule,
    MatExpansionModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    // NgMultiSelectDropDownModule.forRoot(), //not need any where
    Ionic4DatepickerModule,
    // IonicTimepickerModule,
    MatIconModule,
    MatButtonModule,
    NgSelectModule, //angular dropdown
    // NgxTinymceModule.forRoot({
    //   baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.0/',
    // }),
    // OwlDateTimeModule,  //owl date time picker
    // OwlNativeDateTimeModule, //owl date time picker
    SlickCarouselModule, //angular slick slider
    // Ng5SliderModule, //range slider
    // AutocompleteModule.forRoot(), //autocomplite module
    MatTabsModule,
    MatStepperModule,
    MatDatepickerModule,MatNativeDateModule, 
    // MatMomentDateModule,
    OverlayModule
  ],
  providers: [
    // {provide: OWL_DATE_TIME_LOCALE, useValue: 'en-GB'},
  ],
  exports:[
    // HighlightDirective, 
    MatRippleModule,
    MatExpansionModule, 
    MatMenuModule, 
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    CommonHeaderComponent, //header component share
    CommonFooterComponent,  //footer component share
    RatingComponent, //rating component share
    ReactiveFormsModule,
    FormsModule,
    // NgMultiSelectDropDownModule, //not need any where
    Ionic4DatepickerModule,
    // IonicTimepickerModule,
    MatIconModule,
    MatButtonModule,
    // FiltermultiPipe, // custom filter multiple value
    NgSelectModule, //angular dropdown
    // DragDropDirective, //file upload directive
    // FileSizePipeConvertPipe, //file size convert pipe/filter
    // OnlyNumberDirective, // take only number
    // AutofocusDirective,
    // RoundPipe,
    SafeUrlPipe,
    SafeHtmlPipe,
    NgInitDirective,
    // NgxTinymceModule,
    MustMatchDirective, //match password or confirm password or email or confirm passwor
    // OwlDateTimeModule,  //owl date time picker
    // OwlNativeDateTimeModule, //owl date time picker
    SlickCarouselModule, //angular slick slider
    // // Ng5SliderModule, //range slider
    // AutocompleteModule, //autocomplite module
    MatTabsModule,
    OverlayModule,
    MatStepperModule,
    MatDatepickerModule,MatNativeDateModule,
    //  MatMomentDateModule,
  ]
})
export class SharedModule { }
