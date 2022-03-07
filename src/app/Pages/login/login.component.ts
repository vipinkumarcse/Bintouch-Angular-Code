import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api.service';
// import { LocalStorageService } from 'angular-web-storage';
import { CommonService } from 'src/app/services/common/common.service';
// import { CommonService } from 'src/app/services/common/common.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private service:ApiService,private common:CommonService) { }
  body = {
  phone:'',
  email:''
  }
  submitted: boolean = false;

  ngOnInit(): void {
  }

  login(loginForm:any){
  let token:any = localStorage.getItem('deviceToken')
    var fd=new FormData
    fd.append('username',loginForm.form.value.email);
    fd.append('password',loginForm.form.value.password)
    fd.append('device_id','')
    fd.append('device_name','web')
    fd.append('device_token',token)


    console.log("dash")
    loginForm.submitted = true
   // setTimeout(() => {
      this.service.login(fd).subscribe((res: any) => {
        if (res["success"]==1) {
          // this.common.hideSpinner();
          localStorage.setItem("B-in-Touch", JSON.stringify(res["user"]));
          localStorage.setItem("token", res['user'].token);
          this.common.success(res["msg"]);
          this.router.navigate(['/application'])
        } else {
          // this.common.hideSpinner();
          this.common.error(res["msg"]);
        }
      },
        err => {
          // this.common.hideSpinner();
          // this.common.error(err.error["message"]);
        }
      );
   // }, 1000);
  }
signup(){
  this.router.navigate(['/sign_up'])
}
}
