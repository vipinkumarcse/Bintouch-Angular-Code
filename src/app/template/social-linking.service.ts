import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SocialLinkingService {

  constructor(private platform: Platform, private spinner: NgxSpinnerService) { }


  redirectToUrl(data: any, slug: string) {

    switch (slug) {

      case 'instagram': {
        if (this.platform.ANDROID && this.platform.isBrowser) {
          var url: any = `https://www.instagram.com/${data}`;
          var bundlename: any = `instagram://user?username=${data}`;
        }
        else if (this.platform.IOS && this.platform.SAFARI) {
          var url: any = `https://www.instagram.com/${data}`
          var bundlename: any = `https://www.instagram.com/${data}`;
        }
        else {
          var url: any = `https://www.instagram.com/${data}`
          var bundlename: any = `https://www.instagram.com/${data}`;
        }
        let dataUrl = { url, bundlename };
        return dataUrl;
      }

      case 'facebook':{
        if(this.platform.ANDROID && this.platform.isBrowser){
          // var fbdata = data;
          // // if(fbdata.includes('https:')){
          // //   var pathname = fbdata.split('facebook.com/')[1];
          // var url:any = `${data}` 
          // var bundlename :any = `fb://profile${data}`;
          //   // var url:any = "http://www.facebook.com/" + pathname ;
          //   // var bundlename :any = "http://www.facebook.com/" + pathname ;
          // // } 
          var a = data
          if(a.includes('id')){
            var userid = a.split("id=")[1]
            console.log(userid)
            var url:any = `${data}`
            // var bundlename :any = `fb://facewebmodal/f?href=${data}`;
             var bundlename :any = `fb://profile/${userid}`; 
                                          
           }
    
           else{
            var url:any = `${data}`
            var bundlename :any = `fb://facewebmodal/f?href=${data}`;

           }
         
      
        }
        else if(this.platform.IOS && this.platform.SAFARI){
          var mydata = data;
          if(mydata.includes('https:')){
            var pathname = mydata.split('facebook.com/')[1];
          } 
      var url:any = `https://www.facebook.com/${data}` 
      var bundlename :any = "https://www.facebook.com/" + pathname;
        }
        else{
          var url:any = `https://www.facebook.com/${data}` 
          var bundlename :any = `https://www.facebook.com/${data}`;
        }
      let dataUrl = {url,bundlename}; 
        return dataUrl;
      }

      case 'linkedin':{
        if(this.platform.ANDROID && this.platform.isBrowser){
          // var url:any = `${data}`
          // var bundlename :any = `linkedin://${data}`;
          var url:any = `${data}` 
            var mydata = data
            // if(mydata.includes('https:')){
            //     var pathname = mydata.split('https://')[1];
            //   } 
              if(mydata.includes('https:')){
                var pathname = mydata.split('linkedin.com/in/')[1];
                var bundlename :any = "https://www.linkedin.com/in/" + pathname;
                
                }
              else{
                var bundlename :any = "linkedin://" + pathname;
                 
                 }
          
    
        }
        else if(this.platform.IOS && this.platform.SAFARI){
    
            var url:any = `${data}` 
            var mydata = data
            // if(mydata.includes('https:')){
            //     var pathname = mydata.split('https://')[1];
            //   } 
              if(mydata.includes('https:')){
                var pathname = mydata.split('linkedin.com/in/')[1];
                var bundlename :any = "https://www.linkedin.com/in/" + pathname;
                
                }
              else{
                var bundlename :any = "linkedin://" + pathname;
                 
                 }
         
        }
        else{
          var url:any = `https://www.linkedin.com/in/${data}`
          var bundlename :any = `https://www.linkedin.com/in/${data}`;
        }
    
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }

      case 'youtube': {
        if (this.platform.ANDROID && this.platform.isBrowser) {
          var mydata = data
          if (mydata.includes('watch?v=')) {
            var pathname = mydata.split('watch?v=')[1];
          }
          else {
            var pathname = mydata.split('youtu.be/')[1];
          }
          var url: any = `${data}`
          var bundlename: any = "https://www.youtube.com/watch?v=" + pathname;
        }
        else if (this.platform.IOS) {
          var mydata = data
          if (mydata.includes('watch?v=')) {
            var pathname = mydata.split('watch?v=')[1];
          }
          else {
            var pathname = mydata.split('youtu.be/')[1];
          }
          var url: any = `${data}`
          var bundlename: any = "https://www.youtube.com/watch?v=" + pathname;
        }
        else {
          var mydata = data
          if (mydata.includes('watch?v=')) {
            var pathname = mydata.split('watch?v=')[1];
          }
          else {
            var pathname = mydata.split('youtu.be/')[1];
          }
          var url: any = `${data}`
          var bundlename: any = "https://www.youtube.com/watch?v=" + pathname;;
        }
        let dataUrl = { url, bundlename };
        return dataUrl;
      }

      case 'tiktok': {
        const url = `https://www.tiktok.com/@${data}`
        const bundlename: any = `https://www.tiktok.com/@${data}`;
        let dataUrl = { url, bundlename };
        return dataUrl;
      }

      case 'snapchat': {
        const url = `https://www.snapchat.com/add/${data}`
        const bundlename: any = `https://www.snapchat.com/add/${data}`;
        let dataUrl = { url, bundlename };
        return dataUrl;
      }

      case 'messenger': {
        if (`${data}`.includes("id")) {
          let data1 = `${data}`
          console.log(data1);
          data1.split("=");
          let splitdata = data1.split("=");
          console.log(splitdata)
          var url: any = 'https://www.messenger.com/t/' + splitdata[1];
          var bundlename: any = 'https://www.messenger.com/t/' + splitdata[1];
        }
        else {
          var data2 = `${data}`
          console.log(data2);
          var data3 = data2.split("https://www.facebook.com/")[1];
          var url: any = 'https://www.messenger.com/t/' + data3;
          var bundlename: any = 'https://www.messenger.com/t/' + data3;
        }
        let dataUrl = { url, bundlename };
        return dataUrl;
      }

      case 'lydia': {
        const url = `https://lydia-app.com`
        const bundlename: any = ` https://lydia-app.com`;
        let dataUrl = { url, bundlename };
        return dataUrl;
      }

      case 'paypal': {
        if (data.includes("https://www.paypal.me/")) {
          var url: any = `${data}`;
          var bundlename: any = `${data}`;
        }
        else {
          var url: any = `https://www.paypal.me/${data}`;
          var bundlename: any = `https://www.paypal.me/${data}`;
        }
        let dataUrl = { url, bundlename };
        return dataUrl;
      }

      case 'email': {
        const url: any = `mailto:${data}`;
        const bundlename: any = `mailto:${data}`;
        let dataUrl = { url, bundlename };
        return dataUrl;
      }

      // case 'chrome': {
      //   if (this.platform.ANDROID && this.platform.isBrowser) {
      //     var url: any = `${data}`
      //     var bundlename: any = `googlechrome://${data}`;
      //   }
      //   else if (this.platform.IOS && this.platform.SAFARI) {

      //     var url: any = `${data}`
      //     var mydata = data
      //     if (mydata.includes('https:')) {
      //       var pathname = mydata.split('https://')[1];
      //       var bundlename: any = "googlechrome://" + pathname;
      //     }
      //     else {
      //       var bundlename: any = "https://" + pathname;
      //     }
      //   }
      //   else {
      //     var url: any = `${data}`
      //     var bundlename: any = `${data}`;
      //   }
      //   let dataUrl = { url, bundlename };
      //   return dataUrl;
      // }

      case 'whatsApp': {
        const url = `http://api.whatsapp.com/send?phone=${data}&text=Hi`
        const bundlename: any = `http://api.whatsapp.com/send?phone=${data}&text=Hi`;
        let dataUrl = { url, bundlename };
        return dataUrl;
      }

      case 'zoom': {
        const url = `${data}`
        const bundlename: any = `${data}`;
        let dataUrl = { url, bundlename };
        return dataUrl;
      }

      case 'chrome':{
        if(this.platform.ANDROID && this.platform.isBrowser){
          var url:any = `${data}` 
          var bundlename :any = `googlechrome://${data}`;
          }
          else if(this.platform.IOS && this.platform.SAFARI){

            var url:any = `${data}` 
            var mydata = data
            // if(mydata.includes('https:')){
            //     var pathname = mydata.split('https://')[1];
            //   } 
              if(mydata.includes('https:')){
                var pathname = mydata.split('https://')[1];
                var bundlename :any = "googlechrome://" + pathname;
                }
              else{
                 var bundlename :any = "https://" + pathname;
                 }
         
        }

        else{
          var url:any = `${data}` 
          var bundlename :any = `${data}`;
        }
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }

      case 'googleMaps':{  
        const url = `http://maps.google.co.in/maps?q=${data}` 
        const bundlename :any = ` http://maps.google.co.in/maps?q=${data}`;
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }

      case 'twitter':{

        if(this.platform.ANDROID && this.platform.isBrowser){
          var url :any = `https://twitter.com/${data}`;
          var bundlename :any = `twitter://user?screen_name=${data}`;
        }

        else if(this.platform.IOS && this.platform.SAFARI){
          var url :any = `https://twitter.com/${data}`;
          // var bundlename :any = `twitter://user?screen_name=${data}`;
          var bundlename :any = `https://twitter.com/${data}`;

        }

        else{
          var url :any = `https://twitter.com/${data}` 
          var  bundlename :any = `https://twitter.com/${data}`; 
        }
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }

      case 'maps':{  
        const url = `http://maps.apple.com/?address=${data}`; 
        const bundlename :any = `http://maps.apple.com/?address=${data}`;
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }


      case 'phone': {
        const url = `${data}`
        console.log(url)
        document.location.href = "tel:+" + url

      }
    }
  }

}
