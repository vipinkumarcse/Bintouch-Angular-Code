import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationlinkingComponent } from './applicationlinking/applicationlinking.component';
declare var $: any;
import jsPDF from 'jspdf';
import { Router } from '@angular/router';
import { SmartObjectnameComponent } from './smart-objectname/smart-objectname.component';


@Component({
  selector: 'app-smart-objects',
  templateUrl: './smart-objects.component.html',
  styleUrls: ['./smart-objects.component.scss']
})
export class SmartObjectsComponent implements OnInit {
  smartobjects: any;
  ObjectList: any = 0;
  catForm: FormGroup
  inputField = false;
  search:any
  modalData: any;
  bodyId: any;
  slug: any;
  link: any;
  dialogRef: any;
  EditnameForm: FormGroup;
  classAdd: boolean = false;
  dragDropActive: boolean = false;

  constructor(public router:Router, public dialog: MatDialog, private service: ApiService, private common: CommonService, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.catForm = this.formBuilder.group({
      name: [''],
    })
    this.GetContactList()
    this.EditnameForm = this.formBuilder.group({
      title: [''],
    })
  
  }

  Smartobject() {
    this.service.getuserSmartobject('').subscribe((res: any) => {
      if (res['success'] == 1) {
        this.smartobjects = res.items
        this.modalData = res.items[0]
        console.log(this.modalData)
        this.link = this.modalData.tag_url
        this.smartobjects.forEach((element: any) => {
          if (element.lock_status == "0") {
            element.lock = false
          } else if (element.lock_status == "1") {
            element.lock = false
          } else if (element.lock_status == "2") {
            element.lock = true
          }
        });
        if(this.ObjectList){
          this.ObjectList.forEach((element:any) => {
            element.active = false
          });
          this.classAdd = true 
        }
        
        console.log(this.smartobjects)
      }
      else {
        this.common.error(res.msg);

      }
    }, error => {

    })
  }


  change(event: any, status: any) {
    console.log(event, status)
    let data: any = status == "0" ? 2 : 0
    console.log(data)
    var fd = new FormData
    fd.append('shared_services', event.shared_services)
    fd.append('tag_id', event.tag_id)
    fd.append('tag_name', event.tag_name)
    fd.append('lock_status', data)
    this.service.updatesmartObject(fd).subscribe((res: any) => {
      if (res['success'] == 1) {
        this.common.success(res.msg)
        this.Smartobject()
      }
      else {
      }
    })
  }

  remove(event: any) {
    console.log(event)
    var fd = new FormData
    fd.append('service_id', '')
    fd.append('tag_id', event.tag_id)
    fd.append('tag_name', event.tag_name)
    fd.append('lock_status', event.lock_status)
   // fd.append('lock_status', '')
    this.service.updatesmartObject(fd).subscribe((res: any) => {
      if (res['success'] == 1) {
        this.common.success('Application successfully deleted in Smart object')
        this.Smartobject()
      }
      else {
        this.common.error(res.msg);

      }
    })
  }


  submitCat() {
    // Token( in header), name, row_order, id(for update)
    // console.log(this.catForm.value.catname)
    let row: any = this.ObjectList.length + 1
    console.log(row)
    var data = new FormData
    data.append('name', this.catForm.value.name)
    data.append('row_order', row)
    this.service.SaveObjectCategory(data).subscribe((res: any) => {
      console.log(res)
      if (res.success == 1) {
        this.inputField = false;
        this.catForm.reset()
        this.GetContactList()
      }
    })
  }

  GetContactList() {
    this.service.GetObjectCategories().subscribe((res: any) => {
      console.log(res)
      if (res.success == 1) {
        this.ObjectList = res.items;
        if(res.items){
        this.ObjectList.forEach((element:any) => {
          element.active = false
          
        });
      }
        // this.done = this.contactList
        console.log(this.ObjectList.length)
        this.Smartobject()
      }else if(res.http_status == '401'){
        this.common.error('You have been logged out for security purpose!');
        this.router.navigate(['']);
      }else{
        this.common.error(res.msg);
      }
    }, error => {

    })
  }

  deleteContact(id: any) {
    var data = new FormData
    data.append('id', id)
    this.service.DeleteObjectCategory(data).subscribe((res: any) => {
      console.log(res)
      if (res.success == 1) {
        this.GetContactList()
      }
    }, error => {

    })

  }

