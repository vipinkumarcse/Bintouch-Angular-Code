import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-application-link',
  templateUrl: './application-link.component.html',
  styleUrls: ['./application-link.component.scss']
})
export class ApplicationLinkComponent implements OnInit {
  AppForm: FormGroup;
  eventId: any;
  id: any;
  slug: any;

  constructor(private service: ApiService,
    private common: CommonService,
    private router: Router,
    public formBuilder: FormBuilder,
    public activeroute: ActivatedRoute,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.AppForm = this.formBuilder.group({
      content: ['', Validators.required],
    })

    this.activeroute.params.subscribe((params:any) => {
      this.id = params['id'];
      this.slug = params['slug'];
      if(this.id){
      this.getDetails()
      }
    })
  }

  submit() {
    if (this.AppForm.value.content) {
      var data = new FormData
      data.append('content', this.AppForm.value.content);
      data.append('slug', 'link');
      data.append('title', 'Link');
      // data.append('slug', 'email')
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
      this.common.error("Fill the Form");
    }
  }

  getDetails(){
    const formData = new FormData();
    formData.append('id', this.id);
    formData.append('slug', this.slug);
    this.service.getServiceDetail(formData).subscribe((response: any) => {
      console.log(response)
      if(response.success == 1){
        this.eventId = response.item.id;
        this.AppForm.patchValue({
          content:response.item.content,
        })
      }
    })
  }

}
