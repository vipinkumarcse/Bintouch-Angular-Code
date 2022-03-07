import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api-service/api.service';
import {ActivatedRoute,Router} from '@angular/router';
import {CommonService} from '../../services/common/common.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-qr-app-service',
  templateUrl: './qr-app-service.component.html',
  styleUrls: ['./qr-app-service.component.scss']
})
export class QrAppServiceComponent implements OnInit {

  imgUrl = environment.slug_images;
  file:any;
  fileName:any; 
  fileType:any; //1------>image,2----->file

  constructor(private common:CommonService,private route:ActivatedRoute,private router:Router,private auth:ApiService) {
    const data = localStorage.getItem('lost_found');
    this.common.showSpinner();
    this.route.params.subscribe((res: any) => {
      (!res)
      ? this.router.navigate(['/'])
      : this.getServiceCode(res);
    })
   }

  ngOnInit(): void {
  }

  getServiceCode(res:any){
    // console.log(res,"===============");
    this.auth.getQrservices(res).subscribe((response:any)=>{
      this.common.hideSpinner();
      if(response['success'] == 1){
        if(response.item){
          const file_name = response.item.file_name;
          
          let data = file_name.split('.').pop();

          if ((data == 'jpg') || (data == 'jpeg') || (data == 'png') || (data == 'gif')) {
            this.fileType = 1;
          }else{
            // console.log(data,"it is of type file");
            this.fileType = 2;
          }
          this.fileName = response.item.file_name;
          this.file = this.imgUrl + response.item.file_name;
          console.log(this.file);
          // console.log(data)
        }
      }
    },(e)=>{
      this.common.hideSpinner();
      this.common.error('Error')
    })

  }

  onView(){
    if(this.file){
      window.location.href = this.file;
    }else{
      this.common.error('File not present');
    }
  }

}
 