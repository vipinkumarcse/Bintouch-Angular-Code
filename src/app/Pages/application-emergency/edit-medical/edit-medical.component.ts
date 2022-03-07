import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../application-emergency.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-edit-medical',
  templateUrl: './edit-medical.component.html',
  styleUrls: ['./edit-medical.component.scss']
})
export class EditMedicalComponent implements OnInit {
  editMedicalForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditMedicalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: ApiService,
    private common: CommonService,
    private router: Router,
    public formBuilder: FormBuilder
) {}


  ngOnInit(): void {
    this.editMedicalForm = this.formBuilder.group({
      name: [''],
      details:[''],
      relation:[''],
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(){
    this.dialogRef.close();
    var data = new FormData
    data.append('emergency_id', this.data.id);
    data.append('name', this.editMedicalForm.value.name);
    data.append('details', this.editMedicalForm.value.details);
    data.append('type', this.data.type)
    data.append('relationship', this.editMedicalForm.value.relation)
    this.service.AppMedicalForm(data).subscribe((res: any) => {
      console.log(res)
    })
  }

}
