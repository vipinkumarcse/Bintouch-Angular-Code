import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { async } from '@angular/core/testing';
import {ToastrManager} from "ng6-toastr-notifications";
import { NgxSpinnerService } from "ngx-spinner";
import {ApiService} from "../api-service/api.service";
import { Platform } from '@angular/cdk/platform';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { coerceStringArray } from '@angular/cdk/coercion';


declare var google:any;
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  dropdownSettings: any;
  addServiceDropSetting: any;
  countryCodeList: Array<any> = [];
  token = 'token';
  lat: any;
  long: any;
  key = 'XThZpPIzIIne69KIjpnF_Tg9mpdoakmw'
  slug='slug_data';
  current_address: any='';
  testBrowser: boolean;
  wazeData: string;
  chromeData: string;
  destination_latitude: any='';
  destination_longitude: any='';
  current_location_latitude: number;
  current_location_longitude: number;
  destination_addressvar: string;

  constructor(
    private toaster: ToastrManager,
    private handler: HttpBackend, private http: HttpClient,
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private platform: Platform,
    )
  
  {
     console.log(this.platform)

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

 redirectToUrl(data:any,slug:string, title:string){
    switch(slug){


      case 'instagram':{
        if(this.platform.ANDROID && this.platform.isBrowser){
          var url :any = `https://www.instagram.com/${data}`;
          var bundlename :any = `instagram://user?username=${data}`;
        }

        else if(this.platform.IOS && this.platform.SAFARI){
    
          var url :any = `https://www.instagram.com/${data}` 
          var  bundlename :any = `https://www.instagram.com/${data}`;
        }

        else{
          var url :any = `https://www.instagram.com/${data}` 
          var  bundlename :any = `https://www.instagram.com/${data}`; 
        }
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }
      case 'tiktok':{


        const url = `https://www.tiktok.com/@${data}` 
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

      // case 'skype':{
      // //  alert(this.platform.IOS)
      // //  alert(this.platform.SAFARI)
     
      //   if(this.platform.isBrowser && this.platform.ANDROID){
      //     var url:any = `https://www.skype.com/en` ; 
      //     var bundlename :any = `skype:${data}?chat`;
      // }

      //   else if(this.platform.IOS == true && this.platform.SAFARI == false){
      //      var url:any = `https://www.skype.com/en/` ;
      //     var bundlename :any = `skype:${data}?chat`;
      //   }

      //   else if(this.platform.IOS==false && this.platform.SAFARI ==true){
          
      //     var url:any = `https://www.skype.com/en/` ;
      //     var bundlename :any = `skype:${data}?chat`;
      //   }

      //   else if(this.platform.IOS==true && this.platform.SAFARI ==true){
          
      //     var url:any = `https://www.skype.com/en/` ;
      //     var bundlename :any = `https://www.skype.com/en/`;
      //   }
       
      //   else{
      //     var url:any = `https://www.skype.com/en/` ;
      //     var bundlename :any = `https://www.skype.com/en/`;
      //   }
        
      // //  alert(url)

      //   let dataUrl = {url,bundlename}; 
      //   return dataUrl;
      // }


      case 'skype':{
    
        if(this.platform.isBrowser && this.platform.ANDROID){
          var url:any = `https://www.skype.com/en` 
          var bundlename :any = `skype:${data}?chat`;
      }

        else if(this.platform.IOS && this.platform.SAFARI){
          var url:any = `https://www.skype.com/en`
          var bundlename:any = `skype://`;

          // var bundlename:any = `skype:https://web.skype.com/${data}?chat`;

          // skype:https://web.skype.com/harish.kumar986?chat
        }


        // else if(this.platform.SAFARI){
        //   var url:any = `https://www.skype.com/en`
        //   var bundlename :any = `https://www.skype.com/en`;
        // }
        else{
          var url:any = `https://www.skype.com/en` 
          var bundlename :any = `https://www.skype.com/en`;
        }

       // alert(url)
        // alert(bundlename)
        
      
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }

      case 'behance':{
        var mydata = data;
        if(mydata.includes('https://')){
          var pathname = mydata.split('https://')[1];
          var url:any = "https://www.behance.net/" +  pathname;
          var bundlename :any = "https://www.behance.net/" +  pathname;
        } 
        else{
        var url:any = "https://www.behance.net/" + mydata;
        var bundlename :any = "https://www.behance.net/" + mydata;

        }
        
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }
      case 'facebook':{
        // debugger
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
          // if(mydata.includes('https:')){
          //   var pathname1 = mydata.split('facebook.com/')[1];
          //   var url:any = `${data}` 
          //   // var bundlename:any = "https://www.facebook.com/" + pathname1;
          //   var bundlename :any = `fb://facewebmodal/f?href=${data}`;
          // } 
     
        }
        else{
          var url:any = `${data}` 
          var bundlename :any = `${data}`;
        }
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
      // case 'youtube':{
      //   // const url = `https://www.youtube.com/channel/${data}` 
      //  // const url = `https://www.youtube.com` 
      //  // const bundlename :any = `youtube://https://www.youtube.com`;

      //   // const bundlename :any = `https://www.youtube.com/channel/${data}`;
      //   if(this.platform.ANDROID && this.platform.isBrowser){
      //     console.log('welcome')
      //     var url:any = `${data}` 
      //     var bundlename :any = `youtube://${data}`;
      //   } 

      //   else if(this.platform.IOS){
      //     var url:any = `${data}` 
      //     var  bundlename :any = `youtube://${data}`;
      //   }

      //   else{
      //     var url:any = `${data}` 
      //     var  bundlename :any = `${data}`;
      //   }
      //    let dataUrl = {url,bundlename};  
      //   return dataUrl;
      // }

      case 'youtube':{

        if(this.platform.ANDROID && this.platform.isBrowser){
        

         console.log(data)
          var mydata = data
          
          if(mydata.includes('watch?v=')){
            var pathname = mydata.split('watch?v=')[1];
          }

           else{
            var pathname = mydata.split('youtu.be/')[1];

           }
        //    var pathname1 = pathname.split('.tumblr.com')[0];
        //    console.log(pathname1)          
           var url:any = `${data}` 
          var bundlename :any = "https://www.youtube.com/watch?v="+pathname ;
          }
        
          else if(this.platform.IOS){
            var mydata = data
            if(mydata.includes('watch?v=')){
              var pathname = mydata.split('watch?v=')[1];
           }
 
            else{
                var pathname = mydata.split('youtu.be/')[1];
 
            }
           var url:any = `${data}` 
           var bundlename :any = "https://www.youtube.com/watch?v="+pathname ;
       }
        
        else{

          var mydata = data
          if(mydata.includes('watch?v=')){
            var pathname = mydata.split('watch?v=')[1];
         }
          else{
              var pathname = mydata.split('youtu.be/')[1];

          }
          var url:any = `${data}` 
          var bundlename :any = "https://www.youtube.com/watch?v="+pathname ;;
        }
      
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }



      case 'youtubeMusic':{
        const url = `${data}` 
        const bundlename :any = `${data}`;

        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      // case 'linkedin':{
      //   if(this.platform.ANDROID && this.platform.isBrowser){
      //     var url:any = `${data}`
      //     var bundlename :any = `linkedin://${data}`;

      //   }
      //   else if(this.platform.IOS){
      //     var url:any = `${data}`
      //     var bundlename :any = `linkedin://${data}`;
      //   }
      //   else{
      //     var url:any = `${data}`
      //     var bundlename :any = `${data}`;
      //   }

      //   let dataUrl = {url,bundlename};  
      //   return dataUrl;
      // }


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
          var url:any = `${data}`
          var bundlename :any = `${data}`;
        }
    
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }

      // case 'wifi':{
      //   if(this.platform.ANDROID && this.platform.isBrowser){
      //     var url:any = `${data}`
      //     var bundlename :any = `linkedin://${data}`;
    
      //   }
      //   else if(this.platform.IOS && this.platform.SAFARI){
    
      //       var url:any = `${data}` 
      //       var mydata = data
      //       // if(mydata.includes('https:')){
      //       //     var pathname = mydata.split('https://')[1];
      //       //   } 
      //         if(mydata.includes('https:')){
      //           var pathname = mydata.split('linkedin.com/in/')[1];
      //           var bundlename :any = "https://www.linkedin.com/in/" + pathname;
                
      //           }
      //         else{
      //           var bundlename :any = "linkedin://" + pathname;
                 
      //            }
         
      //   }
      //   else{
      //     var url:any = `${data}`
      //     var bundlename :any = `${data}`;
      //   }
    
      //   let dataUrl = {url,bundlename};  
      //   return dataUrl;
      // }

   
      case 'devianArt':{
        if(this.platform.ANDROID && this.platform.isBrowser){
          console.log('welcome')
          var url:any = `https://www.deviantart.com/${data}` 
          var bundlename :any = `DeviantArt://profile/${data}`;
        } 

        else if(this.platform.IOS && this.platform.SAFARI){
          var url:any = `https://www.deviantart.com/${data}` 
          var bundlename :any = `https://www.deviantart.com/${data}`;
        }

        // else if(this.platform.SAFARI){
        //   var url:any = `https://www.deviantart.com/${data}` 
        //   var bundlename :any = `https://www.deviantart.com/${data}`;
        // }

        else{
        var url:any = `https://www.deviantart.com/${data}` 
        var  bundlename :any = `https://www.deviantart.com/${data}`; 
        }

        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      // case 'pinterest':{
      //  // debugger
      //   var url:any = `https://www.pinterest.com/${data}` 
      //   var bundlename :any = `https://www.pinterest.com/${data}`;
      //   let dataUrl = {url,bundlename};  
      //   return dataUrl;
      // }

      case 'pinterest':{
        if(this.platform.ANDROID && this.platform.isBrowser){
          var url:any = `https://www.pinterest.com/${data}` 
          var bundlename :any = `https://www.pinterest.com/${data}`;
          }
        
          else if(this.platform.IOS){
            var url:any = `https://www.pinterest.com/${data}` 
            var bundlename :any = `https://www.pinterest.com/${data}`;
        }
        
        else{
          var url:any = `https://www.pinterest.com/${data}` 
          var bundlename :any = `https://www.pinterest.com/${data}`;
        }
      
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'reddit':{
        if(this.platform.ANDROID && this.platform.isBrowser){
          var url:any = `${data}` 
          var bundlename :any = `reddit://${data}`;
          }
        
          else if(this.platform.IOS){
          var url:any = `${data}` 
          var bundlename :any = `reddit://${data}`;
        }
        
        else{
          var url:any = `https://www.reddit.com/user/${data}` 
          var bundlename :any = `https://www.reddit.com/user/${data}`;
        }
      
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }

      case 'zoom':{
         // var zoomUrl:any = data;

        // if(zoomUrl.includes('https:')){
        //   var path:any = mydata.split('zoom.us/')[1];
        //   var url:any = "";
        //   const bundlename :any = "";
        // }
        const url = `${data}`
        const bundlename :any = `${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }

      // case 'viber':{


      //   if(this.platform.ANDROID && this.platform.isBrowser){

      //     var url:any = `viber://chat?number=${data}` 
      //     var bundlename :any = `viber://chat?number=${data}`;

      //     // var url:any = `viber://contact?number=${data}` 
      //     // var bundlename :any = `viber://contact?number=${data}`;
      //    }
      //    else if(this.platform.IOS){
      //     var url:any = `viber://chat?number=9888273131`
      //     // var url:any = `viber://chat?number=${data}` 
      //     var bundlename :any = `viber://chat?number=9888273131`;
      //     }

      //     else if(this.platform.SAFARI){
      //       var url:any = `https://account.viber.com/contact?number=${data}` 
      //       var bundlename :any = `https://account.viber.com/contact?number=${data}`
      //     }
          
      //     else{
      //       var url:any = `https://account.viber.com/contact?number=${data}` 
      //       var bundlename :any = `https://account.viber.com/contact?number=${data}`
      //     }
      //     let dataUrl = {url,bundlename};  
      //     return dataUrl;
      //  }

      case 'viber':{
        if(this.platform.ANDROID && this.platform.isBrowser){

          var url:any = `viber://chat?number=${data}` 
          var bundlename :any = `viber://chat?number=${data}`;

          // var url:any = `viber://contact?number=${data}` 
          // var bundlename :any = `viber://contact?number=${data}`;
         }
         else if(this.platform.IOS && this.platform.SAFARI){
          // var url:any = `https://account.viber.com/contact?number=${data}` ;
          // // var url:any = `viber://chat?number=9888273131`
          // // var url:any = `viber://chat?number=${data}` 
          // var bundlename :any = `viber://chat?number=${data}`;
            var url:any = `https://account.viber.com/` ;
            var bundlename:any = `viber://chat?number=${data}`;
          }

          // else if(this.platform.SAFARI){
          //   var url:any = `https://account.viber.com/contact?number=${data}` 
          //   var bundlename :any = `https://account.viber.com/contact?number=${data}`

          // }

          // else if(this.platform.SAFARI){
          //   var url:any = `https://account.viber.com/` ;
          //   var bundlename :any = `https://account.viber.com/` ;
          // }
          
          else{
            var url:any = `https://account.viber.com/contact?number=${data}` 
            var bundlename :any = `https://account.viber.com/contact?number=${data}`
          }
          // alert(url)
          // alert(bundlename)
          let dataUrl = {url,bundlename};  
          return dataUrl;
       }
      



      // case 'microsoftTeams':{
      
      //  if(this.platform.ANDROID && this.platform.isBrowser){
      //   var url:any = `${data}` 
      //   var bundlename :any = `msteams://${data}`;
      //  }
        
      //  else if(this.platform.IOS){
      //   var url:any = `${data}` 
      //   var bundlename :any = `msteams://${data}`;
      //   }
        
      //   else{
      //     var url:any = `${data}` 
      //     var bundlename :any = `${data}`;
      //   }
       
      
      //   let dataUrl = {url,bundlename};  
      //   return dataUrl;
      // }

      case 'microsoftTeams':{
      
        if(this.platform.ANDROID && this.platform.isBrowser){
        //  var url:any = `${data}` 
        //  var bundlename :any = `msteams://${data}`;
        var mydata = data
        if(mydata.includes('https:')){
            var teampath = mydata.split('meet/')[1];
            } 
         var url:any = `${data}` 
         var bundlename :any = "https://teams.live.com/meet/" + teampath;
        }
         
        else if(this.platform.IOS && this.platform.SAFARI){
          
          var mydata = data
        if(mydata.includes('https:')){
            var pathname = mydata.split('meet/')[1];
            } 
         var url:any = `${data}` 
         var bundlename :any = "https://teams.live.com/meet/" + pathname;
         }
         
         else{
           var url:any = `${data}` 
           var bundlename :any = `${data}`;
         }
        
       
         let dataUrl = {url,bundlename};  
         return dataUrl;
       }

      // case 'drive':{
      //     if(this.platform.ANDROID && this.platform.isBrowser){
      //   var url:any = `${data}` 
      //   var bundlename :any = `drive://${data}`;
      //     }
      //   else if(this.platform.IOS){
      //   var url:any = `${data}` 
      //   var bundlename :any = `drive://${data}`;
      //   }
      //   else{
      //   var url:any = `${data}` 
      //   var bundlename :any = `${data}`;
      //   }
 
      //   let dataUrl = {url,bundlename};  
      //   return dataUrl

      // }

      case 'drive':{
        if(this.platform.ANDROID && this.platform.isBrowser){
          var mydata = data
          if(mydata.includes('https')){
              var pathname = mydata.split('google.com/')[1];
              } 
        var url:any = `${data}` 
        var bundlename :any = " https://drive.google.com/" + pathname;

      // var url:any = `${data}` 
      // var bundlename :any = `drive://${data}`;
        }
      else if(this.platform.IOS && this.platform.SAFARI){
        var mydata = data
        if(mydata.includes('https')){
            var pathname = mydata.split('google.com/')[1];
            } 
      var url:any = `${data}` 
      var bundlename :any = " https://drive.google.com/" + pathname;
      }
      else{
      var url:any = `${data}` 
      var bundlename :any = `${data}`;
      }

      let dataUrl = {url,bundlename};  
      return dataUrl

    }

      case 'qq':{

        const url = `http://bintouch.harishparas.com/#/slug-profile/${data}` 
        const bundlename :any = `http://bintouch.harishparas.com/#/slug-profile/${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }

      case 'kik':{
        if(this.platform.ANDROID && this.platform.isBrowser){
          var url:any = `https://${data}` 
          var bundlename :any = `https://${data}`;
            }
          else if(this.platform.IOS){
            var url:any = `https://${data}` 
            var bundlename :any = `kik://${data}`;
          }
          else{
          var url:any = `https://${data}` 
          var bundlename :any = `https://${data}`;
          }
   
          let dataUrl = {url,bundlename};  
          return dataUrl
      }

      case 'tumblr':{

        if(this.platform.ANDROID && this.platform.isBrowser){
        

         console.log(data)
          var mydata = data
          
          if(mydata.includes('https')){
            var pathname = mydata.split('https://')[1];
          }

           else{
            var pathname = mydata.split('http://')[1];

           }
           var pathname1 = pathname.split('.tumblr.com')[0];
           console.log(pathname1)          
           var url:any = `${data}` 
          var bundlename :any = "https://"+pathname1 +".tumblr.com";
          }
        
          else if(this.platform.IOS){
            var mydata = data
            if(mydata.includes('https')){
             var pathname = mydata.split('https://')[1];
           }
 
            else{
             var pathname = mydata.split('http://')[1];
 
            }
           var pathname1 = pathname.split('.tumblr.com')[0];          
           var url:any = `${data}` 
          var bundlename :any = "tumblr://x-callback-url/blog?blogName="+ pathname1;
       }
        
        else{
          var url:any = `${data}` 
          var bundlename :any = `${data}`;
        }
      
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }


      
      case 'tinder':{

        if(this.platform.ANDROID && this.platform.isBrowser){
          var url:any = `${data}` 
          var bundlename :any = `tinder://${data}`;
          }
        
          else if(this.platform.IOS){
          var url:any = `${data}` 
          var bundlename :any = `tinder://${data}`;
        }
        
        else{
          var url:any = `${data}` 
          var bundlename :any = `${data}`;
        }
      
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'twitch':{
        const url = `https://www.twitch.tv/${data}`; 
        const bundlename :any = `https://www.twitch.tv/${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }

      case 'indeed':{
        if(this.platform.ANDROID && this.platform.isBrowser){
          var url:any = `${data}` 
          var bundlename :any = `${data}`;
          }
        
          else if(this.platform.IOS){
          var url:any = `${data}` 
          var bundlename :any = `${data}`;
        }

        else if(this.platform.SAFARI){
          var url:any = `${data}` 
          var bundlename :any = `${data}`;
        }
        
        else{
          var url:any = `${data}` 
          var bundlename :any = `${data}`;
        }
      
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }

      // case 'quora':{
    

      //   if(this.platform.ANDROID && this.platform.isBrowser){
      //     var url:any = `${data}` 
      //     var bundlename :any = `quora://${data}`;
      //     }
        
      //     else if(this.platform.IOS){
      //     var url:any = `${data}` 
      //     var bundlename :any = `quora://${data}`;
      //   }
        
      //   else{
      //     var url:any = `${data}` 
      //     var bundlename :any = `${data}`;
      //   }
      
      //   let dataUrl = {url,bundlename};  
      //   return dataUrl;
      // }

      case 'quora':{
    

        if(this.platform.ANDROID && this.platform.isBrowser){
          var url:any = `${data}` 
          var bundlename :any = `quora://${data}`;
          }
        
          else if(this.platform.IOS && this.platform.SAFARI){

            var mydata = data
            if(mydata.includes('https:')){
                var pathname = mydata.split('profile/')[1];
              } 

          var url:any = `${data}` 
          var bundlename :any = "https://www.quora.com/profile/" + pathname;
        }
        
        else{
          var url:any = `${data}` 
          var bundlename :any = `${data}`;
        }
        // alert(pathname)
      
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }


      case 'dribbble':{
      
        if(this.platform.ANDROID && this.platform.isBrowser){
          var url:any = `${data}` 
          var bundlename :any = `${data}`;
          }
        
          else if(this.platform.IOS){
          var url:any = `${data}` 
          var bundlename :any = `${data}`;
        }
        
        else{
          var url:any = `${data}` 
          var bundlename :any = `${data}`;
        }
      
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }

      // case 'spotify':{

      //   if(this.platform.ANDROID && this.platform.isBrowser){
      //     var url:any = `${data}` 
      //     var bundlename :any = `spotify://${data}`;
      //     }
        
      //     else if(this.platform.IOS){
      //     var url:any = `${data}` 
      //     var bundlename :any = `spotify://${data}`;
      //   }
        
      //   else{
      //     var url:any = `${data}` 
      //     var bundlename :any = `${data}`;
      //   }
      
      //   let dataUrl = {url,bundlename};  
      //   return dataUrl;
      // }


      case 'spotify':{
    

        if(this.platform.ANDROID && this.platform.isBrowser){
            var url:any = `${data}` 
            var bundlename :any = `spotify://${data}`;
          }
        
          else if(this.platform.IOS && this.platform.SAFARI){

            var url:any = `${data}` 

            var mydata = data
            if(mydata.includes('https:')){
                var pathname = mydata.split('spotify.com/')[1];
              } 
          var bundlename :any = "https://open.spotify.com/" + pathname;
        }
        
        else{
            var url:any = `${data}` 
            var bundlename :any = `${data}`;
          }
      
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      
      case 'soundcloud':{
        if(this.platform.ANDROID && this.platform.isBrowser){
          var url:any = `${data}` 
          var bundlename :any = `soundcloud://${data}`;
          }
        
          else if(this.platform.IOS){
          var url:any = `${data}` 
          var bundlename :any = `soundcloud://${data}`;
        }
        
        else{
          var url:any = `${data}` 
          var bundlename :any = `${data}`;
        }
      
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

        const url = `http://ir.weibo.com` 
        const bundlename :any = `http://ir.weibo.com`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }

      case 'renren':{
        const url = `http://www.renren.com` 
        const bundlename :any = `http://www.renren.com`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'vimeo':{
        const url = `${data}`
        const mydata = data.split("https://")[1];
        console.log("mydata",mydata);
        
        // const bundlename :any = `vimeo://${mydata}`;
        const bundlename :any = `https://${mydata}`;

        let dataUrl = {url,bundlename};  
        return dataUrl;
      }

      case 'link':{
        const url = `${data}` 
        const bundlename :any = `${data}`;
        localStorage.setItem(slug,JSON.stringify(data));
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }

      // case 'yelp':{
      //   const url = `${data}` 
      //   const bundlename :any = `yelp://${data}`;
      //   let dataUrl = {url,bundlename};  
      //   return dataUrl;
      // }

      // case 'yelp':{
      //   var url:any= `${data}`;
      //   var mydata = data;
      //     if(mydata.includes('https:')){
      //       var pathname = mydata.split('yelp.co.uk/')[1];
      //       }
      //   var bundlename :any = "https://www.yelp.co.uk/" + pathname;
      //   let dataUrl = {url,bundlename};  
      //   return dataUrl;
      // }

      case 'yelp':{
        // debugger
        var a = data;
        if(a.includes('https:')){
          var pathname = a.split('yelp.co.uk/')[1];
          }
        if(this.platform.ANDROID && this.platform.isBrowser){
          var url:any = "https://www.yelp.co.uk/" + pathname;
        var bundlename :any = "https://www.yelp.co.uk/" + pathname;
          }
          else if(this.platform.IOS && this.platform.SAFARI){
            var url:any = `${data}`;
            var mydata = data;
            if(mydata.includes('https:')){
              var pathname = mydata.split('yelp.co.uk/')[1];
              }
          var bundlename :any = "https://www.yelp.co.uk/" + pathname;
        }
    
        else{
          var url:any = `${data}` 
          var bundlename :any = `${data}`;
        }
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      
      case 'trustpilot':{
        const url = `https://www.trustpilot.com` 
        const bundlename :any = `https://www.trustpilot.com`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }

      case 'doctorlib':{
        const url = `https://www.doctolib.fr` 
        const bundlename :any = `https://www.doctolib.fr`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'lost_found':{
        const url = `http://bintouch.harishparas.com/#/slug-profile/${slug}`; 
        const bundlename :any = `http://bintouch.harishparas.com/#/slug-profile/${slug}`;
        localStorage.setItem(slug,JSON.stringify(data));
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'emenu':{
        const url = `http://bintouch.harishparas.com/#/slug-profile/${slug}` 
        const bundlename :any = `http://bintouch.harishparas.com/#/slug-profile/${slug}`;
        localStorage.setItem(slug,JSON.stringify(data));
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
        const url = `googlechrome://${data}` 
        const bundlename :any = `googlechrome://${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }

      
      case 'event':{
        const url = `https://saurabh.parastechnologies.in/BInTouch/api/export_event/?event_id=${data}` 
        const bundlename :any = `https://saurabh.parastechnologies.in/BInTouch/api/export_event/?event_id=${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'contact':{
        const url :any = `http://bintouch.harishparas.com/#/slug-profile/${slug}`;
        const bundlename :any = `http://bintouch.harishparas.com/#/slug-profile/${slug}`;
        localStorage.setItem(slug,JSON.stringify(data));
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }

      case 'wechat':{
        const url :any = `http://bintouch.harishparas.com/#/slug-profile/${slug}`;
        const bundlename :any = `http://bintouch.harishparas.com/#/slug-profile/${slug}`;
        localStorage.setItem(slug,JSON.stringify(data));
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }

      case 'linktree':{
        const url :any = `http://bintouch.harishparas.com/#/slug-profile/${slug}`;
        const bundlename :any = `http://bintouch.harishparas.com/#/slug-profile/${slug}`;
        localStorage.setItem(slug,JSON.stringify(data));
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }
      case 'emergency':{
        const url = `http://bintouch.harishparas.com/#/slug-profile/${slug}`; 
        const bundlename :any = `http://bintouch.harishparas.com/#/slug-profile/${slug}`;
        localStorage.setItem(slug,JSON.stringify(data));
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }

      ///////bhumika work/////////
      case 'whatsApp':{
        const url = `http://api.whatsapp.com/send?phone=${data}&text=Hi` 
        const bundlename :any = `http://api.whatsapp.com/send?phone=${data}&text=Hi`;
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }

      case 'email':{
      const url :any = `mailto:${data}`;   
      const bundlename :any = `mailto:${data}`;
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }

      // case 'messenger':{
      //  let data1 = `${data}`
      //  console.log(data1);
      //  data1.split("=");
      //  let splitdata =  data1.split("=");
      //  console.log(splitdata)
      //   const url = 'http://m.me/'+ splitdata[1];
      //   const bundlename = 'http://m.me/'+ splitdata[1];

      //  let dataUrl = {url,bundlename}; 
      //   return dataUrl;
      // }


      case 'messenger':{
        if(`${data}`.includes("id")){
          let data1 = `${data}`
          console.log(data1);
          data1.split("=");
          let splitdata =  data1.split("=");
          console.log(splitdata)
           // const url = 'https://www.messenger.com/t/' + a[1] 
           var url:any = 'https://www.messenger.com/t/'+ splitdata[1];
           var bundlename:any = 'https://www.messenger.com/t/'+ splitdata[1];
        }

        else{
          var data2 = `${data}`
          console.log(data2);
          var data3=  data2.split("https://www.facebook.com/")[1];
          
           var url:any = 'https://www.messenger.com/t/'+ data3;
           var bundlename:any = 'https://www.messenger.com/t/'+ data3;
  
        }
      
       let dataUrl = {url,bundlename}; 
        return dataUrl;

        // let splitdata =  data1.split("=");
        // console.log(splitdata)
         // const url = 'https://www.messenger.com/t/' + a[1] 

        // const bundlename :any = `fb-messenger://${data}`;
        // const bundlename :any = 'https://www.messenger.com/t/' + a[1];      
        //  const bundlename :any = `fb-messenger://user/${data}`;
        // const bundlename :any = `fb-messenger://share/?link=google.com`;
        //  const bundlename :any = `fb://facewebmodal/f?href=https://www.facebook.com/${data}`;

      }


  
      case 'paypal':{
         if( data.includes ("https://www.paypal.me/")){
          var url:any = `${data}`; 
          var bundlename :any = `${data}`;
        }
        else{
          var url:any = `https://www.paypal.me/${data}`; 
          var bundlename :any = `https://www.paypal.me/${data}`;
        }
       let dataUrl = {url,bundlename}; 
        return dataUrl;
      }
      

      case 'music':{
        const url = `${data}` 
        const bundlename :any = `${data}`;
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }

      case 'notes':{    //missing in ap also
        const url = `mobilenotes://Hi` 
        const bundlename :any = `mobilenotes://Hi`;
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }

      case 'waze':{
        console.log("data",data);
        const mydata = data.split("https")[1]
        console.log("mydata",mydata);
       this.wazeData  = "https" + mydata
       console.log("wazeData",this.wazeData);
        const url = `${this.wazeData}`;
        const bundlename :any = `${this.wazeData}`;
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }

      // case 'tripAdvisor':{

      //   if(this.platform.ANDROID && this.platform.isBrowser){
      //     var url:any = `${data}` 
      //     var bundlename :any = `tripadvisor://${data}`;
      //     }
        
      //     else if(this.platform.IOS){
      //     var url:any = `${data}` 
      //     var bundlename :any = `tripadvisor://${data}`;
      //   }
        
      //   else{
      //     var url:any = `${data}` 
      //     var bundlename :any = `${data}`;
      //   }
      
      //   let dataUrl = {url,bundlename};  
      //   return dataUrl;
      // }

      case 'tripAdvisor':{

        if(this.platform.ANDROID && this.platform.isBrowser){
          var url:any = `${data}` 
          // var bundlename :any = `tripadvisor://${data}`;
           var mydata = data
            if(mydata.includes('https:')){
                var pathname = mydata.split('tripadvisor.')[1];
              }
          var bundlename :any = "https://www.tripadvisor." + pathname;
          // else{
          //    var bundlename :any = "https://www.tripadvisor.com/" + data;
          //    }
          }
        
          else if(this.platform.IOS && this.platform.SAFARI){
            
            var url:any = `${data}`;
            var mydata = data
            if(mydata.includes('https:')){
              var bundlename :any = `${data}`;
              }
            else{
               var bundlename :any = "https://www.tripadvisor.com/" + data;
               }

          //   var mydata = data
          //   if(mydata.includes('https:')){
          //       var pathname = mydata.split('tripadvisor.com/')[1];
          //     }
          // var url:any = `${data}` 
          // var bundlename :any = "https://www.tripadvisor.com/" + pathname;
        }
        
        else{
          var url:any = `${data}` 
          var bundlename :any = `${data}`;
        }
      
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }

      case 'messages':{
        console.log(data, title)

       if(this.platform.IOS && this.platform.SAFARI){
        var url:any = `sms://${title}&body=${data}` 
        var bundlename :any = `sms://${title}&body=${data}`;
       }

       else{
         console.log(data,"");
        var url:any = `sms:${title}&body=${data}` 
        var  bundlename :any = `sms:${title}&body=${data}`;
       }

   let dataUrl = {url,bundlename}; 
       return dataUrl;
     }

//   case 'messages':{
  
//     if(this.platform.IOS && this.platform.SAFARI){
//       var url:any = `sms://${title}&body=${data}`
//       var bundlename :any = `sms://${title}&body=${data}`;
//      }

//     else{
//       var url:any = `sms:${title}?text=${data} `
//       var  bundlename :any = `sms:${title}?text=${data}`;
//      }

// let dataUrl = {url,bundlename}; 
//     return dataUrl;
//   }

      case 'googleMaps':{  
        const url = `http://maps.google.co.in/maps?q=${data}` 
        const bundlename :any = ` http://maps.google.co.in/maps?q=${data}`;
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }

      // case 'chrome':{  
      //   const mydata = data.split("https://")[1];
      //   console.log("myArray",mydata);
      //   var weburl = 'https://' + mydata
      //   const url = `${weburl}`
      //   const bundlename :any = `googlechrome://${mydata}`;
      //   let dataUrl = {url,bundlename};  
      //   return dataUrl;
      // }

      // case 'chrome':{

      //   const mydata = data.split("https://")[1];
      //   console.log("myArray",mydata);
      //   var weburl = 'https://' + mydata
    
      //   if(this.platform.ANDROID && this.platform.isBrowser){
      //     var url:any = `${weburl}` 
      //     var bundlename :any = `googlechrome://${mydata}`;
      //     }
        
      //     else if(this.platform.IOS && this.platform.SAFARI){
            
      //       var url:any = `${data}`;
      //        var a:any = data
      //       if(a.includes('https:')){
      //         var bundlename :any = `${data}`;
      //         }
      //       else{
      //          var bundlename :any = "https://" + data;
      //          }
      //   }
        
      //   else{
      //     var url:any = `${data}` 
      //     var bundlename :any = `${data}`;
      //   }
      
      //   let dataUrl = {url,bundlename};  
      //   return dataUrl;
      // }

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

      case 'safari':{
        const url = `${data}` 
        const bundlename :any = `${data}`;
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }
      case 'lydia':{  
         const url = `https://lydia-app.com` 
        const bundlename :any = ` https://lydia-app.com`;
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }

      case 'paylibb':{  
        const url = `https://www.paylib.fr/activer-paylib/banque-bcp` 
        const bundlename :any = `https://www.paylib.fr/activer-paylib/banque-bcp`;
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }


      case 'maps':{  
        const url = `http://maps.apple.com/?address=${data}`; 
        const bundlename :any = `http://maps.apple.com/?address=${data}`;
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }

      // case 'uber':{  
      //   if (navigator.geolocation) {
      //     navigator.geolocation.getCurrentPosition(position => {
      //      console.log(position)
      //       var currLat = position.coords.latitude;
      //       var currLng = position.coords.longitude;
      //       var geocoder = new google.maps.Geocoder();
      //       var latlng = new google.maps.LatLng(currLat,currLng);
      //       geocoder.geocode({ 'latLng': latlng },  (results:any) =>{
      //         console.log(results)
      //         this.current_address = results[0].formatted_address;
      //         this.httpClient.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + data + '&key=AIzaSyAqgQiVAJGhKtAnUfLfmN6KTnZF-_aUPRY').subscribe((res: any) => {
      //           if (res.status == 'OK') {
      //             this.lat = res.results[0].geometry.location.lat
      //             this.long = res.results[0].geometry.location.lng
      //             console.log(this.lat, this.long)
      //           }
      //         })
      //         console.log(this.current_address)
      //         console.log(typeof(this.current_address))
      //       });
      //    });
      //   }
      //   else {
      //    console.log('err')
      //   }
      //   var p =encodeURI(this.current_address);
      //   var d =encodeURI(`${data}`);
        

      // if(this.platform.ANDROID && this.platform.isBrowser){
      //     var url:any = "https://m.uber.com/ul?client_id=" + this.key + "&action=setPickup&pickup=" + this.current_address +  "&dropoff[latitude]=" + this.lat + "&dropoff[longitude]=" + this.long + "&dropoff[formatted_address]= "+ data 
      //     var bundlename :any = "https://m.uber.com/ul?client_id=" + this.key + "&action=setPickup&pickup=" + this.current_address +  "&dropoff[latitude]=" + this.lat + "&dropoff[longitude]=" + this.long + "&dropoff[formatted_address]= "+ data

      //     }
        
      //     else if(this.platform.IOS){
      //     var url:any = "uber://?client_id=" + this.key + "&action=setPickup&pickup=" + this.current_address +  "&dropoff[latitude]=" + this.lat + "&dropoff[longitude]=" + this.long + "&dropoff[formatted_address]= "+ data
      //     var bundlename :any = "uber://?client_id=" + this.key + "&action=setPickup&pickup=" + this.current_address +  "&dropoff[latitude]=" + this.lat + "&dropoff[longitude]=" + this.long + "&dropoff[formatted_address]= "+ data
      //   }
        
      //   else{
      //     console.log(this.lat,this.long);
      //     var url:any = "https://m.uber.com/ul?client_id=" + this.key + "&action=setPickup&pickup=" + this.current_address +  "&dropoff[latitude]=" + this.lat + "&dropoff[longitude]=" + this.long + "&dropoff[formatted_address]= "+ data
      //     var bundlename :any = "https://m.uber.com/ul?client_id=" + this.key + "&action=setPickup&pickup=" + this.current_address +  "&dropoff[latitude]=" + this.lat + "&dropoff[longitude]=" +this.long + "&dropoff[formatted_address]= "+ data;
      //   }
      
      //   let dataUrl = {url,bundlename};  
      //   return dataUrl;
      // }


      // case 'uber':{  
      //   // if (navigator.geolocation) {
      //   //   navigator.geolocation.getCurrentPosition(position => {
      //   //    console.log(position)
      //   //     var currLat = position.coords.latitude;
      //   //     var currLng = position.coords.longitude;
      //   //     var geocoder = new google.maps.Geocoder();
      //   //     var latlng = new google.maps.LatLng(currLat,currLng);
      //   //     geocoder.geocode({ 'latLng': latlng },  (results:any) =>{
      //   //       console.log(results)
      //   //       this.current_address = results[0].formatted_address;
      //   //       console.log(this.current_address)
      //   //       console.log(typeof(this.current_address))
      //   //     });
      //   //  });
      //   // }
      //   // else {
      //   //  console.log('err')
      //   // }
      //   // var p =encodeURI(this.current_address);
      //   // var d =encodeURI(`${data}`);
       
      //   if(this.platform.ANDROID && this.platform.isBrowser){
      //     // var url:any = `${data}` 
      //     // var bundlename :any = `uber://?client_id=<CLIENT_ID>&action=setPickup&pickup[latitude]=37.775818&pickup[longitude]=-122.418028&pickup[nickname]=UberHQ&pickup[formatted_address]=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103&dropoff[latitude]=37.802374&dropoff[longitude]=-122.405818&dropoff[nickname]=Coit%20Tower&dropoff[formatted_address]=1%20Telegraph%20Hill%20Blvd%2C%20San%20Francisco%2C%20CA%2094133&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d&link_text=View%20team%20roster&partner_deeplink=partner%3A%2F%2Fteam%2F9383`;
      //     var url:any = `${data}` 
      //     var bundlename :any = `${data}`;
      //     }
        
      //     else if(this.platform.IOS){
      //     var url:any = `${data}` 
      //     var bundlename :any = `${data}`;
      //   }
        
      //   else{
      //     var url:any = `${data}` 
      //     var bundlename :any = `${data}`;
      //   }
      
      //   let dataUrl = {url,bundlename};  
      //   return dataUrl;
       
      //   // const url = 'https://m.uber.com/ul'; 
      //   // const bundlename :any = 'uber://https://m.uber.com/ul';
      //   // let dataUrl = {url,bundlename}; 
      //   // return dataUrl;
      // }

      case 'uber':{  
        // Current Location Address
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition( (position => {
            var currLat = position.coords.latitude;
            var currLng = position.coords.longitude;
            this.current_location_latitude = currLat
            this.current_location_longitude = currLng
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(currLat,currLng);
            geocoder.geocode({ 'latLng': latlng },  (results:any) =>{
              console.log(results)
              this.current_address = results[0].formatted_address;
              console.log(this.current_address)
            });
         }));
        //  Destination Address
        var geocoder = new google.maps.Geocoder();
        var destination_address = `${data}` ;
        this.destination_addressvar = destination_address
        geocoder.geocode({ 'address': destination_address },  ( results:any,status:any) =>{
          console.log(results)
          if (status == google.maps.GeocoderStatus.OK) {
            this.destination_latitude = results[0].geometry.location.lat();;
            this.destination_longitude = results[0].geometry.location.lng();
            console.log(this.destination_latitude,this.destination_longitude)
            } 
        });
      }
        // var p =encodeURI(this.current_address);
        // var d =encodeURI(`${data}`);
        if(this.platform.ANDROID && this.platform.isBrowser){
          // var url:any = `${data}` 
          var url:any = "https://m.uber.com/looking?drop[0]={id:ChIJ3bF9wdLtDzkRrCELk-NAhRQ, addressLine1 :"+ this.destination_addressvar+ ",provider : google_places ,locale:en ,latitude:"+this.destination_latitude+",longitude:"+this.destination_longitude+"}&pickup={id:ChIJb4qTRgaDGjkR_DQ_657zZQ0,addressLine1:"+this.current_address+",provider:google_places,locale:en-GB,latitude:"+this.current_location_latitude+",longitude:"+ this.current_location_longitude+ "}&vehicle=a4770b75-bd1d-4c4f-8315-afef635b8b28"          

          var bundlename :any = "uber://?client_id=XThZpPIzIIne69KIjpnF_Tg9mpdoakmw&action=setPickup&pickup[latitude]="+this.current_location_latitude+"&pickup[longitude]="+this.current_location_longitude+"&pickup[nickname]=" + this.current_address + "&pickup[formatted_address]="+this.current_address+"&dropoff[latitude]="+this.destination_latitude+"&dropoff[longitude]="+this.destination_longitude+"&dropoff[nickname]="+this.destination_addressvar+"&dropoff[formatted_address]="+this.destination_addressvar+"&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d" ;
          // var bundlename :any = `${data}`;
          }
          else if(this.platform.IOS){

            var url:any = "https://m.uber.com/looking?drop[0]={id:ChIJ3bF9wdLtDzkRrCELk-NAhRQ, addressLine1 :"+ this.destination_addressvar+ ",provider : google_places ,locale:en ,latitude:"+this.destination_latitude+",longitude:"+this.destination_longitude+"}&pickup={id:ChIJb4qTRgaDGjkR_DQ_657zZQ0,addressLine1:"+this.current_address+",provider:google_places,locale:en-GB,latitude:"+this.current_location_latitude+",longitude:"+ this.current_location_longitude+ "}&vehicle=a4770b75-bd1d-4c4f-8315-afef635b8b28"          
            var bundlename :any = "uber://?client_id=XThZpPIzIIne69KIjpnF_Tg9mpdoakmw&action=setPickup&pickup[latitude]="+this.current_location_latitude+"&pickup[longitude]="+this.current_location_longitude+"&pickup[nickname]="+ this.current_address +"&pickup[formatted_address]="+this.current_address+"&dropoff[latitude]="+this.destination_latitude+"&dropoff[longitude]="+this.destination_longitude+"&dropoff[nickname]="+this.destination_addressvar+"&dropoff[formatted_address]="+this.destination_addressvar+"&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d";


         //  var url:any = "https://m.uber.com/ul?client_id=XThZpPIzIIne69KIjpnF_Tg9mpdoakmw&action=setPickup&pickup[latitude]="+this.current_location_latitude+"&pickup[longitude]="+this.current_location_longitude+"&pickup[nickname]=UberHQ&pickup[formatted_address]="+this.current_address+"&dropoff[latitude]="+this.destination_latitude+"&dropoff[longitude]="+this.destination_longitude+"&dropoff[nickname]="+this.destination_addressvar+"&dropoff[formatted_address]="+this.destination_addressvar+"&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d&link_text=View team roster&partner_deeplink=partner://team/9383";
            //var bundlename :any = "https://m.uber.com/ul?client_id=XThZpPIzIIne69KIjpnF_Tg9mpdoakmw&action=setPickup&pickup[latitude]="+this.current_location_latitude+"&pickup[longitude]="+this.current_location_longitude+"&pickup[nickname]=UberHQ&pickup[formatted_address]="+this.current_address+"&dropoff[latitude]="+this.destination_latitude+"&dropoff[longitude]="+this.destination_longitude+"&dropoff[nickname]="+this.destination_addressvar+"&dropoff[formatted_address]="+this.destination_addressvar+"&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d&link_text=View team roster&partner_deeplink=partner://team/9383";
            //var url:any = "https://m.uber.com/looking?drop[0]={id:ChIJ3bF9wdLtDzkRrCELk-NAhRQ, addressLine1 :"+ this.destination_addressvar+ ",provider : google_places ,locale:en ,latitude:"+this.destination_latitude+",longitude:"+this.destination_longitude+"}&pickup={id:ChIJb4qTRgaDGjkR_DQ_657zZQ0,addressLine1:"+this.current_address+",provider:google_places,locale:en-GB,latitude:"+this.current_location_latitude+",longitude:"+ this.current_location_longitude+ "}&vehicle=a4770b75-bd1d-4c4f-8315-afef635b8b28%22"          
            //var bundlename:any = "https://m.uber.com/looking?drop[0]={id:ChIJ3bF9wdLtDzkRrCELk-NAhRQ, addressLine1 :"+ this.destination_addressvar+ ",provider : google_places ,locale:en ,latitude:"+this.destination_latitude+",longitude:"+this.destination_longitude+"}&pickup={id:ChIJb4qTRgaDGjkR_DQ_657zZQ0,addressLine1:"+this.current_address+",provider:google_places,locale:en-GB,latitude:"+this.current_location_latitude+",longitude:"+ this.current_location_longitude+ "}&vehicle=a4770b75-bd1d-4c4f-8315-afef635b8b28%22"          
          //  var url:any = `${data}` 
            // var bundlename :any = "uber://?client_id='XThZpPIzIIne69KIjpnF_Tg9mpdoakmw'&action=setPickup&pickup[latitude]="+this.current_location_latitude+"&pickup[longitude]="+this.current_location_longitude+"&pickup[nickname]=UberHQ&pickup[formatted_address]="+this.current_address+"&dropoff[latitude]="+this.destination_latitude+"&dropoff[longitude]="+this.destination_latitude+"&dropoff[nickname]=Coit%20Tower&dropoff[formatted_address]="+this.destination_addressvar+"&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d&link_text=View%20team%20roster&partner_deeplink=partner%3A%2F%2Fteam%2F9383";
            // var bundlename :any =  "uber://?client_id=XThZpPIzIIne69KIjpnF_Tg9mpdoakmw&action=setPickup&pickup=my_location&dropoff[formatted_address]=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103"
            // var bundlename :any = "uber://?client_id=XThZpPIzIIne69KIjpnF_Tg9mpdoakmw&action=setPickup&pickup[latitude]="+this.current_location_latitude+"&pickup[longitude]="+this.current_location_longitude+"&pickup[nickname]=UberHQ&pickup[formatted_address]="+this.current_address+"&dropoff[latitude]="+this.destination_latitude+"&dropoff[longitude]="+this.destination_latitude+"&dropoff[nickname]=Coit%20Tower&dropoff[formatted_address]="+this.destination_addressvar+"&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d&link_text=View%20team%20roster&partner_deeplink=partner%3A%2F%2Fteam%2F9383";

          }
        else{
          console.log("data,");
          
          //var url:any = "https://m.uber.com/looking?drop[0] = { 'id': 'XThZpPIzIIne69KIjpnF_Tg9mpdoakmw' , addressLine1 :" + data + ',' +"latitude :" + this.destination_latitude + ',' + "longitude :" + this.destination_longitude + "}&drop[0] = {'id':'ChIJ3bF9wdLtDzkRrCELk-NAhRQ' , 'addressLine1': " + data + ',' +" 'provider' : 'google_places' , 'locale' : 'en' "  + ',' + " 'latitude' :" + this.destination_latitude + ',' + "longitude :" + this.destination_longitude + " } &pickup= { 'id' : 'XThZpPIzIIne69KIjpnF_Tg9mpdoakmw' ,	'addressLine1' : " + this.current_address +  ',' + " 'provider' : 'google_places' , 'locale' : 'en-GB' ,'latitude' :" +  this.current_location_latitude +  ',' +"longitude :"  + 75.85727600000001 + this.current_location_longitude +  "}	&vehicle=a4770b75-bd1d-4c4f-8315-afef635b8b28";
          //var bundlename:any = "https://m.uber.com/looking?drop[0] =  { 'id': 'XThZpPIzIIne69KIjpnF_Tg9mpdoakmw' , addressLine1 :" + data + ',' +"latitude :" + this.destination_latitude + ',' + "longitude :" + this.destination_longitude + "}&drop[0] = {'id':'ChIJ3bF9wdLtDzkRrCELk-NAhRQ' , 'addressLine1': " + data + ',' +" 'provider' : 'google_places' , 'locale' : 'en' "  + ',' + " 'latitude' :" + this.destination_latitude + ',' + "longitude :" + this.destination_longitude + " } &pickup= { 'id' : 'XThZpPIzIIne69KIjpnF_Tg9mpdoakmw' ,	'addressLine1' : " + this.current_address +  ',' + " 'provider' : 'google_places' , 'locale' : 'en-GB' ,'latitude' :" +  this.current_location_latitude +  ',' +"longitude :"  + 75.85727600000001 + this.current_location_longitude +  "}	&vehicle=a4770b75-bd1d-4c4f-8315-afef635b8b28"


        var url:any = "https://m.uber.com/ul?client_id=XThZpPIzIIne69KIjpnF_Tg9mpdoakmw&action=setPickup&pickup[latitude]="+this.current_location_latitude+"&pickup[longitude]="+this.current_location_longitude+"&pickup[nickname]="+this.current_address+"&pickup[formatted_address]="+this.current_address+"&dropoff[latitude]="+this.destination_latitude+"&dropoff[longitude]="+this.destination_latitude+"&dropoff[nickname]="+this.destination_addressvar+"&dropoff[formatted_address]="+this.destination_addressvar+"&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d"; 
      var bundlename:any = "https://m.uber.com/ul?client_id=XThZpPIzIIne69KIjpnF_Tg9mpdoakmw&action=setPickup&pickup[latitude]="+this.current_location_latitude+"&pickup[longitude]="+this.current_location_longitude+"&pickup[nickname]="+this.current_address+"&pickup[formatted_address]="+this.current_address+"&dropoff[latitude]="+this.destination_latitude+"&dropoff[longitude]="+this.destination_latitude+"&dropoff[nickname]="+this.destination_addressvar+"&dropoff[formatted_address]="+this.destination_addressvar+"&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d"; 

          // var url:any =  "https://m.uber.com/looking?drop%5B0%5D=%7B%22id%22%3A%22ChIJUdOiBfPsDzkRxErU6-XW20Y%22%2C%22addressLine1%22%3A%22Cloudnine%20Hospital%20-%20Chandigarh%22%2C%22addressLine2%22%3A%22Plot%20no.%2048%2C%202%2C%20Industrial%20Area%20Phase%20II%2C%20Chandigarh%22%2C%22provider%22%3A%22google_places%22%2C%22locale%22%3A%22en%22%2C%22latitude%22%3A30.70041%2C%22longitude%22%3A76.7875933%7D&pickup=%7B%22id%22%3A%22ChIJb4qTRgaDGjkR_DQ_657zZQ0%22%2C%22addressLine1%22%3A%2294%2C%20near%20Vishkarma%20Mandir%22%2C%22addressLine2%22%3A%22Vishwakarma%20Chowk%2C%20Sant%20Pura%2C%20Industrial%20Area-%20A%2C%20Ludhiana%2C%20Punjab%22%2C%22provider%22%3A%22google_places%22%2C%22locale%22%3A%22en-GB%22%2C%22latitude%22%3A30.9009512%2C%22longitude%22%3A75.85727600000001%7D&vehicle=a4770b75-bd1d-4c4f-8315-afef635b8b28"
          // var bundlename:any =  "https://m.uber.com/looking?drop%5B0%5D=%7B%22id%22%3A%22ChIJUdOiBfPsDzkRxErU6-XW20Y%22%2C%22addressLine1%22%3A%22Cloudnine%20Hospital%20-%20Chandigarh%22%2C%22addressLine2%22%3A%22Plot%20no.%2048%2C%202%2C%20Industrial%20Area%20Phase%20II%2C%20Chandigarh%22%2C%22provider%22%3A%22google_places%22%2C%22locale%22%3A%22en%22%2C%22latitude%22%3A30.70041%2C%22longitude%22%3A76.7875933%7D&pickup=%7B%22id%22%3A%22ChIJb4qTRgaDGjkR_DQ_657zZQ0%22%2C%22addressLine1%22%3A%2294%2C%20near%20Vishkarma%20Mandir%22%2C%22addressLine2%22%3A%22Vishwakarma%20Chowk%2C%20Sant%20Pura%2C%20Industrial%20Area-%20A%2C%20Ludhiana%2C%20Punjab%22%2C%22provider%22%3A%22google_places%22%2C%22locale%22%3A%22en-GB%22%2C%22latitude%22%3A30.9009512%2C%22longitude%22%3A75.85727600000001%7D&vehicle=a4770b75-bd1d-4c4f-8315-afef635b8b28"

          // var url:any = "https://m.uber.com/ul?client_id=XThZpPIzIIne69KIjpnF_Tg9mpdoakmw&action=setPickup&pickup[latitude]="+this.current_location_latitude+"&pickup[longitude]="+this.current_location_longitude+"&pickup[nickname]=UberHQ&pickup[formatted_address]="+this.current_address+"&dropoff[latitude]="+this.destination_latitude+"&dropoff[longitude]="+this.destination_latitude+"&dropoff[nickname]=Coit%20Tower&dropoff[formatted_address]="+this.destination_addressvar+"&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d&link_text=View%20team%20roster&partner_deeplink=partner%3A%2F%2Fteam%2F9383"; 
          // var bundlename:any = "https://m.uber.com/ul?client_id=XThZpPIzIIne69KIjpnF_Tg9mpdoakmw&action=setPickup&pickup[latitude]="+this.current_location_latitude+"&pickup[longitude]="+this.current_location_longitude+"&pickup[nickname]=UberHQ&pickup[formatted_address]="+this.current_address+"&dropoff[latitude]="+this.destination_latitude+"&dropoff[longitude]="+this.destination_latitude+"&dropoff[nickname]=Coit%20Tower&dropoff[formatted_address]="+this.destination_addressvar+"&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d&link_text=View%20team%20roster&partner_deeplink=partner%3A%2F%2Fteam%2F9383"; 
        
          // var url:any = "https://m.uber.com/ul?client_id=XThZpPIzIIne69KIjpnF_Tg9mpdoakmw&action=setPickup&pickup="+this.current_location_latitude+"&dropoff[latitude]="+this.destination_latitude+"&dropoff[longitude]="+this.destination_longitude+"&dropoff[formatted_address]="+this.destination_addressvar; 
          // var bundlename:any = "https://m.uber.com/ul?client_id=XThZpPIzIIne69KIjpnF_Tg9mpdoakmw&action=setPickup&pickup="+this.current_location_latitude+"&dropoff[latitude]="+this.destination_latitude+"&dropoff[longitude]="+this.destination_longitude+"&dropoff[formatted_address]="+this.destination_addressvar; 
        }
        // alert(bundlename)
         
        let  dataUrl = {url,bundlename};  
        console.log(dataUrl)
        return dataUrl;
       
        // const url = 'https://m.uber.com/ul'; 
        // const bundlename :any = 'uber://https://m.uber.com/ul';
        // let dataUrl = {url,bundlename}; 
        // return dataUrl;
      }
      
      case 'mappy':{ 
        const url = `https://fr.mappy.com/plan#/${data}`; 
        const bundlename :any = `https://fr.mappy.com/plan#/${data}`;
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }
      
      case 'googleMeet':{  

        const url = `${data}` 
        const bundlename :any = `${data}`;
 
        let dataUrl = {url,bundlename}; 
        return dataUrl;
      }
   

      case 'botim':{
        const url = `https://web.botim.me/#/${data}` 
        const bundlename :any = `https://botim.me/#/${data}`;
        let dataUrl = {url,bundlename};  
        return dataUrl;
      }

      case 'phone' : { 
         this.spinner.hide();
        const url = `${data}` 
        console.log(url)
        document.location.href = "tel:+"+ url
   
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
  