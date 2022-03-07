import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common/common.service';
import { ApiService } from '../../services/api-service/api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { MedicalComponent } from './medical/medical.component';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare let $: any;

export interface DialogData {
  type: any;
  id: any;
  text:any;
  editData:{
    name:any,
    id:any,
    details:any;
    relationship:any
  }
}


@Component({
  selector: 'app-application-emergency',
  templateUrl: './application-emergency.component.html',
  styleUrls: ['./application-emergency.component.scss']
})
export class ApplicationEmergencyComponent implements OnInit {

  message: any;
  imagePath: any;
  profileData: any;
  imgURLProfile: any = "assets/images/profile_photo_img.png";
  emergencyId: any;
  emergencyForm: FormGroup;
//  hasemergencyId = false;
  submitted = false;
  minDate = moment().format('YYYY-MM-DD');
  medical_condition: any = []
  emergency_contact: any = [];
  medication: any = [];
  allergy: any = [];
  medical_note: any = [];
  id: any;
  slug: any;
  editMedicalForm: FormGroup;
  Appname: FormGroup;
  editData: any;

  constructor( private spinner: NgxSpinnerService, public activeroute: ActivatedRoute, private auth: ApiService, private common: CommonService, private formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.common.ref();
    this.emergencyForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      donateOrg: [''],
      profile: [this.profileData],
      bday: [''],
      bloodType: [''],
      diabetes: [''],
      weight: [''],
      height: [''],
      epilepsy: [''],
      start_date: ['']
    });

    this.editMedicalForm = this.formBuilder.group({
      name: ['',[Validators.required] ],
      details:[''],
      relation:[''],
    })

    this.Appname = this.formBuilder.group({
      title: ['Emergency'],
    })

    this.activeroute.params.subscribe((params:any) => {
      this.id = params['id'];
      this.slug = params['slug'];
      if(this.id){
      this.getDetails()
      }
    })

  }

  get f() { return this.emergencyForm.controls; }


  preview(files: any) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    this.f['profile'].setValue(files[0].name ? files[0].name : '');
    const reader = new FileReader();
    this.imagePath = files;
    this.profileData = <File>files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURLProfile = reader.result;
    };
  }

  makeData() {
    let date = moment(this.f.start_date.value).format('YYYY-MM-DD');
    // console.log(event.target.value);return;
    if( this.f.firstName.value){
    const formData = new FormData();

    formData.append('first_name', this.f.firstName.value);
    formData.append('file_name', this.profileData);
    formData.append('last_name', this.f.lastName.value);
    formData.append('organ_donar', this.f.donateOrg.value);
    formData.append('dob', date);
    formData.append('blood_type', this.f.bloodType.value);
    formData.append('diabetes', this.f.diabetes.value);
    formData.append('height', this.f.height.value);
    formData.append('weight', this.f.weight.value);
    formData.append('epilepsy', this.f.epilepsy.value);
    if (this.emergencyId) {
      formData.append('id', this.emergencyId);
    }
    // console.log(formData,"=======================");
    this.saveData(formData)
  }else{
    this.common.error("Fill the form");

  }
}


  saveData(formData: any) {
    this.spinner.show()
    this.auth.saveEmergencyData(formData).subscribe((response: any) => {
      this.spinner.hide()
      if (response.success == 1) {
        this.common.success(response.msg);
        this.emergencyId = response.id;
        this.appName()
       // this.hasemergencyId = true;
        console.log(response, "===================");
      } else {
        this.common.error(response.msg);
      }
    })
  }


  // openDialog(value: any,displayText:any,data:any): void {
  //   if (this.emergencyId) {
  //     const dialogRef = this.dialog.open(MedicalComponent, {
  //       width: '350px',
  //       data: { type: value, id: this.emergencyId, text:displayText,editData:data}
  //     });

  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log('The dialog was closed');
  //       console.log(result)
  //       this.getListMedical(this.emergencyId)
  //       // this.animal = result;
  //     });
  //   } else {
  //     if (this.f.firstName.value) {
  //       console.log(this.f.start_date.value)
  //       let date = moment(this.f.start_date.value).format('YYYY-MM-DD');
  //       console.log(date)
  //       const formData = new FormData();
  //       formData.append('first_name', this.f.firstName.value);
  //       formData.append('file_name', this.profileData);
  //       formData.append('last_name', this.f.lastName.value);
  //       formData.append('organ_donar', this.f.donateOrg.value);
  //       formData.append('dob', date);
  //       formData.append('blood_type', this.f.bloodType.value);
  //       formData.append('diabetes', this.f.diabetes.value);
  //       formData.append('height', this.f.height.value);
  //       formData.append('weight', this.f.weight.value);
  //       formData.append('epilepsy', this.f.epilepsy.value);
  //       if (this.emergencyId) {
  //         formData.append('id', this.emergencyId);
  //       }
  //       this.auth.saveEmergencyData(formData).subscribe((response: any) => {
  //         if (response.success == 1) {
  //           this.common.success(response.msg);
  //           this.emergencyId = response.id;

  //        //   this.hasemergencyId = true;
  //           // this.openDialog(value,'','0')
  //         } else {
  //           this.common.error(response.msg);
  //         }
  //       })
  //     } else {
  //       this.common.error("Fill the Form");
  //     }
  //   }
  // }

  getListMedical(id: any) {
    this.medical_condition = [];
    this.medical_note = []
    this.allergy = []
    this.medication = []
    this.emergency_contact = []

    const formData = new FormData();
    formData.append('id', id);
    this.auth.GetEmergencyForm(formData).subscribe((response: any) => {
      console.log(response);
      if (response.success == 1) {
        response.item.medical_card.forEach((element: any) => {
          if (element.type == 'medical_condition') {
            this.medical_condition.push(element)
          }
          if (element.type == 'medical_note') {
            this.medical_note.push(element)
          }
          if (element.type == 'allergy') {
            this.allergy.push(element)
          }
          if (element.type == 'medication') {
            this.medication.push(element)
          }
          if (element.type == 'emergency_contact') {
            this.emergency_contact.push(element)
          }
        });
      }
    })
  }

  delete(id: any) {
    const formData = new FormData();
    formData.append('id', id);
    this.auth.DeletemedicalCard(formData).subscribe((response: any) => {
      if (response.success == 1) {
        this.common.success('Deleted successfully');
        this.getListMedical(this.emergencyId)
      }
    })
  }

  getDetails(){
    const formData = new FormData();
    formData.append('id', this.id);
    formData.append('slug', this.slug);
    this.auth.getServiceDetail(formData).subscribe((response: any) => {
      console.log(response)
      if(response.success == 1){
        this.emergencyId = response.item.id;
        this.imgURLProfile = this.auth.lostFound+response.item.photo
        this.emergencyForm.patchValue({
          firstName:response.item.first_name,
          lastName: response.item.last_name,
          donateOrg: response.item.organ_donar,
         // profile: [this.profileData],
         // bday: response.item.dob,
          bloodType: response.item.blood_type,
          diabetes:  response.item.diabetes,
          weight: response.item.weight,
          height: response.item.height,
          epilepsy:response.item.epilepsy,
          start_date: response.item.dob
        })
        response.item.medical_card.forEach((element: any) => {
          if (element.type == 'medical_condition') {
            this.medical_condition.push(element)
          }
          if (element.type == 'medical_note') {
            this.medical_note.push(element)
          }
          if (element.type == 'allergy') {
            this.allergy.push(element)
          }
          if (element.type == 'medication') {
            this.medication.push(element)
          }
          if (element.type == 'emergency_contact') {
            this.emergency_contact.push(element)
          }
        });
      }
    })
  }



  /* add emergency Card */

  select(value:any){
    this.editMedicalForm.reset()
    $('.dropmenu').removeClass('show');
    if(this.emergencyId){
      $('.'+value+' + .dropmenu').addClass('show');
    }else{
      if (this.f.firstName.value) {
        console.log(this.f.start_date.value)
        let date = moment(this.f.start_date.value).format('YYYY-MM-DD');
        console.log(date)
        const formData = new FormData();
        formData.append('first_name', this.f.firstName.value);
        formData.append('file_name', this.profileData);
        formData.append('last_name', this.f.lastName.value);
        formData.append('organ_donar', this.f.donateOrg.value);
        formData.append('dob', date);
        formData.append('blood_type', this.f.bloodType.value);
        formData.append('diabetes', this.f.diabetes.value);
        formData.append('height', this.f.height.value);
        formData.append('weight', this.f.weight.value);
        formData.append('epilepsy', this.f.epilepsy.value);
        if (this.emergencyId) {
          formData.append('id', this.emergencyId);
        }
        this.auth.saveEmergencyData(formData).subscribe((response: any) => {
          if (response.success == 1) {
            this.common.success(response.msg);
            this.emergencyId = response.id;
            $('.'+value+' + .dropmenu').addClass('show');
          //  this.hasemergencyId = true;
          this.appName()
          } else {
            this.common.error(response.msg);
          }
        })
      } else {
        this.common.error("Fill the Form");
      }
    }
  }

  submit(value:any){
    var data = new FormData
    data.append('emergency_id', this.emergencyId);
    data.append('name', this.editMedicalForm.value.name);
    data.append('details', this.editMedicalForm.value.details);
    data.append('type', value)
    if(value  == 'emergency_contact'){
    data.append('relationship', this.editMedicalForm.value.relation)
    }
    this.auth.AppMedicalForm(data).subscribe((res: any) => {
      console.log(res)
      this.editMedicalForm.reset()
      this.closeDropdown()
      this.getListMedical(this.emergencyId)
    })
  }

  closeDropdown(){
    $('.dropmenu').removeClass('show');
  }

