import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IonContent, Platform, ModalController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-enrollmentform',
  templateUrl: './enrollmentform.page.html',
  styleUrls: ['./enrollmentform.page.scss'],
})
export class EnrollmentformPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;
  fd = new FormData();
  main_url = environment.apiUrl;
  file_url = environment.fileUrl;
  footer: any;
  files: any[];
  selectLoadingDepend: boolean;
  selectLoading;
  uploadLoader: boolean;
  maritalStatus = [
    {
      name: "Married",
      id: 1
    },
    {
      name: "Unmarried",
      value: 2
    },
  ];
  travel_history:any={};
  uncheckCheckbox: boolean;
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
        this.form_api = 'get-enrolment-form';
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
     // ========= datepicker start =======
  datePickerObj: any = {
    dateFormat: 'DD/MM/YYYY', // default DD MMM YYYY
    closeOnSelect: true,
    yearInAscending: true
  };
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
    selectedArray :any = [];
    LeltsSelected(e){
      console.log(e.target.value,e.target.checked);
      
      if (e.target.checked == true) {
         this.selectedArray.push(e.target.value);
       } else {
        for (let index = 0; index < this.selectedArray.length; index++) {
          const element = this.selectedArray[index];
          if(this.selectedArray[index] == e.target.value)
          {
           this.selectedArray.splice(index,1);
           console.log(this.selectedArray[index],e.target.value,index);
           
          }
        }
      }
      console.log(this.selectedArray);
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
        // this.file.append(val, form.value[val]);
      };
      var alldata = form.value;
      console.log('value >', this.file);
      if(!form.valid){
        return;
      }
      var from = [],to = [],city = [], country = [],reason = [];
      // from value push
      from.push(form.value.from1);from.push(form.value.from2);from.push(form.value.from3);from.push(form.value.from4);from.push(form.value.from5);
      to.push(form.value.to1);to.push(form.value.to2);to.push(form.value.to3);to.push(form.value.to4);to.push(form.value.to5);
      city.push(form.value.city1);city.push(form.value.city2);city.push(form.value.city3);city.push(form.value.city4);city.push(form.value.city5);
      country.push(form.value.country1);country.push(form.value.country2);country.push(form.value.country3);country.push(form.value.country4);country.push(form.value.country5);
      reason.push(form.value.reason1);reason.push(form.value.reason2);reason.push(form.value.reason3);reason.push(form.value.reason4);reason.push(form.value.reason5);
     
      // var data1:any = {
      //   from:from,
      //   to:to,
      //   city:city,
      //   country:country,
      //   reason:reason,
      // }
      var data:any = [{from:from},{to:to},{city:city},{country:country},{reason:reason}];
      // data.push(data1);
      formData.append('email',form.value.email);
      formData.append('service_type',form.value.service_type);
      formData.append('phone_no',form.value.phone_no);
      formData.append('first_name',form.value.first_name);
      formData.append('last_name',form.value.last_name);
      formData.append('date_of_birth',form.value.date_of_birth);
      formData.append('marital_status',form.value.marital_status);
      formData.append('current_status',form.value.current_status);
      formData.append('citizenship',form.value.citizenship);
      formData.append('canadian_edu_campus',form.value.canadian_edu_campus);
      formData.append('foreign_education',form.value.foreign_education);
      formData.append('current_employee',form.value.current_employee);
      formData.append('blood_ralative',form.value.blood_ralative);
      formData.append('medical_last_1yr',form.value.medical_last_1yr);
      formData.append('address',form.value.address);
      formData.append('file_type',form.value.file_type);
      formData.append('gv_file',form.value.gv_file);
      formData.append('biometrics',form.value.biometrics);
      formData.append('ielts',this.selectedArray);
      formData.append('travel_history',JSON.stringify(data));      
      this.formSubmitSubscribe = this.http.post(this.form_api, formData).subscribe(
        (response:any) => {
          console.log("add form response >", response);
          if(response.return_status > 0){
            this.form_submit_text = 'Submit';
            this.files = [];
            this.commonUtils.presentToast('success', response.return_message);
            // this.model = {};
            this.uncheckCheckbox = false;
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
