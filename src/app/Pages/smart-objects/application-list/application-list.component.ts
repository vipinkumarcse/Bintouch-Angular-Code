import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
import { DialogData } from '../../application-emergency/application-emergency.component';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent implements OnInit {
  applicationDetails: any;
  CategoryList: any;
  appId: any;


  constructor(public dialogRef: MatDialogRef<ApplicationListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: ApiService,
    private common: CommonService,
    private modalService: NgbModal,
    private router: Router,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.data)
    this.applicationData();
    this.GetContactList()
    console.log(this.data.type)
    this.appId = this.data.type
  }

  applicationData() {
    this.applicationDetails=[]
    this.service.getApplicationList('').subscribe((res: any) => {
      this.GetContactList()
      if (res.success == 1) {
       // this.applicationDetails = res.items
        res.items.forEach((element:any) => {
          if(element.source != 'primary'){
            this.applicationDetails.push(element)
          }
        })
        console.log(this.applicationDetails)
      }
      else {
        this.common.error(res.msg);
      }
    },error=>{

    })
  }

  GetContactList() {
    this.service.GetApplicationCategories().subscribe((res: any) => {
      console.log(res)
      if (res.success == 1) {
        this.CategoryList = res.items;
        // this.done = this.contactList
        console.log(this.CategoryList.length)
      }
    }, error => {

    })
  }

  change(event: any, status: any) {
    var fd = new FormData
    fd.append('service_id', event.shared_services)
    fd.append('slug', event.tag_id)
    fd.append('tag_id', this.data.id)
    this.service.updatesmartObject(fd).subscribe((res: any) => {
      if (res['success'] == 1) {
        this.common.success(res.msg)
        console.log(res)
        // this.smartobjects=res.items
      }
      else {
        // this.common.error(res.msg);
      }
    })
  }

  urlAssign(value:any){
    console.log(value)
    var fd = new FormData
    fd.append('service_id', value.id)
    fd.append('slug', value.slug)
    fd.append('tag_id', this.data.id)
    this.service.updatesmartObject(fd).subscribe((res: any) => {
      if (res['success'] == 1) {
        this.common.success(res.msg)
        console.log(res)
        this.dialogRef.close();
        // this.smartobjects=res.items
      }
      else {
        this.dialogRef.close();
        // this.common.error(res.msg);
      }
    })

  }

  showMobile(){
    this.applicationDetails=[]
    this.service.getApplicationList('').subscribe((res: any) => {
     // this.GetContactList()
      if (res.success == 1) {
        this.applicationDetails = [];
        //this.applicationDetails = res.items
       // console.log(this.applicationDetails)
        res.items.forEach((element:any) => {
          if(element.source == 'primary'){
            this.applicationDetails.push(element)
          }
        });
        console.log(this.applicationDetails)
      }
      else if(res.http_status == '401'){
        this.common.error('You have been logged out for security purpose!');
        this.router.navigate(['']);
        // this.common.error(res.msg);
  
      }
      else {
        this.common.error(res.msg);
      }
    },error=>{
  
    })
  }


getFilterApplicationListing(categoryId:any){
  console.log(categoryId)
  var data = new FormData()
  data.append('cat_id', categoryId)
 this.service.getApplicationList(data).subscribe((res:any)=>{
  
  this.applicationDetails=res.items;   
 })
}

}
