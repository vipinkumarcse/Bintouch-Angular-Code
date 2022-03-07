import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  privacyData: any;
  history = window.history;

  constructor(private service:ApiService,private common:CommonService) { }

  ngOnInit(): void {
   
    this.getprivacy()
    }
    getprivacy(){
      this.service.getPagesData({slug:'privacy-policy'}).subscribe((res: any) => {
        if (res['success'] == 1) {
        this.privacyData=res.page.content  
        console.log(this.privacyData)
        }
        else {
          this.common.error(res.msg);
    
        }
      })
    }
}
