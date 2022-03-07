import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common/common.service';
import { ApiService } from '../../services/api-service/api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-application-lostnfound',
  templateUrl: './application-lostnfound.component.html',
  styleUrls: ['./application-lostnfound.component.scss']
})
export class ApplicationLostnfoundComponent implements OnInit {


  message: any;
  imagePath: any;
  fileData: any;
  imgURL: any = "assets/images/cover_photo.png";
  lostId: any;
  lostForm: FormGroup;
  hasLostIf = false;
  submitted = false;
  id: any;
  slug: any;
  eventId: any;

  constructor(private spinner: NgxSpinnerService, public router:Router, private common: CommonService, private auth: ApiService, private formBuilder: FormBuilder,public activeroute: ActivatedRoute) {
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        return 'div'
      }
      else {

      }
    });
    this.activeroute.params.subscribe((params:any) => {
      this.id = params['id'];
      this.slug = params['slug'];
      if( this.id ){
      this.getDetails()
      }
    })
  }

  ngOnInit(): void {
    this.common.ref();
    this.lostForm = this.formBuilder.group({
      name: [''],
      image: [this.fileData],
      relation: [''],
      noteTitle: [''],
      description: [''],
      contactName: [''],
      contactTitle: [''],
      phone: [''],
      email: ['', Validators.email],
      street1: [''],
      street2: [''],
      postalCode: [''],
      city: [''],
      state: [''],
      country: [''],
    });
  }

  getDetails(){
    const formData = new FormData();
    formData.append('id', this.id);
    formData.append('slug', this.slug);
    this.auth.getServiceDetail(formData).subscribe((response: any) => {
      console.log(response)
      if(response.success == 1){
        this.imgURL = this.auth.lostFound + response.item.photo
        this.lostId = response.item.id
        this.lostForm.patchValue({
          name:response.item.name,
         // image: [this.fileData],
          relation: response.item.relationship,
          noteTitle: response.item.title,
          description:response.item.description,
          contactName:response.item.contact_name,
          contactTitle: response.item.contact_title,
          phone: response.item.phone,
          email: response.item.email,
          street1: response.item.street_1,
          street2: response.item.street_2,
          postalCode: response.item.postcode,
          city: response.item.city,
          state: response.item.state,
          country: response.item.country,
        })
      }
      
    })
  }

  get f() { return this.lostForm.controls; }


  preview(files: any) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    this.f['image'].setValue(files[0].name ? files[0].name : '');
    const reader = new FileReader();
    this.imagePath = files;
    this.fileData = <File>files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  makeData() {
    console.log(this.lostId);
    if (this.f.name.value) {
      let title = this.f.noteTitle.value?this.f.noteTitle.value:'Lost & Found'
      const formData = new FormData();
      formData.append('name', this.f.name.value);
      formData.append('relationship', this.f.relation.value);
      formData.append('title', title);
      formData.append('description', this.f.description.value);
      formData.append('contact_name', this.f.contactName.value);
      formData.append('contact_title', this.f.contactTitle.value);
      formData.append('phone', this.f.phone.value);
      formData.append('email', this.f.email.value);
      formData.append('street_1', this.f.street1.value);
      formData.append('street_2', this.f.street2.value);
      formData.append('postcode', this.f.postalCode.value);
      formData.append('city', this.f.city.value);
      formData.append('state', this.f.state.value);
      formData.append('country', this.f.country.value);
      formData.append('file_name', this.fileData);
      if (this.lostId) {
        formData.append('id', this.lostId);
      }

      this.saveData(formData)
    } else {
      this.common.error("Fill the form");
    }

  }


  saveData(formData: any) {
this.spinner.show()
    this.auth.saveLostFound(formData).subscribe((response: any) => {
      this.spinner.hide()
      if (response.success == 1) {
        this.lostForm.reset()
        this.common.success(response.msg);
        this.lostId = response.id;
        this.hasLostIf = true;
        console.log(response, "===================");
        this.router.navigate(['/application'])

      } else {
        this.common.error(response.msg);
      }
    })
  }


  ngOnDestroy(): void {
    console.log("=====================")
    // this.makeData();

  }

}
