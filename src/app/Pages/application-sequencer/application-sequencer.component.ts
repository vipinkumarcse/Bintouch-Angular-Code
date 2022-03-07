import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-application-sequencer',
  templateUrl: './application-sequencer.component.html',
  styleUrls: ['./application-sequencer.component.scss']
})
export class ApplicationSequencerComponent implements OnInit {
  @Output() emitFormControl = new EventEmitter<FormControl>();
  smartobjects: any;
  applicationDetails: any;
  appShow: boolean = false
  sequenceForm: FormGroup;
  array: any = [];
  arrayShow: any = []

  constructor(private spinner: NgxSpinnerService, private service: ApiService, private common: CommonService, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.Smartobject();
    this.applicationData();
    this.get_sequencer()
    this.sequenceForm = this.formBuilder.group({
      timer: [''],
      tag_id: [''],
      applicationid: ['']
    })
  }

  Smartobject() {
    this.service.getuserSmartobject('').subscribe((res: any) => {
      if (res['success'] == 1) {
        this.smartobjects = res.items;
        console.log(this.smartobjects)
      }
      else {
        this.common.error(res.msg);

      }
    })
  }

  applicationData() {
    this.service.getApplicationList('').subscribe((res: any) => {
      if (res.success == 1) {
        this.applicationDetails = res.items
        console.log(this.applicationDetails)
      }
      else {
        this.common.error(res.msg);
      }
    })
  }

  showApp() {
    this.appShow = true
  }

  // dataabc(id:any, slug:any){
  //   console.log(id, slug)

  // }

  submitSequencer() {
    this.spinner.show()
    var data = new FormData
    data.append('timer', this.sequenceForm.value.timer)
    data.append('tag_id', this.sequenceForm.value.tag_id)
    data.append('services', this.array)
    this.service.AppSequencer(data).subscribe((res: any) => {
      this.spinner.hide()
      if (res.success == 1) {
      //  this.get_sequencer()
      }
    })
  }

  getData(id: any) {
    console.log(id)
    this.applicationDetails.forEach((element: any) => {
      if (element.id == id) {
        let anc = {
          "id": element.id,
          "slug": element.slug
        }
        this.arrayShow.push(anc)
        let data: any = element.id + "|" + element.slug
        console.log(data)
        this.array.push(data)
      }
    });
    console.log(this.array)
    console.log(this.arrayShow)
    this.appShow = false
    this.sequenceForm.patchValue({
      applicationid: ''
    })
    this.submitSequencer()
  }

  get_sequencer() {
    this.service.getSequencer('').subscribe((res: any) => {
      console.log(res)
      if (res.success == 1) {
        this.sequenceForm.patchValue({
          timer: res.item[0].timer,
          tag_id: res.item[0].tag_id
        })
        console.log(res.item[0].services)
        let data = res.item[0].services.split(',')
        data.forEach((element: any) => {
          let x = element.split("|")
          let anc = {
            "id": x[0],
            "slug": x[1]
          }
          this.arrayShow.push(anc)
        });
        console.log(this.arrayShow)
        this.array = data
        console.log(this.array)
      }
    })
  }

  delete(index: any) {
    this.arrayShow.splice(index, 1);
    this.array.splice(index, 1)
    console.log(this.array)
    console.log(this.array)
    this.submitSequencer()
  }

  getDatatimer() {
    this.submitSequencer()
  }
}
