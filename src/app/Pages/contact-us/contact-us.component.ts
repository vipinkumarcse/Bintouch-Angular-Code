import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  AppContcat: FormGroup;

  constructor(private service: ApiService,
    private common: CommonService,
    private router: Router,
    public formBuilder: FormBuilder,
    public activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.AppContcat = this.formBuilder.group({
      name: [''],   //
      email: [''],  
      phone:[''],
      message:['']
    })
  }

  submit(){
    const formData = new FormData();
    formData.append('name', this.AppContcat.value.name);
    formData.append('email', this.AppContcat.value.email);
    formData.append('phone', this.AppContcat.value.phone);
    formData.append('message', this.AppContcat.value.message);
    this.service.contactUs(formData).subscribe((res: any) => {
      console.log(res);
      if (res.success == '1') {
        this.common.success('successfully submit');
      }else{
        this.common.error(res["msg"]);
      }

    },error=>{

    })

}
}