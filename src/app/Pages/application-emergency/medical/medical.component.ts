import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../application-emergency.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['./medical.component.scss']
})
export class MedicalComponent implements OnInit {
  MedicalForm:FormGroup

  constructor(
    public dialogRef: MatDialogRef<MedicalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: ApiService,
    public formBuilder: FormBuilder
){}

  ngOnInit(): void {
    console.log(this.data)
      this.MedicalForm = this.formBuilder.group({
      name: [''],
      details:[''],
      relation:[''],
    })
    this.MedicalForm.patchValue({
      name:this.data.editData.name,
      details:this.data.editData.details,
      relation:this.data.editData.relationship
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(){
    console.log(this.data)
    this.dialogRef.close();
    if(this.MedicalForm.value.name){
    var data = new FormData
    data.append('emergency_id', this.data.id);
    data.append('name', this.MedicalForm.value.name);
    data.append('details', this.MedicalForm.value.details);
    data.append('type', this.data.type)
    data.append('relationship', this.MedicalForm.value.relation)
    if(this.data.editData.id){
    data.append('id', this.data.editData.id)
  }
    this.service.AppMedicalForm(data).subscribe((res: any) => {
      console.log(res)
    })
  }
}
}
