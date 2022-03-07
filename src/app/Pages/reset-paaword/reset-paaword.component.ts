import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-reset-paaword',
  templateUrl: './reset-paaword.component.html',
  styleUrls: ['./reset-paaword.component.scss']
})
export class ResetPaawordComponent implements OnInit {
  params: any;

  constructor(private service:ApiService,private common:CommonService,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      this.params = res;
      console.log(this.params,"parasm");
    });
  }
    Forgot(form:NgForm){
      var fd =new FormData
      fd.append('user_id',this.params.id)
      fd.append('email_token',this.params.token)
      fd.append('password',form.form.value.password)

      this.service.resetPassword(fd).subscribe((res: any) => {
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
