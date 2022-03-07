import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
declare const $:any
@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent implements OnInit {
  termsData: any;

  constructor(private service:ApiService,private common:CommonService) { }
  history = window.history;

  ngOnInit(): void {

  this.getprivacy()
  }
  getprivacy(){
    this.service.getPagesData({slug:'terms-conditions'}).subscribe((res: any) => {
      if (res['success'] == 1) {
      this.termsData=res.page.content  
      console.log(this.termsData)
      }
      else {
        this.common.error(res.msg);
  
      }
    })
  }
}