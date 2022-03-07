import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import { ApiService } from '../../services/api-service/api.service';
import {  ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common/common.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-app-link-tree',
  templateUrl: './app-link-tree.component.html',
  styleUrls: ['./app-link-tree.component.scss']
})
export class AppLinkTreeComponent implements OnInit {

  linkTree:any=[];
  buttonStyle:any;
  buttonback:any;
  title:any='';
  bio:any='';
  coverImg:any;
  profileImg:any;
  slugImg = environment.service_icons;
  imgUrl = environment.slug_images;
  round_icons = environment.round_icons
  pageBack:any;
  otherLinks:any=[];
  socialLinks:any=[];
  iconStyle:any;
  bioTextColor:any;
  imageUrl:any

  constructor(private router:Router,
    private auth: ApiService, 
    private route: ActivatedRoute, private common: CommonService, private modalService: NgbModal) {
    const data = localStorage.getItem('linktree');
    if(data){
      this.linkTree = JSON.parse(data);
       }else{
      this.router.navigate(['/']);
    }console.log(this.linkTree)
   }

  ngOnInit(): void {
    this.makeData();
  }

  makeData(){
    this.buttonStyle = (this.linkTree.button_style  == 'rounded') ? '20px' : '10px';
  //  this.buttonback = (this.linkTree.button_color == '') ? '#fff' : this.linkTree.button_color;
  this.buttonback = this.linkTree.button_color
    // this.title = this.linkTree.title;
    // this.bio = this.linkTree.bio;
    this.coverImg = this.imgUrl+this.linkTree.cover_photo;
   // this.pageBack = (this.linkTree.bg_color == '') ? '#ffff' : this.linkTree.bg_color;
   this.pageBack =  this.linkTree.bg_color;
    this.profileImg = this.imgUrl+this.linkTree.photo;
    this.iconStyle = this.linkTree.icon_style;
    this.bioTextColor =  (this.linkTree.text_color == '') ? '#000' : this.linkTree.text_color;
    this.imageUrl = (this.linkTree.button_style  == 'rounded') ? this.round_icons : this.slugImg;

    (this.linkTree.links || []).map((e:any)=>{
      if(e.type == 'social'){
        this.socialLinks.push(e);
      }else{
        this.otherLinks.push(e);
      }
    })
// console.log('other links',this.otherLinks);
// /    console.log('social links',this.socialLinks);
  }


  onImgError(event:any){
    event.target.src = '../../../assets/images/def_app.png';
  }


  redirectToUrl(url: any) {
    console.log(url)
    if (url) {
       window.open(url, '_blank')?.focus();
    }
  }


  onSocial(url: any, slug: string) {
    this.common.showSpinner();
    const slugData = this.socialLinks.find((e: any) => { return e.slug === slug });
    let data = { 'profile_user_id': slugData.user_id, 'slug': slugData.slug, 'service_id': slugData.id };

    const formData = new FormData();

    formData.append('profile_user_id', slugData.user_id);
    formData.append('slug', slugData.slug);
    formData.append('service_id', slugData.id);

    this.auth.saveUserServicesClicks(formData).subscribe((response: any) => {
      console.log(response)
      // console.log(response,"=======");return
      if (response.success == 1) {
        this.common.hideSpinner();
        console.log(url, slug)

        const { url: weburl, bundlename }: any = this.common.redirectToUrl(url, slug,"");
        this.deeplink(weburl, bundlename);
      }
    }, (e) => {
      this.common.hideSpinner();
    })
  }


  deeplink(url: string, bundlename: string) {
    console.log(url, bundlename)
    let ua = navigator.userAgent.toLowerCase();
    let isAndroid = ua.indexOf("android") > -1; // android check
    console.log(isAndroid)
    let isIphone = ua.indexOf("iphone") > -1; // ios check
    console.log(isIphone)
      if (isIphone == false) {
      let app = {
        launchApp: function () {
          setTimeout(function () {
           window.open(url, '_blank')?.focus();
          }, 25);
         window.open(bundlename,'_blank')?.focus();
        },
        openWebApp: function () {
       window.open(url, '_blank')?.focus();
        }
      };
      app.launchApp();
    } else if (isAndroid == false) {
      let app = {
        launchApp: function () {
          window.open(bundlename,'_blank')?.focus();
          setTimeout(this.openWebApp, 500);
        },
        openWebApp: function () {
         window.open(url, '_blank')?.focus();
        }
      };
      app.launchApp();
    } 
    else {
      console.log(url)
   window.open(url, '_blank')?.focus();
    }
  }


}
