import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-application-event',
  templateUrl: './application-event.component.html',
  styleUrls: ['./application-event.component.scss']
})
export class ApplicationEventComponent implements OnInit {
  EventForm: FormGroup
  id: any;
  slug: any;
  eventId: any;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public showSeconds = false;
  public date: moment.Moment;

  constructor(private service: ApiService,
    private common: CommonService,
    private router: Router,
    public formBuilder: FormBuilder,
    public activeroute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { 
    this.activeroute.params.subscribe((params:any) => {
      this.id = params['id'];
      this.slug = params['slug'];
      if(this.id){
      this.getDetails()
      }
    })
  }

  ngOnInit(): void {
    // title, start_date, end_date, address_line1, address_line2, postcode, city, state, country, url, description, type(primary), id(for update)
    this.EventForm = this.formBuilder.group({
      title: [''],
      start_date: [''],
      end_date: [''],
      address_line1: [''],
      address_line2: [''],
      postcode: [''],
      city: [''],
      state: [''],
      country: [''],
      url: [''],
      description: [''],
      type: [''],
      id: [''],
    })
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
        this.EventForm.patchValue({
          title: response.item.title,
          start_date:response.item.start_date,
          end_date:response.item.end_date,
          address_line1: response.item.address_line1,
          address_line2:response.item.address_line2,
          postcode: response.item.postcode,
          city: response.item.city,
          state: response.item.state,
          country: response.item.country,
          url:response.item.url,
          description: response.item.description,
          type: response.item.type,
        //  id:response.item.id,
        })
      }
      console.log(this.EventForm.value)
      
    })
  }

  submit() {
    console.log(this.EventForm)
    console.log(this.EventForm.value.start_date, this.EventForm.value.start_date)
    let stateDate  = moment(this.EventForm.value.start_date).format('YYYY-MM-DD hh:mm:ss');
    let endDate  = moment(this.EventForm.value.end_date).format('YYYY-MM-DD hh:mm:ss');
    let title = this.EventForm.value.title?this.EventForm.value.title:'Event'
    if (this.EventForm.value.title) {
      var data = new FormData
      if (this.eventId) {
        data.append('id', this.eventId);
      }
      data.append('title', title);
      data.append('start_date', stateDate);
      data.append('end_date', endDate);
      data.append('address_line1', this.EventForm.value.address_line1);
      data.append('address_line2', this.EventForm.value.address_line2);
      data.append('postcode', this.EventForm.value.postcode);
      data.append('city', this.EventForm.value.city);
      data.append('state', this.EventForm.value.state);
      data.append('country', this.EventForm.value.country);
      data.append('url', this.EventForm.value.url);
      data.append('description', this.EventForm.value.description);
      this.spinner.show()
      this.service.AppEvent(data).subscribe((res: any) => {
        console.log(res);
        this.spinner.hide()
        if (res.success == '1') {
          this.EventForm.reset()
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
}
