import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api.service';
import {environment} from '../../../environments/environment';
import {CommonService} from '../../services/common/common.service';

@Component({
  selector: 'app-contact-app-page',
  templateUrl: './contact-app-page.component.html',
  styleUrls: ['./contact-app-page.component.scss']
})
export class ContactAppPageComponent implements OnInit {

  contact:any=[];
  slugImg = environment.service_icons;
  imgUrl = environment.imageUrl;
  baseUrl = environment.baseURL;
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

  constructor(private auth:ApiService, private router:Router,private route:ActivatedRoute,private common:CommonService) { 
    const data = localStorage.getItem('contact');
    (data) ? this.contact = JSON.parse(data) :  this.router.navigate(['/']);
  }

  ngOnInit(): void {
    
    this.makeData();
    console.log("hello enter new page")
    // this.route.params.subscribe((res: any) => {
  
    //   (!res)
    //   ? this.router.navigate(['/'])
    //   : this.getNfcTagInfo(res);
    //   console.log(res)
    // })
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


  addContact(){
    if(this.contact.contact_id){
      const encodedStringBtoA = btoa(this.contact.contact_id);
     window.location.href = `${this.baseUrl}/export_contact/?contact_id=${encodedStringBtoA}`;
     this.common.success('File Downloaded Successfully');
    }
  }


  onImgError(event:any){
    event.target.src = '../../../assets/images/def_app.png';
  }

  // getNfcTagInfo(res:any){

  //   let data = {'tag_id':res.id};
    
  //   this.auth.getNfcInfo(data).subscribe((response:any)=>{
  //     if(response['success'] == 1){
  //        console.log(response)
  //         if(response.item){
  //           if(response.item.data.length == 0){
  //             this.isnoData = true;  
  //             this.common.error('No Data Found');
  //             this.common.hideSpinner();
  //             return
  //           }else{
  //             if((response.item.slug == 'lost_found') || (response.item.slug == 'emergency') || (response.item.slug == 'linktree') || (response.item.slug == 'emenu') || (response.item.slug == 'contact')){
  //               // console.log('iam in==================');
  //               const data:any = this.common.redirectToUrl(response.item.data,response.item.slug);
  //               if(data){
  //                 window.location.href = data.url;
  //               }else{
  //                 this.common.error('Somthing went wrong'); 
  //                 this.common.hideSpinner();
  //               }
  //             }else if(response.item.slug == 'event'){
  //               const encodedId = btoa(response.item.id);
  //               const data:any = this.common.redirectToUrl(encodedId,response.item.slug);
  //               // console.log(data,"===============");return
  //               if(data){
  //                 this.common.success('File downloaded successfully');
  //                 window.location.href = data.url;
  //               }else{
  //                 this.common.error('Somthing went wrong');
  //                 this.common.hideSpinner();
  //               }
  //               }else{

  //                 let serviceData = {'profile_user_id':response.item.data.user_id,'slug':response.item.data.slug, 'service_id':response.item.data.id};
                  
  //                 this.auth.saveUserServicesClicks(serviceData).subscribe((response:any)=>{
  //                   if(response.success == 1){
  //                     const data:any = this.common.redirectToUrl(response.item.data.content,response.item.slug);  
  //                     // console.log(data);return;
  //                     if(data){
  //                       window.location.href = data.url;
  //                     }else{
  //                       this.common.error('Somthing went wrong');
  //                       this.common.hideSpinner();
  //                     }
  //                   }  
                  
  //                 })
  //             }             
  //           }            
  //         }

  //       this.common.hideSpinner();
  //     }else{
  //       if(response.msg == 'Tag ID not found.'){
  //         this.common.error(response.msg);
  //         this.isnoData = true;
  //       }
  //       this.common.hideSpinner();
  //     }
  //   },(e)=>{
  //     this.common.hideSpinner();
  //   })
  // }

}