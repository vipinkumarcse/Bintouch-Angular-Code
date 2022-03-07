import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common/common.service';
import { ApiService } from '../../services/api-service/api.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-application-linktree',
  templateUrl: './application-linktree.component.html',
  styleUrls: ['./application-linktree.component.scss']
})
export class ApplicationLinktreeComponent implements OnInit {

  message: any;
  imagePath: any;
  profileData: any;
  coverData: any;
  imgURLProfile: any = "assets/images/profile_photo_img.png";
  imgURLCover: any = "assets/images/cover_photo.png";
  linkId: any;
  linkForm: FormGroup;
  hasLinkId = false;
  submitted = false;
  labelForm: FormGroup;
  services = [];
  id: any;
  slug: any;
  serviceIcon: any;
  socialIcon: any;
  // appshow = false;

  constructor(private spinner: NgxSpinnerService, private common: CommonService, public auth: ApiService, public formBuilder: FormBuilder, public activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeroute.params.subscribe((params: any) => {
      this.id = params['id'];
      this.slug = params['slug'];
      if (this.id) {
        this.getDetails()
      }
    })
    this.common.ref();

    this.linkForm = this.formBuilder.group({
      title: [''],
      profile: [this.profileData],
      cover: [this.coverData],
      bio: [''],
      bgColor: [],
      textColor: [''],
      buttonColor: [''],
      buttonStyle: [''],
      styleIcon: [''],
      text: [''],
      app: [''],
      labelUrl: this.formBuilder.array([]),
      labelApp: this.formBuilder.array([]),
      SocialLink: this.formBuilder.array([]),
    });
    this.linkForm.patchValue({
      bgColor: '#ffffff',
      textColor: '#000000',
      buttonColor: '#5079BF',
      buttonStyle: 'rounded',
      styleIcon: 'grid'
    })

    this.getAllService();
    this.getServiceBytype()
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      text: new FormControl('',Validators.required),
      id: new FormControl(''),
      app: new FormControl('',Validators.required),
      type: new FormControl('')
    })
  }

  getControls() {
    return (this.linkForm.get('labelApp') as FormArray).controls;
  }



  // addCustomForm(){
  //   const application = this.linkForm.get('labelApp') as FormArray;
  //   if(application.valid){
  //     application.push(this.createItem());
  //   }
  // }
  get f() { return this.linkForm.controls; }

  // get labelURL() {
  //   return this.linkForm.controls["labelUrl"] as FormArray
  // }

  // get labelApp() {
  //   return this.linkForm.controls["labelApp"] as FormArray
  // }
  // get SocialLink() {
  //   return this.linkForm.controls["SocialLink"] as FormArray
  // }

   addQuantity(type: string) {

  //   const urlForm = this.formBuilder.group({
  //     label: [''],
  //     url: ['']
  //   });

  //   const appForm = this.formBuilder.group({
  //     text: [''],
  //     app: ['']
  //   });
  //   const SocialForm = this.formBuilder.group({
  //     label: [''],
  //     url: ['']
  //   });

  //   (type == 'url') ? this.labelURL.push(urlForm) : (type == 'app') ? this.labelApp.push(appForm) : (type == 'social') ? this.SocialLink.push(SocialForm) : '';

  }




  // removeQuantity(i:number) {
  //   // this.labelURL().removeAt(i);
  // }

  createLink(): FormGroup {
    return this.formBuilder.group({
      url: new FormControl('',Validators.required),
      id: new FormControl(''),
      label: new FormControl('',Validators.required),
      type: new FormControl('')
    })
  }

  getControlsLinks() {
    return (this.linkForm.get('labelUrl') as FormArray).controls;
  }

  addUrl(index: any, item: any) {

    if (!this.linkId) {
      this.common.error('Please enter above link tree details');
    } else {

      if (item.value.url == "") {
        this.common.error('Please enter url');
        return;
      }

      if (item.value.label == "") {
        this.common.error('Please enter label');
        return;
      }

      const formData = new FormData();

      if(item.value.id){
      formData.append('type', 'link');
      formData.append('url', item.value.url);
      formData.append('label', item.value.label);
      formData.append('tree_id', this.linkId);
      formData.append('slug', '');
      formData.append('id', item.value.id);
      }else{
        formData.append('type', 'link');
        formData.append('url', item.value.url);
        formData.append('label', item.value.label);
        formData.append('tree_id', this.linkId);
        formData.append('slug', '');
      }

      this.auth.saveLinkTreeLinks(formData).subscribe((response: any) => {
        if (response.success == 1) {
          this.common.success(response.msg);
          this.getData()
        } else {
          this.common.error(response.msg);
        }

      })
    }

  }


  // addApp(item: any) {


  //   console.log(this.linkForm);


  //   // this.common.error('Working on this section');return

  //   // if(!this.linkId){
  //   //   this.common.error('Please enter above link tree details');
  //   //   return
  //   // }else{

  //   //   if(item.value.app == ""){
  //   //     this.common.error('Please select app');
  //   //     return;
  //   //   }

  //   //   if(item.value.text == ""){
  //   //     this.common.error('Please enter label');
  //   //     return;
  //   //   }
  //   // console.log(item.value.app)
  //   const name: any = this.services.find((e: any) => { return e.slug == this.linkForm.value.app })
  //   console.log(name)
  //   const findService: any = this.services.find((e: any) => { return e.name == name.name })
  //   console.log(findService);
  //   if (findService) {
  //     let data: any;
  //     if (findService.content) {
  //       data = this.common.redirectToUrl(findService.content, findService.slug, '');
  //       console.log(data)
  //     } else {
  //       data = this.common.redirectToUrl(findService.name, findService.slug, '');
  //       console.log(data)
  //     }
  //     this.spinner.show()

  //     // console.log("============fincal",data)
  //     // return
  //     const formData = new FormData();

  //     formData.append('type', 'application');
  //     formData.append('url', data.url);
  //     formData.append('label', this.linkForm.value.text);
  //     formData.append('tree_id', this.linkId);
  //     formData.append('slug', findService.slug);
  //     this.auth.saveLinkTreeLinks(formData).subscribe((response: any) => {
  //       this.spinner.hide()
  //       if (response.success == 1) {
  //         this.appshow = false
  //         this.common.success(response.msg);
  //         this.linkForm.patchValue({
  //           text: '',
  //           app: ''
  //         })
  //         this.getData()
  //       } else {
  //         this.common.error(response.msg);
  //       }
  //     })

  //   }

  // }

  createSocial(): FormGroup {
    return this.formBuilder.group({
      url: new FormControl('',Validators.required),
      id: new FormControl(''),
      label: new FormControl(''),
      type: new FormControl(''),
      slug: new FormControl(this.serviceIcon[0].slug,Validators.required),
      image:new FormControl (this.auth?.serviceSocialIcon+this.serviceIcon[0].image)
    })
  }

  getControlsSocial() {
    return (this.linkForm.get('SocialLink') as FormArray).controls;
  }

  addSocial(index: any, item: any) {
    console.log(item)
    if (!this.linkId) {
      this.common.error('Please enter above link tree details');
    } else {
      // if (item.value.url == "") {
      //   this.common.error('Please enter url');
      //   return;
      // }
      // if (item.value.label == "") {
      //   this.common.error('Please enter label');
      //   return;
      // }

      const data: any = this.serviceIcon.find((e: any) => { return e.slug == item.value.slug })
   //   console.log(data)
     // if(data){
      const formData = new FormData();
      if(item.value.id){
      formData.append('type', 'social');
      formData.append('url', item.value.url);
      formData.append('label', data.name);
      formData.append('tree_id', this.linkId);
      formData.append('slug',  item.value.slug);
      formData.append('id', item.value.id)
      }else{
        formData.append('type', 'social');
        formData.append('url', item.value.url);
        formData.append('label', data.name);
        formData.append('tree_id', this.linkId);
        formData.append('slug',  item.value.slug);
      }
  //  }
      this.auth.saveLinkTreeLinks(formData).subscribe((response: any) => {
        if (response.success == 1) {
          this.common.success(response.msg);
          this.getData()
        } else {
          this.common.error(response.msg);
        }
      })
    }
  }

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

  cover(files: any) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }


    this.f['cover'].setValue(files[0].name ? files[0].name : '');
    const reader = new FileReader();
    this.imagePath = files;
    this.coverData = <File>files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURLCover = reader.result;
    };

  }

  makeData() {
    let title = this.f.title.value ? this.f.title.value : 'Linktree'
    const formData = new FormData();
    formData.append('title', title);
    formData.append('photo', this.profileData);
    formData.append('cover_photo', this.coverData);
    formData.append('button_color', this.f.buttonColor.value);
    formData.append('text_color', this.f.textColor.value);
    formData.append('bg_color', this.f.bgColor.value);
    formData.append('button_style', this.f.buttonStyle.value);
    formData.append('icon_style', this.f.styleIcon.value);
    formData.append('bio', this.f.bio.value);
    if (this.linkId) {
      formData.append('id', this.linkId);
    }

    // console.log(formData,"=======================");
    this.saveData(formData)

  }

  saveData(formData: any) {
    this.spinner.show()
    this.auth.saveLinkTree(formData).subscribe((response: any) => {
      this.spinner.hide()
      if (response.success == 1) {
        this.common.success(response.msg);
        this.linkId = response.id;
       // console.log(this.linkId)
        this.hasLinkId = true;
      //  console.log(response, "===================");
      } else {
        this.common.error(response.msg);
      }
    })
  }


  getAllService() {
    const formData = new FormData();
    this.auth.getUserServices(formData).subscribe((response: any) => {
      // console.log(`${response}------------------------------`,response);
      this.services = response.items;
     // console.log(this.services)
    })
  }

  getDetails() {
    const formData = new FormData();
    formData.append('id', this.id);
    formData.append('slug', this.slug);
    this.auth.getServiceDetail(formData).subscribe((response: any) => {
  console.log(response)
      if (response.success == 1) {
        this.imgURLCover = this.auth.lostFound + response.item.cover_photo
        this.imgURLProfile = this.auth.lostFound + response.item.photo
        this.linkId = response.item.id;
        this.getData()
        this.linkForm.patchValue({
          title: response.item.title,
          bio: response.item.bio,
          bgColor: response.item.bgColor,
          textColor: response.item.text_color,
          buttonColor: response.item.bg_color,
          buttonStyle: response.item.button_style,
          styleIcon: response.item.icon_style,
          template: response.item.template
        })
      }
    })
  }


  getServiceBytype() {
    var data = new FormData
    data.append('type', 'social');
    this.auth.get_services_by_type(data).subscribe((res: any) => {
     console.log(res);
      if (res.success == '1') {
       // this.socialIcon = res.services[0].image
        this.serviceIcon = res.services
       // console.log(this.serviceIcon)
      }
      // console.log(this.serviceIcon)
    })
  }



  selectIcon(image: any, index:any) {
    const data: any = this.serviceIcon.find((e: any) => { return e.slug == image.target.value })
    this.socialIcon = data.image;
    const application = this.linkForm.get('SocialLink') as FormArray;
    application.at(index).patchValue({
    image:this.auth.serviceSocialIcon+data.image
  })
  }


  ShowPopup() {
    const application = this.linkForm.get('labelApp') as FormArray;
    if(application.length == 0){
      application.push(this.createItem());
    }else{
      if(application.valid){
        application.push(this.createItem());
      }
    }
    // this.appshow = true
  }

  ShowAddLink() {
    const application = this.linkForm.get('labelUrl') as FormArray;
    if(application.length == 0){
      application.push(this.createLink());
    }else{
      if(application.valid){
        application.push(this.createLink());
      }
    }
    // this.appshow = true
  }

  ShowAddSocail() {
    const application = this.linkForm.get('SocialLink') as FormArray;
    if(application.length == 0){
      application.push(this.createSocial());
    }else{
      if(application.valid){
        application.push(this.createSocial());
      }
    }
    // this.appshow = true
  }


  getData() {
    var data = new FormData
    data.append('id', this.linkId);
    this.auth.GetLinktree(data).subscribe((res: any) => {
      console.log(res)
      if (res.success == 1) {
        if (res.items.links) {
          const customArray = new FormArray([]);
          const customeLink = new FormArray([]);
          const customeSocial = new FormArray([]);
          // res.items.links.forEach((element: any) => {
            for(let i = 0; i < res.items.links.length; i++){
             // console.log(i,  res.items.links[i].label)
            if (res.items.links[i].type == 'application') {
           //   console.log(res.items.links[i].label)
              let data = {
                text: res.items.links[i].label,
                app: res.items.links[i].slug,
                id: res.items.links[i].id,
                type: res.items.links[i].type
              }
              customArray.push(this.formBuilder.group(data))
            }

            if (res.items.links[i].type == 'link') {
             // console.log(res.items.links[i].label)
              let data1 = {
                url: res.items.links[i].url,
                label: res.items.links[i].label,
                id: res.items.links[i].id,
                type: res.items.links[i].type
              }
              customeLink.push(this.formBuilder.group(data1))
            }

            if (res.items.links[i].type == 'social') {
             // console.log(res.items.links[i].label)
              let data2 = {
                url: res.items.links[i].url,
                label: res.items.links[i].label,
                id: res.items.links[i].id,
                type: res.items.links[i].type,
                slug:res.items.links[i].slug,
                image:this.auth.serviceSocialIcon+res.items.links[i].image
              }
              customeSocial.push(this.formBuilder.group(data2))
            }
        }
        this.linkForm.setControl('labelApp',customArray);
        this.linkForm.setControl('labelUrl',customeLink);
        this.linkForm.setControl('SocialLink',customeSocial);
      }
    }
  })
  }

  EditApp(index: any, item: any) {
    console.log(item)
   // console.log(item.value.app)
    const name: any = this.services.find((e: any) => { return e.slug == item.value.app })
    const findService: any = this.services.find((e: any) => { return e.name == name.name })
   // console.log(findService);
    if (findService) {
      let data: any;
      if (findService.content) {
        data = this.common.redirectToUrl(findService.content, findService.slug, '');
       // console.log(data)
      } else {
        data = this.common.redirectToUrl(findService.name, findService.slug, '');
       // console.log(data)
      }
      this.spinner.show()
      const formData = new FormData();
   //   console.log(item.value.id)
      if(item.value.id){
        formData.append('id', item.value.id)
        formData.append('type', 'application');
        formData.append('url', data.url);
        formData.append('label', item.value.text);
        formData.append('tree_id', this.linkId);
        formData.append('slug', findService.slug);
        }else{
          formData.append('type', 'application');
          formData.append('url', data.url);
          formData.append('label', item.value.text);
          formData.append('tree_id', this.linkId);
          formData.append('slug', findService.slug);
        }
      this.auth.saveLinkTreeLinks(formData).subscribe((response: any) => {
        this.spinner.hide()
        if (response.success == 1) {
          this.common.success(response.msg);
            this.getData()
        } else {
          this.common.error(response.msg);
        }
      })
    }
  }

  delete(item: any, i:any) {
   // console.log(item)
      const formData = new FormData();
      formData.append('id', item.value.id);
      this.auth.DeleteLinktreeLink(formData).subscribe((res:any)=>{
        if (res.success == 1) {
          this.getData()
          // this.linkForm.setControl('labelApp',removeA);
        }
      })


  }
}
