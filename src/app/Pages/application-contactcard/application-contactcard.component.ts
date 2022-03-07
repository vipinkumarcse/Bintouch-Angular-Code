import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any
@Component({
  selector: 'app-application-contactcard',
  templateUrl: './application-contactcard.component.html',
  styleUrls: ['./application-contactcard.component.scss']
})
export class ApplicationContactcardComponent implements OnInit {
  AppContcat: FormGroup;
  serviceIcon:any=[]
  contcatfile: any ;
  file: any;
  filephoto: any;
  imgURLProfile: any;
  coverPhoto: any;
  fileuploaddata: any;
  id: any;
  slug: any;
  contactId:any
  Appname: FormGroup;

  constructor(private service: ApiService,
    private common: CommonService,
    private router: Router,
    public formBuilder: FormBuilder,
    public activeroute: ActivatedRoute,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.activeroute.params.subscribe((params:any) => {
      this.id = params['id'];
      this.slug = params['slug'];
      if(this.id){
      this.getDetails()
      }
    })

    //file_name(photo)
    this.AppContcat = this.formBuilder.group({
      first_name: [''],   //
      last_name: [''],    //
      dob: [''],   //
      company: [''],  //
      position: [''],
      phone: [''],  //
      work_phone: [''],   //
      email: [''],  //
      website: [''],   //
      address: [''],   //
      postcode: [''],  //
      city: [''],
      country: [''],   //
      note: [''],   //
      cover_photo: [''],
      state:[''],  //
      social_1:[''],  //
      bg_color:[''],  //
      text_color:[''],  //
      btn_color:[''],  //
      template:[1],  //
      icon_style:[''], ///
      middle_name:[''],
      profession:[''], 
      address_line2:[''],   //
      whatsapp:[''],   //
      messenger:[''],  //
      zoom:[''],   //
      facebook:[''],   //
      facebook_page:[''],   //
      twitter:[''],  //
      instagram:[''],  //
      snapchat:[''],  //
      linkedin:[''],  //
      youtube:[''],  //
      tiktok:[''],   //
      document_title:[''],  //
      document_url:[''], 
      document_file:[''], 
      link_title:[''],  //
      link_url:[''], 
      paypal:[''],  //
      lydia:[''],  //
      
    //  bg_color:[], 
    //  text_color, 
    //  btn_color, 
    //  icon_style, 
    //  template 

    })
   // this.getServiceBytype()
    this.AppContcat.patchValue({
      bg_color:'#ffffff',
      text_color:'#000000',
      btn_color:'#5079BF',
      icon_style:'',
      template:'1'
    })

    this.Appname = this.formBuilder.group({
      title: ['Contact Card'],
    })

    console.log(this.AppContcat.value.document_url)
  }

  getDetails(){
    const formData = new FormData();
    formData.append('id', this.id);
    formData.append('slug', this.slug);
    this.service.getServiceDetail(formData).subscribe((response: any) => {
      console.log(response)
      if(response.success == 1){
        this.contactId = response.item.id;
        this.coverPhoto = this.service.contactImages + response.item.cover_photo
        this.imgURLProfile = this.service.contactImages + response.item.photo,
       // this.fileuploaddata
        this.AppContcat.patchValue({
          first_name:response.item.first_name,   //
          last_name: response.item.last_name,    //
          dob: response.item.dob,   //
          company: response.item.company,  //
          position:response.item.position,
          phone:response.item.phone,  //
          work_phone:response.item.work_phone,   //
          email: response.item.email,  //
          website:response.item.website,   //
          address: response.item.address,   //
          postcode: response.item.postcode,  //
          city: response.item.city,
          country:response.item.country,   //
          note: response.item.note,   //
          cover_photo:response.item.cover_photo,
          state:response.item.state,  //
       //   social_1:response.item.social_1,  //
          bg_color:response.item.bg_color,  //
          text_color:response.item.text_color,  //
          btn_color:response.item.btn_color,  //
          template:response.item.template,  //
          icon_style:response.item.icon_style, ///
          middle_name:response.item.middle_name,
          profession:response.item.profession, 
          address_line2:response.item.address_line2,   //
          whatsapp:response.item.whatsapp,   //
          messenger:response.item.messenger,  //
          zoom:response.item.zoom,   //
          facebook:response.item.facebook,   //
          facebook_page:response.item.facebook_page,   //
          twitter:response.item.twitter,  //
          instagram:response.item.instagram,  //
          snapchat:response.item.snapchat,  //
          linkedin:response.item.linkedin,  //
          youtube:response.item.youtube,  //
          tiktok:response.item.tiktok,   //
          document_title:response.item.document_title,  //
          document_url:response.item.document_url, 
         // document_file:response.item.document_file, 
          link_title:response.item.link_title,  //
          link_url:response.item.link_url, 
          paypal:response.item.paypal,  //
          lydia:response.item.lydia, 
        })
      }
      if(response.item.document_url!=''){
        $("#document_file_button").attr("disabled", true);
      }
      else{
        $("#document_file_button").attr("disabled", false);
  
      }
    })

    
  }

  // getServiceBytype(){
  //   var data = new FormData
  //   data.append('type', 'social');
  //   this.service.get_services_by_type(data).subscribe((res: any) => {
  //     console.log(res);
  //     if (res.success == '1') {
  //      // this.serviceIcon = res.services
  //       res.services.forEach((element:any) => {
  //         if(element.data != null){
  //           this.serviceIcon.push(element)
  //         }
  //       });
  //       console.log(this.serviceIcon)
  //     }

