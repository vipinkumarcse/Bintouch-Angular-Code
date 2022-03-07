import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private common:CommonService,private service:ApiService,private router:Router) { }

  ngOnInit(): void {
  }
  Signup(data:NgForm){
    let token:any = localStorage.getItem('deviceToken')
    console.log(data.form.value,"data")
    if (!data.form.value.checkbox)
    return this.common.error('Please agree with terms and conditions')
   var fd =new FormData
    fd.append('username',data.form.value.username )
    fd.append('email',data.form.value.email)
    fd.append('device_id','')
    fd.append('registration_device','web')
    fd.append('device_name','web')
    fd.append('password',data.form.value.password)
    fd.append('device_token', token)

    this.service.signupUser(fd).subscribe((res: any) => {
      if (res['success'] == 1) {
        localStorage.setItem("B-in-Touch", JSON.stringify(res["user"]));
        localStorage.setItem("token", res['user'].token);
        this.common.success(res.msg);
        this.router.navigate(['/dashboard'])        

      }
      else {
        this.common.error(res.msg);
  
      }
    })
  }
}

