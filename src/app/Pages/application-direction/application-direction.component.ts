import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-application-direction',
  templateUrl: './application-direction.component.html',
  styleUrls: ['./application-direction.component.scss']
})
export class ApplicationDirectionComponent implements OnInit {
  AppForm: FormGroup
  eventId: any;
  id: any;
  slug: any;

  constructor(private service: ApiService,
    private common: CommonService,
    private router: Router,
    public formBuilder: FormBuilder,
    public activeroute: ActivatedRoute,
    private spinner: NgxSpinnerService) { 
      this.activeroute.params.subscribe((params:any) => {
        this.id = params['id'];
        this.slug = params['slug'];
        if(this.id){
        this.getDetails()
        }
      })
    }

  ngOnInit(): void {
    this.AppForm = this.formBuilder.group({
      content: ['', Validators.required],
    })
  }

  submit() {
    this.spinner.show()
    if (this.AppForm.value.content) {
      var data = new FormData
      if(this.eventId){
        data.append('id', this.eventId)
      }
      data.append('slug', 'googleMaps');
      data.append('title', 'Google Maps');
      data.append('content', this.AppForm.value.content);
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
      this.spinner.hide()
      this.common.error("Fill the address field");
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
          content:response.item.content
        })
      }
    })
  }

}
