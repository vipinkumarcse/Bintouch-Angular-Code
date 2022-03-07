import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-application-socialmedia',
  templateUrl: './application-socialmedia.component.html',
  styleUrls: ['./application-socialmedia.component.scss']
})
export class ApplicationSocialmediaComponent implements OnInit {
  serviceIcon: any;
  AppForm: FormGroup
  slug: any;
  name: any;

  constructor(private service: ApiService,
    private common: CommonService,
    private router: Router,
    public formBuilder: FormBuilder,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.AppForm = this.formBuilder.group({
      content: ['', Validators.required],
    })
    this.getServiceBytype()
  }

  getServiceBytype() {
    var data = new FormData
    data.append('type', 'social');
    this.service.get_services_by_type(data).subscribe((res: any) => {
      console.log(res);
      if (res.success == '1') {
        this.serviceIcon = res.services
        console.log(this.serviceIcon)
      }
      console.log(this.serviceIcon)
    })
  }


  submit() {
    if (this.AppForm.value.content) {
      var data = new FormData
      data.append('slug', this.slug);
      data.append('title', this.name);
      data.append('content', this.AppForm.value.content);
      this.spinner.show()
      this.service.AppCommon(data).subscribe((res: any) => {
        console.log(res)
        this.spinner.hide()
        if (res.success == '1') {
          this.AppForm.reset()
          this.router.navigate(['/application'])
          this.common.success(res["msg"]);
        } else {
          this.common.error(res["msg"]);
        }
      }, error => {

      })
    } else {
      this.common.error("Fill the form");
    }
  }

  selectIcon(slug: any, name: any) {
    this.serviceIcon.forEach((element:any) => {
      if(element.slug  == slug){
        element.active = true
      }else{
        element.active = false
      }
      
    });
    this.slug = slug;
    this.name = name;
  }

}
