import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IonContent, Platform, ModalController, AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.page.html',
  styleUrls: ['./enrollment.page.scss'],
})
export class EnrollmentPage implements OnInit {

  
  @ViewChild(IonContent) content: IonContent;
  fd = new FormData();
  main_url = environment.apiUrl;
  file_url = environment.fileUrl;
  footer: any;
  files: any[];
  selectLoadingDepend: boolean;
  uploadLoader: boolean;

  constructor(
    private plt: Platform,
    private modalController : ModalController,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private http : HttpClient,
    private alertController : AlertController,
    private commonUtils: CommonUtils // common functionlity come here
  ) { }

  // variable declartion section
  model: any = {};
  private getServiceDataSubscribe: Subscription;
  private getFooterSubscribe: Subscription;
  private itemsSubscribe: Subscription;
  private uploadSubscribe: Subscription;
  private formSubmitSubscribe: Subscription;
  commonPageData;
  visa:any;
  // select checkbox end
  //--------------  getlist data fetch start -------------
    form_submit_text = 'Submit';
    form_api;
    getFooter_api;
    getservice_api = 'getservice';
    uploadURL;
    serviceList:any[];
    // ------ init function call start ------
    commonFunction(){
        this.form_api = 'get-enrolment-document';
        // get active url name
        this.commonUtils.getPathNameFun(this.router.url.split('/')[1]);
        
        // getfooter api
        this.getFooter_api = 'footer';
        this.getFooter();

        this.serviceType();
        // get data from commoninfo api
        this.itemsSubscribe = this.commonUtils.commonDataobservable.subscribe((res:any) =>{
          console.log('commonPageData data res>>>>>>>>>>>>>>>>>>>.. >', res);
          if(res){
            this.commonPageData = res;
          }
        })


    }
    // init
    ngOnInit() {
    //  this.commonFunction();
    }
    // scroll event detect
    isFixedHeader;
    onScrollHedearFix(event) {
      // console.log('scroll onnnnnnnnn', event.detail.scrollTop);
      if (event.detail.scrollTop > 56) {
        // console.log("scrolling down, hiding footer...iffffffffffff");
        this.isFixedHeader = true;
      } else {
        // console.log("scrolling up, revealing footer...elseeeeeeeeeeeeeee");
        this.isFixedHeader = false;
      };
    }

    ionViewWillEnter() {
      this.commonFunction();
    }
    
    ionViewDidEnter(){
      // go to scroll top in mozila browser
      this.content.scrollToTop(0);
    }
    //getFooter
    getFooter(){
      this.selectLoadingDepend = true;
      this.getFooterSubscribe = this.http.get(this.getFooter_api).subscribe(
        (res:any) => {
        this.selectLoadingDepend = false;
        this.footer =res.return_data;
        console.log('footer', res);
      },
      errRes => {
        this.selectLoadingDepend = false;
      }
      );
    }  
    profileImagefile;
    file = new FormData();
    profileImage(event)
    {
      console.log(event);
      
      var fileData = event.target.files[0]

      if (fileData.type == 'application/pdf') {

      } else {
        alert("file type should be image of pdf")
        this.model.document = '';
        return;
      }
      this.uploadLoader = true;
      // let file = new FormData();
       this.file.append("document",event.target.files[0]);

      // this.uploadSubscribe = this.http.post('get-update-user-image',file).subscribe(
      //   (res:any) => {
      //     this.commonUtils.presentToast('success',res.return_message)
      //     this.profileImagefile  = res.return_data;
      //     this.uploadLoader = false;
      //     // window.location.reload();
      //   },
      //   errRes => {
      //     this.commonUtils.presentToast('success',errRes.return_message);
      //     this.uploadLoader = false;
      //   });
    }
    serviceType()
    {
      this.getServiceDataSubscribe = this.http.get(this.getservice_api).subscribe(
        (res:any) => {
        this.selectLoadingDepend = false;
        this.serviceList =res.return_data;
        console.log('serviceList', res);
      },
      errRes => {
        this.selectLoadingDepend = false;
      }
      );
    }
  // ======================== form submit start ===================
    onSubmit(form:NgForm){
      console.log("this.file",this.file);
      
      console.log("add form submit >", form.value);
      this.form_submit_text = 'Submitting';
      // get form value
      let formData = new FormData();
      for (let val in form.value) {
        if(form.value[val] == undefined){
          form.value[val] = '';
        }
        this.model.document = ''
        this.file.append(val, form.value[val]);
      };
      console.log('value >', this.file);
      // this.fd.append('document', this.file);
      if(!form.valid){
        return;
      }
      this.formSubmitSubscribe = this.http.post(this.form_api, this.file).subscribe(
        (response:any) => {
          console.log("add form response >", response);
          if(response.return_status > 0){
            this.form_submit_text = 'Submit';
            this.files = [];
            this.commonUtils.presentToast('success', response.return_message);
            // this.model = {};
            form.reset();
          }
          else{
            this.commonUtils.presentToast('error', response.return_message);
            this.form_submit_text = 'Submit';

          }
        },
        errRes => {
          
          this.form_submit_text = 'Submit';
        }
      );

    }
  // form submit end

  // ----------- destroy subscription start ---------
    ngOnDestroy() {
      if(this.formSubmitSubscribe !== undefined){
        this.formSubmitSubscribe.unsubscribe();
      }
      if(this.uploadSubscribe !== undefined){
        this.uploadSubscribe.unsubscribe();
      }
      if(this.itemsSubscribe !== undefined ){
        this.itemsSubscribe.unsubscribe();
      }
      if(this.getServiceDataSubscribe !== undefined){
        this.getServiceDataSubscribe.unsubscribe();
      }
      if(this.getFooterSubscribe !== undefined ){
        this.getFooterSubscribe.unsubscribe();
      }
      
    }
  // destroy subscription end

}
