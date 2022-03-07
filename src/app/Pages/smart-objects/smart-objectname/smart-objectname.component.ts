import { Component, Inject, Input, OnInit } from '@angular/core';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-smart-objectname',
  templateUrl: './smart-objectname.component.html',
  styleUrls: ['./smart-objectname.component.scss']
})
export class SmartObjectnameComponent implements OnInit {
  data: any;
  @Input() fromParent: any;
  EditnameForm: FormGroup

  constructor(private service: ApiService,
    private common: CommonService,
    private modalService: MatDialog,
    public formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<SmartObjectnameComponent>) { }

    ngOnInit(): void {
      console.log(this.fromParent)
      this.EditnameForm = this.formBuilder.group({
        title: [''],
      })
      this.EditnameForm.patchValue({
        title: this.fromParent.name
      })
    }
  
    submit() {
      this.spinner.show()
      var data = new FormData
      data.append('tag_id', this.fromParent.id)
      // if(this.fromParent.slug != 'contact'){
        data.append('tag_name', this.EditnameForm.value.title);
      // }else if(this.fromParent.slug == 'contact'){
      //   data.append('first_name', this.EditnameForm.value.first_name);
      //   data.append('last_name', this.EditnameForm.value.last_name);
      // }
      this.service.EditSmartObject(data).subscribe((res: any) => {
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
