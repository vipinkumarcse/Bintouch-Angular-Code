import { Component, Inject, Input, OnInit } from '@angular/core';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-application-name',
  templateUrl: './application-name.component.html',
  styleUrls: ['./application-name.component.scss']
})
export class ApplicationNameComponent implements OnInit {
  data: any;
  @Input() fromParent: any;
  EditnameForm: FormGroup

  constructor(private service: ApiService,
    private common: CommonService,
    private modalService: MatDialog,
    public formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<ApplicationNameComponent>,
  ) { }

  ngOnInit(): void {
    this.EditnameForm = this.formBuilder.group({
      title: [''],
      // last_name:[''],
      // first_name:['']
    })
   // if(this.fromParent.slug != 'contact'){
    this.EditnameForm.patchValue({
      title: this.fromParent.name
    })
//  }
  // if(this.fromParent.slug == 'contact'){
  //   let data = this.fromParent.name.split(' ')
  //   console.log(data)
  //   this.EditnameForm.patchValue({
  //     first_name: data[0],
  //     last_name: data[1],
  //   })
  // }
    
  }

  submit() {
    this.spinner.show()
    var data = new FormData
    data.append('slug', this.fromParent.slug);
    data.append('id', this.fromParent.id)
    // if(this.fromParent.slug != 'contact'){
      data.append('title', this.EditnameForm.value.title);
    // }else if(this.fromParent.slug == 'contact'){
    //   data.append('first_name', this.EditnameForm.value.first_name);
    //   data.append('last_name', this.EditnameForm.value.last_name);
    // }
    this.service.editnameApp(data).subscribe((res: any) => {
      console.log()
      this.spinner.hide()
      if (res.http_status == 200) {
        //this.common.success('Successfully edit');
        this.dialogRef.close();
      } else {
        this.common.error(res["msg"]);
      }
    })

  }

  close() {
    this.dialogRef.close();
  }

}