  input() {
    this.inputField = true
  }

  openModel() {
    const dialogRef = this.dialog.open(ApplicationlinkingComponent, {
      width: '400px',
      // data: { type: value, id: this.emergencyId }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      console.log(result)
      // this.animal = result;
    });
  }


  applicationList(value: any,id:any) {

    const dialogRef = this.dialog.open(ApplicationListComponent, {
      width: '600px',
      data: { id: value.tag_id,
      type:id }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      // this.animal = result;
      this.Smartobject()
    });
  }

  model(data:any){
    this.modalData = data;
    this.link = this.modalData.tag_url
    console.log(this.modalData)
    this.EditnameForm.patchValue({
      title: this.modalData.tag_name
    })
    $('#addsmart_object').modal('show');
  }


  // getBase64Image(img:any) {
  //   var canvas = document.createElement("canvas");
  //   canvas.width = img.width;
  //   canvas.height = img.height;
  //   var ctx:any = canvas.getContext("2d");
  //   ctx.drawImage(img, 0, 0);
  //   var dataURL = canvas.toDataURL("image/png");
  //   return dataURL;
  // }

  download(value:any) {
    const qrcode:any = document.getElementById('qrcode');
    let doc = new jsPDF();
    doc.addImage(qrcode.src, 'PNG', 10, 10, 150, 150);

    doc.save(value+'.pdf');
  }

  drag(ev:any,id:any,slug:any) {
    this.bodyId=id
    // ev.dataTransfer.setData("text", ev.target.id);
     this.slug=slug
     this.dragDropActive= true
  }
  
  drop(ev:any,i:any, id:any) {
    var data = new FormData
    data.append('tag_id', this.bodyId)
    data.append('cat_id', id)

 this.service.saveObjectRelation(data).subscribe((res:any)=>{
  console.log(res)
  if(res.http_status=='200'){
    this.dragDropActive = false
     this.common.success("Successfully assigned");
  }

  else{
    // this.common.error(res["msg"]);
 }
 })
  
    // ev.preventDefault();
    // var data1 = ev.dataTransfer.getData("text");
    // ev.target.appendChild(document.getElementById(data1));
  }
  
  allowDrop(ev:any) {
    ev.preventDefault();
    
  }

  getFilterObjectListing(categoryId: any) {
    console.log(categoryId)
    this.classAdd = false 
    this.ObjectList.forEach((element: any) => {
      element.active = false
      if (element.id == categoryId) {
        element.active = true
      }
    });
    var data = new FormData()
    data.append('cat_id', categoryId)
    this.service.getuserSmartobject(data).subscribe((res: any) => {
      this.smartobjects = res.items;
      console.log(this.smartobjects)
    })
  }

  copyUrl(){
    this.common.success("Copied the link");
  }


  openDialog(id:any,name:any){
    let editname = name?name:'B-in-touch'
    let data ={
      id:id,
      name:name
    }
    this.dialogRef = this.dialog.open(
      SmartObjectnameComponent, {width: '350px' })
     // dialogRef.componentInstance.user = data;;

     this.dialogRef.componentInstance.fromParent = data;
    // dialogRef.result.then((result:any) => {
    //   console.log(result);
    // }, (reason) => {
    // });
    this.dialogRef.afterClosed().subscribe((result:any) => {
      console.log("comp closed");
      this.Smartobject();
  })
  // dialogRef.afterClosed().subscribe(result => {
  //   console.log('The dialog was closed');
  //   console.log(result)
  //   this.getListMedical(this.emergencyId)
  //   // this.animal = result;
  // });
  }

  submit() {
    var data = new FormData
    data.append('tag_id', this.modalData.tag_id)
    // if(this.fromParent.slug != 'contact'){
      data.append('tag_name', this.EditnameForm.value.title);
    // }else if(this.fromParent.slug == 'contact'){
    //   data.append('first_name', this.EditnameForm.value.first_name);
    //   data.append('last_name', this.EditnameForm.value.last_name);
    // }
    this.service.EditSmartObject(data).subscribe((res: any) => {
      console.log()
      if (res.http_status == 200) {
        //this.common.success('Successfully edit');
     this.Smartobject()
      } else {
        this.common.error(res["msg"]);
      }
    })

  }


}
