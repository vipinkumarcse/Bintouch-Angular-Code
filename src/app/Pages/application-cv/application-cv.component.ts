import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-application-cv',
  templateUrl: './application-cv.component.html',
  styleUrls: ['./application-cv.component.scss']
})
export class ApplicationCvComponent implements OnInit {
  AppForm: FormGroup
  file: any;
  type: any;
  id: any;
  slug: any;
  eventId: any;

  constructor(private service: ApiService,
    private common: CommonService,
    private router: Router,
    public formBuilder: FormBuilder,
    public activeroute: ActivatedRoute,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.AppForm = this.formBuilder.group({
      content: ['', Validators.required],
      upload: [''],
      link: [''],
      file_name:['']
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
    if (this.type) {
      if (this.type == 'upload' && this.file) {
        this.AppForm.patchValue({
          content: ''
        })
      } else if (this.type == 'link' && this.AppForm.value.content) {
        this.file = ''
      }
      console.log(this.AppForm.value)
      var data = new FormData
      data.append('slug', 'cv');
      data.append('title', 'CV');
      data.append('content', this.AppForm.value.content);
      data.append('file_name', this.file)
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
      this.common.error('Select one option you upload the CV or Add link');
    }
  }

  select(value: any) {
    console.log(value)
    this.type = value;
  }

  selectfile(event: any) {
    console.log(event);
    var that = this;
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.file = event.target.files[0];
      console.log(this.file)
      reader.onload = (_event) => {
        this.AppForm.patchValue({
          file_name:reader.result
        })
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
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