edit(value:any, data:any, i: any){
  this.editData = '';
  this.editMedicalForm.reset()
  this.closeDropdown()
  $('.'+value+i+ '+ .dropmenu'+i).addClass('show');
  console.log('.'+value+i+ ' + .dropmenu'+i)

  this.editData = data
  this.editMedicalForm.patchValue({
    name:data.name,
    details:data.details =='null'?'':data.details,
    relation:data.relationship == 'null'?'':data.relationship
  })
}

editsubmit(value:any){
  var data = new FormData
  data.append('emergency_id', this.emergencyId);
  data.append('name', this.editMedicalForm.value.name);
  data.append('details', this.editMedicalForm.value.details);
  data.append('type', value);
  data.append('id', this.editData.id)
  if(value  == 'emergency_contact'){
  data.append('relationship', this.editMedicalForm.value.relation)
  }
  this.auth.AppMedicalForm(data).subscribe((res: any) => {
    console.log(res)
    this.editMedicalForm.reset()
    this.closeDropdown()
    this.getListMedical(this.emergencyId)
  })
}

appName() {
  this.spinner.show()
  var data = new FormData
  data.append('slug', 'contact');
  data.append('id',  this.emergencyId)
  data.append('title', this.Appname.value.title);
  this.auth.editnameApp(data).subscribe((res: any) => {
    console.log()
    this.spinner.hide()
    if (res.http_status == 200) {
    } 
  })

}


}


