import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
declare var $: any
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contactDetails: any;
  userData: any;
  show: boolean = false;
  userDetails: any;
  ImageUrl: string = '';
  inputField = false
  catForm: FormGroup
  contactList: any;
  todo: any;
  done: any;

  constructor(private service: ApiService, private common: CommonService, public formBuilder: FormBuilder) {
    this.catForm = this.formBuilder.group({
      catname: [''],
    })
  }

  ngOnInit(): void {
    this.GetContactList()
    this.ImageUrl = this.service.imageUrl
    if (localStorage.getItem('B-in-Touch')) {
      this.userData = JSON.parse(localStorage.getItem('B-in-Touch') || '{}')
      console.log(this.userData, "data")
    }
    this.contactData();
  }

  contactData() {
    // var fd = new FormData
    // fd.append('target_user_id', this.userData.user_id)
    this.service.getContactList('').subscribe((res: any) => {
      if (res['success'] == 1) {
        this.contactDetails = res.items
        this.todo = this.contactDetails
        console.log(this.contactDetails)
      }
      else {
        this.common.error(res.msg);
      }
    })
    console.log(this.contactDetails)
  }

  viewcontact(data: any) {
    console.log(data, "data")
    this.show === true
    var fd = new FormData
    fd.append('target_user_id', data.profile_user_id)
    this.service.getContactById(fd).subscribe((res: any) => {
      if (res['success'] == 1) {
        $('#contact_detail').modal('show')
        this.userDetails = res.user
      }
      else {
        // this.common.error(res.msg);

      }
    })
  }


  delete(data: any) {
    console.log(data, "data")
    var fd = new FormData
    fd.append('contact_id', data.contact_id)
    this.service.deleteContact(fd).subscribe((res: any) => {
      if (res['success'] == 1) {
        this.common.success(res.msg);
        $('#contact_detail').modal('hide')
        this.contactData();
      }
      else {
        // this.common.error(res.msg);

      }
    })
  }

  // exportall(id:any){
  //   let url = 'https://saurabh.parastechnologies.in/BInTouch/api/export_contact/?contact_id='+id;
  //   window.location(url);
  // }


  input() {
    this.inputField = true
  }

  submitCat() {
    // Token( in header), name, row_order, id(for update)
    // console.log(this.catForm.value.catname)
    let row: any = this.contactList.length + 1
    console.log(row)
    var data = new FormData
    data.append('name', this.catForm.value.catname)
    data.append('row_order', row)
    this.service.SaveContactCategories(data).subscribe((res: any) => {
      console.log(res)
      this.GetContactList()
    })
  }

  GetContactList() {
    this.service.GetContactCategories().subscribe((res: any) => {
      console.log(res)
      if (res.success == 1) {
        this.contactList = res.items;
       // this.done = this.contactList
        console.log(this.contactList.length)
      }
    }, error => {

    })
  }

  deleteContact(id: any) {
    var data = new FormData
    data.append('id', id)
    this.service.DeleteContactCategory(data).subscribe((res: any) => {
      console.log(res)
      if (res.success == 1) {
        this.GetContactList()
      }
    }, error => {

    })

  }


  // drop(event: CdkDragDrop<string[]>) {
  //   console.log(event);
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(event.previousContainer.data,
  //                       event.container.data,
  //                       event.previousIndex,
  //                       event.currentIndex);
  //   }
  // }

  exportall() {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = "https://saurabh.parastechnologies.in/BInTouch/api/export_contacts/?user_id=" + this.userData.user_id
    hiddenElement.click();
  }
}
