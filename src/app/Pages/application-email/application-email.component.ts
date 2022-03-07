import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-application-email',
  templateUrl: './application-email.component.html',
  styleUrls: ['./application-email.component.scss']
})
export class ApplicationEmailComponent implements OnInit {
  AppEmail: FormGroup

  constructor(private service: ApiService,
    private common: CommonService,
    private router: Router,
    public formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
    
    ) { }

  ngOnInit(): void {
    this.AppEmail = this.formBuilder.group({
      email: ['', Validators.required],
      message: ['', Validators.required],
      subject: ['', Validators.required],
    })
  }

  submit() {
    if (this.AppEmail.value.email) {
      console.log(this.AppEmail.value.email+'?subject='+this.AppEmail.value.subject+'&body='+this.AppEmail.value.subject)
      var data = new FormData
      data.append('title', 'Email');
      data.append('slug', 'email');
      data.append('content', this.AppEmail.value.email+'?subject='+this.AppEmail.value.subject+'&body='+this.AppEmail.value.subject);
      // data.append('message', this.AppEmail.value.message);
      // data.append('subject', this.AppEmail.value.subject);
      // data.append('slug', 'email')
      this.spinner.show()
      this.service.AppCommon(data).subscribe((res: any) => {
        console.log(res)
        this.spinner.hide()
        if (res.success == '1') {
          this.AppEmail.reset()
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

}
