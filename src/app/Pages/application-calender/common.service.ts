import { Injectable } from '@angular/core';
import {ToastrManager} from "ng6-toastr-notifications";
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from 'src/app/services/api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  dropdownSettings: any;
  addServiceDropSetting: any;
  countryCodeList: Array<any> = [];
  token = 'token';

  constructor(
    private toaster: ToastrManager,
    private api: ApiService,
    private spinner: NgxSpinnerService
  )
  
  {
    this.dropdownSettings = {
      enableCheckAll: false,
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: false
    };
    this.addServiceDropSetting = this.dropdownSettings;
    this.addServiceDropSetting.singleSelection = true;
  }

  success(message: string): void {
    this.toaster.successToastr(message, '', {maxShown:  1},);
  }
  error(message: string): void {
    this.toaster.errorToastr(message, '', {
        maxShown: 1
      }
    );
  }

  getToken(): any {
    try {
        return localStorage.getItem(this.token);
    } catch (e) { }
    return null;
  }

  redirectToUrl(data:any,slug:string){
    switch(slug){
      case 'instagram':{
        const url :any = `https://www.instagram.com/${data}`;
        const bundlename :any = `instagram://user?username=${data}`;
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }
      case 'tiktok':{
        const url = `https://www.tiktok.com/@${data}`;
        const bundlename :any = `https://www.tiktok.com/@${data}`;
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }
      case 'snapchat':{
        const url = `https://www.snapchat.com/add/${data}` 
        const bundlename :any = `https://www.snapchat.com/add/${data}`;
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }
      case 'facebook':{
        const url = `${data}` 
        const bundlename :any = `fb://facewebmodal/f?href=${data}`;
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }
      case 'twitter':{
        const url = `https://twitter.com/${data}`;
        const bundlename :any = `https://twitter.com/${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'youtube':{
        const url = `https://www.youtube.com/channel/${data}` 
        const bundlename :any = `https://www.youtube.com/channel/${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'linkedin':{
        const url = `https://www.linkedin.com/in/${data}` 
        const bundlename :any = `https://www.linkedin.com/in/${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'behance':{
        const url = `${data}` 
        const bundlename :any = `${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'devianArt':{
        const url = `${data}` 
        const bundlename :any = `${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'pinterest':{
        const url = `https://www.pinterest.com/${data}` 
        const bundlename :any = `https://www.pinterest.com/${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'reddit':{
        const url = `${data}` 
        const bundlename :any = `${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'tumblr':{
        const url = `${data}` 
        const bundlename :any = `${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'tinder':{
        const url = `${data}` 
        const bundlename :any = `${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'twitch':{
        const url = `${data}` 
        const bundlename :any = `${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'quora':{
        const url = `${data}` 
        const bundlename :any = `${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'dribbble':{
        const url = `${data}` 
        const bundlename :any = `${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'qzone':{
        const url = `${data}` 
        const bundlename :any = `${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'weibo':{
        const url = `${data}` 
        const bundlename :any = `${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'renren':{
        const url = `${data}` 
        const bundlename :any = `${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'doctorlib':{
        const url = `${data}` 
        const bundlename :any = `${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'lost_found':{
        const url = `http://bintouch.harishparas.com/#/lost-profile/${data}` 
        const bundlename :any = `http://bintouch.harishparas.com/#/lost-profile/${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'calendar':{
        const url = `${data}` 
        const bundlename :any = `${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'cv':{
        const url = `${data}` 
        const bundlename :any = `${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'event':{
        const url = `http://bintouch.harishparas.com/#/event-profile/${data}` 
        const bundlename :any = `http://bintouch.harishparas.com/#/event-profile/${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'contact':{
        const url = `http://bintouch.harishparas.com/#/contact-profile/${data}` 
        const bundlename :any = `http://bintouch.harishparas.com/#/contact-profile/${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'linktree':{
        const url = `http://bintouch.harishparas.com/#/linkTree-profile/${data}` 
        const bundlename :any = `http://bintouch.harishparas.com/#/linkTree-profile/${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'emergency':{
        const url = `http://bintouch.harishparas.com/#/emergency-profile/${data}` 
        const bundlename :any = `http://bintouch.harishparas.com/#/emergency-profile/${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
    }

  }

  showSpinner(): void {
    this.spinner.show();
  }
  hideSpinner(): void {
    this.spinner.hide();
  }

  ref():void{
  }
}
  