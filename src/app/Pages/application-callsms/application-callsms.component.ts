import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-application-callsms',
  templateUrl: './application-callsms.component.html',
  styleUrls: ['./application-callsms.component.scss']
})
export class ApplicationCallsmsComponent implements OnInit {
  AppForm: FormGroup;
  slug: any;
  id: any;
  eventId: any;

  constructor(private service: ApiService,
    private common: CommonService,
    private router: Router,
    public formBuilder: FormBuilder,
    public activeroute: ActivatedRoute,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.activeroute.params.subscribe((params:any) => {
      this.id = params['id'];
      this.slug = params['slug'];
      if(this.id){
      this.getDetails()
      }
    })
    this.AppForm = this.formBuilder.group({
      content: [''],
      title: [''],
      option:['']
      // slug:['']
    })
  }

  submit() {
    if (this.AppForm.value.title) {
      console.log(this.AppForm.value)
      let title = this.AppForm.value.title?this.AppForm.value.title:'Call & SMS'
      var data = new FormData
      data.append('slug', this.slug);
      data.append('title', title);
      data.append('content', this.AppForm.value.content);
      data.append('id', this.eventId)
      this.spinner.show()
      this.service.AppCommon(data).subscribe((res: any) => {
        this.spinner.hide()
        console.log(res)
        if (res.success == '1') {
          this.AppForm.reset()
          this.router.navigate(['/application'])
          this.common.success(res["msg"]);
        } else {
          this.common.error(res["msg"]);
        }
      })
    } else {
      this.common.error("Fill the form");
    }
  }

  select(data: any) {
    console.log(data)
    this.slug = data
  }

  
  getDetails(){
    const formData = new FormData();
    formData.append('id', this.id);
    formData.append('slug', this.slug);
    this.service.getServiceDetail(formData).subscribe((response: any) => {
      console.log(response)
      if(response.success == 1){
        this.eventId = response.item.id;
       // this.fileuploaddata
        this.AppForm.patchValue({
          title: response.item.title,
          content:response.item.content,
          option:response.item.slug
        })
      }      
    })
  }

  
}

