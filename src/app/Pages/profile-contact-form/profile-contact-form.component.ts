import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api-service/api.service';
import {CommonService} from '../../services/common/common.service';
import * as moment from 'moment';


@Component({
  selector: 'app-profile-contact-form',
  templateUrl: './profile-contact-form.component.html',
  styleUrls: ['./profile-contact-form.component.scss']
})
export class ProfileContactFormComponent implements OnInit {

  submitted = false;
  form : FormGroup;
  name:string;
  userId:any;
  // minDate = moment().format('YYYY-MM-DD');
    minDate = moment().format('YYYY-MM-DD');
   
  imagePath:any;
  coverData:any;
  imgURLCover:any='.././../../assets/images/img_uploader.png';
  where: any;

  constructor(private fb: FormBuilder,private router:Router,private route:ActivatedRoute,private auth:ApiService,private common:CommonService) {
    this.route.params.subscribe((res: any) => {
      (!res)
      ? this.router.navigate(['/profile'])
      : this.name = res.name;
      this.name = atob(this.name);
      console.log(this.name);
      this.userId = res.id;
      this.where = res.where
      // console.log(this.userId);
    })
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: [""],
      dob: ["", [Validators.required]],
      company:["", [Validators.required]],
      position: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      workPhone: [""],
      email: ["", [Validators.required,Validators.email]],
      website: [""],
      address: [""],
      postal: [""],
      city: [""],
    });

  }


  
  cover(files:any) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = 'Only images are supported.';
      return;
    }


    // this.f['cover'].setValue(files[0].name ? files[0].name : '');
    const reader = new FileReader();
    this.imagePath = files;
    this.coverData = <File>files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURLCover = reader.result;
    };

  }  


  get repProc() { return this.form.controls; }

  onSubmit(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }

    const formData = new FormData();

    formData.append('first_name',this.repProc.firstName.value);
    formData.append('last_name',this.repProc.lastName.value);
    formData.append('dob',this.repProc.dob.value);
    formData.append('company',this.repProc.company.value);
    formData.append('position',this.repProc.position.value);
    formData.append('phone',this.repProc.phone.value);
    formData.append('work_phone',this.repProc.workPhone.value);
    formData.append('email',this.repProc.email.value);
    formData.append('website',this.repProc.website.value);
    formData.append('address',this.repProc.address.value);
    formData.append('postcode',this.repProc.postal.value);
    formData.append('city',this.repProc.postal.value);
    formData.append('file_name',this.coverData);

    this.auth.saveUserContact(formData).subscribe((response:any)=>{
      // console.log("====================response",response);
      if (response.success == 1) {
        this.common.success(response.msg);
        if(response.contact){
          this.saveSharedCont(response.contact.id);
          this.form.reset();
          if( this.where == 'template'){
          this.router.navigate(['/slug-profile/contact'])
          }else{
         this.router.navigate(['/profile',this.name])
          }
        }
      }else{
        this.common.error(response.msg);
      }
    })
  }
 
  saveSharedCont(id:any){

    const formData = new FormData();

    formData.append('user_id',this.userId);
    formData.append('contact_id',id);

    let data = {'user_id':this.userId,'contact_id':id};
    // console.log(data);return

    this.auth.saveSharedContact(formData).subscribe((response:any)=>{
      if(response.success == 1){
          ////this.router.navigate(['/profile']);
          // this.router.navigate(['/slug-profile/contact'])
      }else{
        this.common.error(response.msg);
      }
    })

  }

  onDown(event:any){
    if(event.target.value.length==10 && event.keyCode!=8) return false;
  }

}
