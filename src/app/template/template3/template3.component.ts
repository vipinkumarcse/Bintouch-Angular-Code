import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
import { environment } from 'src/environments/environment';
import { SocialLinkingService } from '../social-linking.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-template3',
  templateUrl: './template3.component.html',
  styleUrls: ['./template3.component.scss']
})
export class Template3Component implements OnInit {
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;
  contact:any=[];
  slugImg = environment.service_icons;
  imgUrl = environment.imageUrl;
  baseUrl = environment.baseURL;
  docUrl = environment.slug_images
  socialLinks:any=[];
  name:string='';
  profImg:any;
  coverImg:any;
  address:any='';
  background:any;
  buttonStyle:any;
  buttonColor:any;
  iconStyle:any;
  textColor:any;
  isnoData: boolean;
  usrImg = environment.imageUrl
  Marker: google.maps.Marker;
  lat: any;
  long: any;

  private httpClient: HttpClient;
  QueryForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public clickingService: SocialLinkingService, private handler: HttpBackend, public link:SocialLinkingService, private auth:ApiService, private router:Router,private route:ActivatedRoute,private common:CommonService) { 
    console.log("Template 2");
    this.httpClient = new HttpClient(handler);
    const data = localStorage.getItem('contact');
    (data) ? this.contact = JSON.parse(data) :  this.router.navigate(['/']);
    this.makeData();
    this.QueryForm = this.formBuilder.group({
      email: [''],
      message: [''],
      subject:[''],
      phone:[''],
      user_id:[''],
      from_email:[]
    })
   }
  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
    this.mapDraw()
  }

  makeData(){
    if(this.contact.length != 0){
      this.name = this.contact.first_name + this.contact.last_name;
      this.profImg = this.imgUrl + this.contact.photo;
      this.address = `${this.contact.address},${this.contact.postcode},${this.contact.city} ${this.contact.country}`;  
      this.background = (this.contact.bg_color == '') ?  '#124496' :this.contact.bg_color ;
      this.buttonStyle = (this.contact.btn_style == 'round') ? '20px' : '0px'; 
      this.buttonColor = (this.contact.btn_color == '') ? '#f5f5f5' : this.contact.btn_color;
      this.coverImg = this.imgUrl + this.contact.cover_photo;
      this.iconStyle  = (this.contact.icon_style ==  'rectangular') ? '0px' : '30px';
      this.textColor = (this.contact.text_color == '') ? '#000' : this.contact.text_color ;
    }
  }


  // addContact(){
  //   if(this.contact.contact_id){
  //     const encodedStringBtoA = btoa(this.contact.contact_id);
  //    window.location.href = `${this.baseUrl}/export_contact/?contact_id=${encodedStringBtoA}`;
  //    this.common.success('File Downloaded Successfully');
  //   }
  // }

  addContact() {
    const token = this.common.getToken();
    if (token) {
      let data = { 'contact_id': this.contact.contact_id };

      this.auth.saveSharedContact(data).subscribe((response: any) => {
        // if (response.success == 1) {
        //   this.common.success(response.msg);
        // } else {
        //   this.common.error(response.msg);
        // }
      }, (e) => {
        this.common.error(e.error.msg);
      })
    }

    if (this.contact.contact_id) {
      const encodedStringBtoA = btoa(this.contact.contact_id);
      window.location.href = `${this.baseUrl}/export_contact/?contact_id=${encodedStringBtoA}`;
    }

  }

  moveToPage() {
    console.log('clicked');
    const encodedName = btoa(this.contact.username);
    this.router.navigate(['/profile-contact-form', encodedName, this.contact.user_id, 'template'])
  }


  onImgError(event:any){
    event.target.src = '../../../assets/images/def_app.png';
  }

  mapDraw() {
    this.httpClient.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.contact.address + ',' + this.contact.address2 + ',' + this.contact.city + ',' + this.contact.postcode + ',' + this.contact.country + '&key=AIzaSyAqgQiVAJGhKtAnUfLfmN6KTnZF-_aUPRY').subscribe((res: any) => {
      if (res.status == 'OK') {
        this.lat = res.results[0].geometry.location.lat
        this.long = res.results[0].geometry.location.lng
        console.log(this.lat, this.long)
        this.Position()
      }
    })
  }

  Position() {
    const mapProperties = {
      center: new google.maps.LatLng(this.lat, this.long),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.Marker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(this.lat, this.long),
    });
  }

  iconsClick(url: any, slug: any) {
    const { url: weburl, bundlename }: any = this.clickingService.redirectToUrl(url, slug);

    this.deeplink(weburl, bundlename);
  }

  deeplink(url: string, bundlename: string) {

    console.log(url, bundlename)

    let ua = navigator.userAgent.toLowerCase();
    let isAndroid = ua.indexOf("android") > -1; // android check

    console.log(isAndroid)

    let isIphone = ua.indexOf("iphone") > -1; // ios check
    console.log(isIphone)
    // if (isIphone == true) {
    if (isIphone == false) {
      let app = {
        launchApp: function () {
          setTimeout(function () {
            //  window.location.href = url;
            window.open(url, '_blank');


          }, 25);
          // window.location.href = bundlename;
          window.open(bundlename, '_blank');

          //which page to open(now from mobile, check its authorization)
        },
        openWebApp: function () {
          //  window.location.href = url;
          window.open(url, '_blank');

        }
      };
      app.launchApp();
      // } else if (isAndroid == true) {
    } else if (isAndroid == false) {

      let app = {
        launchApp: function () {
          window.location.replace(bundlename); //which page to open(now from mobile, check its authorization)
          setTimeout(this.openWebApp, 500);
        },
        openWebApp: function () {
          // window.location.href = url;
          window.open(url, '_blank');

        }
      };
      app.launchApp();
    } else {
      console.log(url)
      // window.location.href = url;
      window.open(url, '_blank');

    }
  }

  file_Title(){
    if(this.contact.document_url){
    window.open(this.contact.document_url , '_blank')
    }
    else{
      window.location.href = this.docUrl+this.contact.document_file //'https://saurabh.parastechnologies.in/BInTouch/public/uploads/user_files/17_1641473825.pdf'//this.docUrl+this.contact.document_file;
    }
  }

  Link_Title(){
    if(this.contact.link_title){
      window.open(this.contact.link_url , '_blank')
      }
  }

  formSbmit(){
   let data ={
     email:this.QueryForm.value.email,
     message:this.QueryForm.value.message,
     subject:this.QueryForm.value.subject,
     phone:this.QueryForm.value.phone,
     user_id :this.contact.user_id
   }
   this.auth.saveSharedContact(data).subscribe((response: any) => {
    if (response.success == 1) {
      this.common.success(response.msg);
    }else{
      this.common.error(response.msg);
    }
   })
  }

}
