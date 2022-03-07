import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api-service/api.service';
import {Router,ActivatedRoute} from '@angular/router';
import {CommonService} from '../../services/common/common.service';
import {environment} from '../../../environments/environment';



@Component({
  selector: 'app-nfc-tag',
  templateUrl: './nfc-tag.component.html',
  styleUrls: ['./nfc-tag.component.scss']
})
export class NfcTagComponent implements OnInit {


  isnoData=false;

  constructor(private auth:ApiService,private router:Router,private route:ActivatedRoute,private common:CommonService) { 
    this.common.showSpinner();
    this.route.params.subscribe((res: any) => {
      (!res)
      ? this.router.navigate(['/'])
      : this.getNfcTagInfo(res);
    })
  }

  ngOnInit(): void {
    console.log("hello enter nfc")

  }


  getNfcTagInfo(res:any){

    let data = {'tag_id':res.id};
    this.scanCount(res)
    this.auth.getNfcInfo(data).subscribe((response:any)=>{
      if(response['success'] == 1){
         console.log(response)
          if(response.item){
            if(response.item.data.length == 0){
              this.isnoData = true;  
              this.common.error('No Data Found');
              this.common.hideSpinner();
              return
            }else{
              console.log(response.item.data+ ","+response.item.slug)
              console.log(response.item.slug)
              if((response.item.slug == 'lost_found') || (response.item.slug == 'emergency') || (response.item.slug == 'linktree') || (response.item.slug == 'emenu') || (response.item.slug == 'contact')){
                console.log(response.item.data,response.item.slug)
                // console.log('iam in==================');
                const data:any = this.common.redirectToUrl(response.item.data,response.item.slug,'');
                if(data){
                  window.location.href = data.url;
                }else{
                  this.common.error('Somthing went wrong'); 
                  this.common.hideSpinner();
                }
              }else if(response.item.slug == 'event'){
                const encodedId = btoa(response.item.id);
                const data:any = this.common.redirectToUrl(encodedId,response.item.slug,'');
                // console.log(data,"===============");return
                if(data){
                  this.common.success('File downloaded successfully');
                  window.location.href = data.url;
                }else{
                  this.common.error('Somthing went wrong');
                  this.common.hideSpinner();
                }
                }else if(response.item.slug == 'email'){   // pending work.
                  const encodedId = btoa(response.item.id);
                  const data:any = this.common.redirectToUrl(encodedId,response.item.slug,'');
                  // console.log(data,"===============");return
                  }
                else{

                  let serviceData = {'profile_user_id':response.item.data.user_id,'slug':response.item.data.slug, 'service_id':response.item.data.id};
                  
                  this.auth.saveUserServicesClicks(serviceData).subscribe((response:any)=>{
                    if(response.success == 1){
                      const data:any = this.common.redirectToUrl(response.item.data.content,response.item.slug,'');  
                      // console.log(data);return;
                      if(data){
                        window.location.href = data.url;
                      }else{
                        this.common.error('Somthing went wrong');
                        this.common.hideSpinner();
                      }
                    }  
                  
                  })
              }             
            }            
          }else{
            this.router.navigate(['/profile', response.username])
          }
        this.common.hideSpinner();
      }else{
        // if(response.msg == 'Tag ID not found.'){
          this.common.error(response.msg);
          this.isnoData = true;
        // }
        this.common.hideSpinner();
      }
    },(e)=>{
      this.common.hideSpinner();
    })
  }


  scanCount(res:any){   // calaculate the count of card scan
    let data = {'tag_id':res.id};
    this.auth.totalScan(data).subscribe((response:any)=>{

    })
  }

}