  //   })
  // }


  selectImage(event: any) {
    console.log(event);
    var that = this;
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.file= event.target.files[0];
      console.log(this.file)
      reader.onload = (_event) => {
        this.coverPhoto = reader.result;
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }

  selectImagephoto(event: any) {     // set profile photo
    console.log(event);
    var that = this;
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.filephoto = event.target.files[0];
    //  console.log(this.file)
      reader.onload = (_event) => {
        this.imgURLProfile = reader.result;
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }

  submit() {
    let date  = moment(this.AppContcat.value.dob).format('YYYY-MM-DD');
    console.log(date)
    console.log( this.AppContcat.value)
    if(this.AppContcat.value.first_name){
    var data = new FormData
    if (this.contactId) {
      data.append('id', this.contactId);
    }
    console.log(this.AppContcat.value.facebook.replace(/ /g, ""))
    data.append('dob', date);
    data.append('company', this.AppContcat.value.company);
    data.append('position', this.AppContcat.value.position);
    data.append('phone', this.AppContcat.value.phone);
    data.append('work_phone', this.AppContcat.value.work_phone);
    data.append('email', this.AppContcat.value.email);
    data.append('website', this.AppContcat.value.website);
    data.append('address', this.AppContcat.value.address);
    data.append('postcode', this.AppContcat.value.postcode);
    data.append('city', this.AppContcat.value.city);
    data.append('country', this.AppContcat.value.country);
    data.append('note', this.AppContcat.value.note);
    data.append('file_name', this.filephoto);
    data.append('cover_photo', this.file)
    data.append('bg_color', this.AppContcat.value.bg_color);
    data.append('text_color', this.AppContcat.value.text_color);
    data.append('btn_color', this.AppContcat.value.btn_color);
    data.append('template', this.AppContcat.value.template);
    data.append('icon_style', this.AppContcat.value.icon_style);
    data.append('middle_name', this.AppContcat.value.middle_name);
    data.append('profession', this.AppContcat.value.profession);
    data.append('address_line2', this.AppContcat.value.address_line2);
    data.append('whatsapp', this.AppContcat.value.whatsapp);
    data.append('messenger', this.AppContcat.value.messenger.replace(/ /g, ""));
    data.append('zoom', this.AppContcat.value.zoom);
    data.append('facebook', this.AppContcat.value.facebook.replace(/ /g, ""));
    data.append('facebook_page', this.AppContcat.value.facebook_page.replace(/ /g, ""));
    data.append('twitter', this.AppContcat.value.twitter.replace(/ /g, ""));
    data.append('instagram', this.AppContcat.value.instagram.replace(/ /g, ""));
    data.append('snapchat', this.AppContcat.value.snapchat.replace(/ /g, ""));
    data.append('linkedin', this.AppContcat.value.linkedin.replace(/ /g, ""));
    data.append('youtube', this.AppContcat.value.youtube);
    data.append('tiktok', this.AppContcat.value.tiktok.replace(/ /g, ""));
    data.append('document_title', this.AppContcat.value.document_title.replace(/ /g, ""));
    data.append('document_url', this.AppContcat.value.document_url.replace(/ /g, ""));
    data.append('document_file', this.fileuploaddata);
    data.append('link_title', this.AppContcat.value.link_title);
    data.append('paypal', this.AppContcat.value.paypal.replace(/ /g, ""));
    data.append('link_url', this.AppContcat.value.link_url.replace(/ /g, ""));
    data.append('lydia', this.AppContcat.value.lydia.replace(/ /g, ""));
    data.append('state ', this.AppContcat.value.state)
  //  data.append('id', this.contactId)
  this.spinner.show()
    this.service.AppContact(data).subscribe((res: any) => {
      console.log(res)
      this.spinner.hide()
      if (res.success == '1') {
        console.log(res)
        this.contactId = res.contact.id,
        this.appName()
        this.AppContcat.reset()
        this.router.navigate(['/application'])
        this.common.success(res["msg"]);
      } else {
        this.common.error(res["msg"]);
      }
    }, error => {
    })
  }else{
    this.common.error("Fill the form");
  }
  }

  fileUpload(event: any) {
    console.log(event);
    var that = this;
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.fileuploaddata = event.target.files[0];
      if(this.fileuploaddata.name!=''){
        this.AppContcat.controls['document_url'].disable();
    }

      console.log(this.fileuploaddata)
      reader.onload = (_event) => {
       // this.fileData = reader.result;
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }


  appName() {
    this.spinner.show()
    var data = new FormData
    data.append('slug', 'contact');
    data.append('id',  this.contactId)
    data.append('title', this.Appname.value.title);
    this.service.editnameApp(data).subscribe((res: any) => {
      console.log()
      this.spinner.hide()
      if (res.http_status == 200) {
      } 
    })

  }
  checkDocumentUrl(){
    console.log(this.AppContcat.value.document_url)
    if(this.AppContcat.value.document_url!=''){
    //this.AppContcat.controls['document_file'].disable();
    $("#document_file_button").attr("disabled", true);
    
   }
   else{
   // this.AppContcat.controls['document_file'].enable();
    $("#document_file_button").attr("disabled", false);
  
   }
  }

}
