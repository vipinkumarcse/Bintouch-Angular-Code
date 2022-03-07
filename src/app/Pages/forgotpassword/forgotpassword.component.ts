import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private service:ApiService,private common:CommonService,private router:Router) { }

  ngOnInit(): void {
  }
  Forgot(form:NgForm){
    this.service.forgotPassword({email:form.form.value.email,'type':'web'}).subscribe((res: any) => {
      if (res['success'] == 1) {
        this.common.success(res.msg);
        this.router.navigate(['/'])

      }
      else {
        this.common.error(res.msg);
  
      }
    })
  }


}
