import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})

export class AboutUsPage implements OnInit, OnDestroy {

  @ViewChild(IonContent) content: IonContent;

  main_url = environment.apiUrl;
  file_url = environment.fileUrl;

  // variable declartion section
  model: any = {};
  isListLoading = false;
  page = 1;
  noDataFound = true;
  fetchItems;
  tableHeaderData;
  tableHeaderDataDropdown;
  current_url_path_name;
  private viewPageDataSubscribe: Subscription;
  parms_action_id;
  listing_view_url;
  viewLoadData;
  viewData;
  disableApplyButton = false;
  commonPageData;
  selectLoadingDepend: boolean;
  getAboutSubscribe: Subscription;
  getCompanyAbout_api;
  desc: any;
  getWorkSubscribe;
  getCompanyWork_api;
  work: any;

  constructor(
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private http : HttpClient,
    private modalController : ModalController,
    private commonUtils : CommonUtils,
    private authService : AuthService,
    private meta: Meta,
    @Inject(DOCUMENT) private _document: HTMLDocument //use for tittle
  ) { 
    this.meta.addTags([
      { name: 'title', content: 'About us title' },
      { name: 'keywords', content: 'About us keyword' },
      { name: 'description', content: 'About us description' },
    ]);

    this._document.getElementById('pageTitle').innerHTML = 'About us title';
  }

  // tslint:disable-next-line: comment-format
  // pager object
  pager: any = {};
  // paged items
  pageItems: any[];

  listAlldata;

  // mat-accordion open start
    step = 0;

    setStep(index: number) {
      this.step = index;
    }
  // mat-accordion end

  // ------ init function call start -------
  commonFunction(){
    // get active url name
    this.current_url_path_name =  this.router.url.split('/')[1] + 'ColumnSelect';
    this.commonUtils.getPathNameFun(this.router.url.split('/')[1]);

    this.parms_action_id = this.activatedRoute.snapshot.paramMap.get('id');
    
    // view page url name
    this.listing_view_url = 'cms/frontend_return_index' ;

    // view data call (autologin check)
    this.viewPageDataSubscribe = this.commonUtils.getSiteInfoObservable.subscribe(res =>{
      console.log('getSiteInfoObservable res>>>>>>>>>>>>>>>>>>>.. >', res);
      if(res){
        this.viewPageData(); 
      }
    })
    // getcompanyabout api
    this.getCompanyAbout_api = 'get-company-about';
    this.getCompanyAbout();
    // getcompanyabout api
    this.getCompanyWork_api = 'get-company-work';
    this.getCompanyWork();

    // view data call (userdetails from header login only)
    this.viewPageDataSubscribe = this.commonUtils.signinCheckObservable.subscribe(res =>{
      console.log('getSiteInfoObservable res>>>>>>>>>>>>>>>>>>>..11111 >', res);
      if(res){
        this.viewPageData(); 
      }
    })

    // get data from commoninfo api
    this.viewPageDataSubscribe = this.commonUtils.commonDataobservable.subscribe((res:any) =>{
      console.log('commonPageData data res>>>>>>>>>>>>>>>>>>>.. >', res);
      if(res){
        this.commonPageData = res;
      }
    })

  }


  ngOnInit() {
  }

  // scroll event detect
  isFixedHeader;
  onScrollHedearFix(event) {
    console.log('scroll onnnnnnnnn', event.detail.scrollTop);
    if (event.detail.scrollTop > 56) {
      console.log("scrolling down, hiding footer...iffffffffffff");
      this.isFixedHeader = true;
    } else {
      console.log("scrolling up, revealing footer...elseeeeeeeeeeeeeee");
      this.isFixedHeader = false;
    };
  }

  // ion View Will Enter call
  ionViewWillEnter() {
    this.commonFunction();
  }

  ionViewDidEnter(){
    // go to scroll top in mozila browser
    this.content.scrollToTop(0);
  }


  // open description
  openDescription(event, _item, _items){
    _item.isOpenDescription = !_item.isOpenDescription;

    /* _items.forEach(element => {
      element.isOpenDescription = false;
    });
    if(_item){
      _item.isOpenDescription = true;
    } */
  }

   //getCompanyAbout
   path;
   getCompanyAbout(){
    this.selectLoadingDepend = true;
    this.getAboutSubscribe = this.http.get(this.getCompanyAbout_api).subscribe(
      (res:any) => {
      this.selectLoadingDepend = false;
      this.desc =res.return_data;
      this.path = res.return_path;
      console.log('sss', res);
    },
    errRes => {
      this.selectLoadingDepend = false;
    }
    );
  }

   //getCompanyWork
   getCompanyWork(){
    this.selectLoadingDepend = true;
    this.getWorkSubscribe = this.http.get(this.getCompanyWork_api).subscribe(
      (res:any) => {
      this.selectLoadingDepend = false;
      this.work =res.return_data;
      console.log('work', res);
    },
    errRes => {
      this.selectLoadingDepend = false;
    }
    );
  }


  // ================== view data fetch start =====================
    viewPageData(){
      this.viewLoadData = true;
      this.viewPageDataSubscribe = this.http.get(this.listing_view_url).subscribe(
        (res:any) => {
          this.viewLoadData = false;
          console.log("view data  res -------------------->", res.return_data);
          if(res.return_status > 0){
            this.viewData = res.return_data.about_us;
          }
        },
        errRes => {
          this.viewLoadData = false;
        }
      );
    }
  // view data fetch end


  // ----------- destroy subscription start ---------
    ngOnDestroy() {
      if(this.viewPageDataSubscribe !== undefined){
        this.viewPageDataSubscribe.unsubscribe();
      }
    }
  // destroy subscription end
}