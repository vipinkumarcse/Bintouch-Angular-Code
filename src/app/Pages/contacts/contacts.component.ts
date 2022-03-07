import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  search: any
  bodyId: any;
  slug: any;
  userDetailspopup: any;
  classAdd = false

  constructor(private service: ApiService, private common: CommonService, public formBuilder: FormBuilder, public router: Router) {
    this.catForm = this.formBuilder.group({
      catname: [''],
    })
  }

  ngOnInit(): void {

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
      console.log(res)
      this.GetContactList()
      if (res['success'] == 1) {
        this.contactDetails = res.items
        this.classAdd = true 
        this.contactDetails.forEach
        ((element:any) => {
          element.active =  false
        });
        //this.userDetails = res.items[0]
        // console.log( this.userDetails)
        this.todo = this.contactDetails
        //  console.log(this.contactDetails)
        this.viewcontactdeatils(res.items[0].user_id)

      }
      else if (res.http_status == '401') {
        this.common.error('You have been logged out for security purpose!');
        this.router.navigate(['']);
        // this.common.error(res.msg);

      } else {
        this.common.error(res.msg);
      }
    })
    console.log(this.contactDetails)
  }

  viewcontact(data: any) {
    console.log(data, "data")
    this.show === true
    var fd = new FormData
    fd.append('target_user_id', data.user_id)
    this.service.getContactById(fd).subscribe((res: any) => {
      if (res['success'] == 1) {
        $('#contact_detail').modal('show')
        this.userDetails = res.user
        console.log(this.userDetails)
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
      if (res.success == 1) {
        this.inputField = false
        this.catForm.reset()
        this.GetContactList()
      } else {
        this.common.error(res.msg);
      }
    }, error => {

    })
  }

  GetContactList() {
    this.service.GetContactCategories().subscribe((res: any) => {
      console.log(res)
      if (res.success == 1) {
        this.contactList = res.items;
        // this.done = this.contactList
        console.log(this.contactList.length)
        this.contactList.forEach((element:any) => {
          element.active = false
          
        });
      }
    }, error => {
    })
  }

  deleteContact(id: any) {
    console.log(id)
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

  drag(ev: any, id: any, slug: any) {
    console.log('start')
    this.bodyId = id
    // ev.dataTransfer.setData("text", ev.target.id);
    this.slug = slug

  }

  drop(ev: any, i: any, id: any) {
    var data = new FormData
    data.append('contact_id', this.bodyId)
    data.append('cat_id', id)

    this.service.saveContactRelation(data).subscribe((res: any) => {
      console.log(res)
      if (res.http_status == '200') {
        this.common.success("Successfully assigned");
        // this.common.success(res["msg"]);
      }
      else {
        // this.common.error(res["msg"]);
      }
    })

  //  this.getFilterContactListing(id)
    
    // ev.preventDefault();
    // var data1 = ev.dataTransfer.getData("text");
    // console.log(data1)
    // ev.target.appendChild(document.getElementById(data1));
  }

  allowDrop(ev: any) {
    ev.preventDefault();
  }

  getFilterContactListing(categoryId: any) {
    this.contactList.forEach((element: any) => {
      element.active = false
      if (element.id == categoryId) {
        element.active = true
      }
    });
    console.log(categoryId)
    this.classAdd = false 
    var data = new FormData()
    data.append('cat_id', categoryId)
    this.service.getContactList(data).subscribe((res: any) => {
      this.contactDetails = res.items;
    })
  }


  viewcontactdeatils(id: any) {
    this.contactDetails.forEach((element:any) => {
      element.active = false
      if(element.user_id == id){

        element.active = true;
      }
      
    });
    // console.log(data, "data"
    this.show === true
    var fd = new FormData
    fd.append('target_user_id', id)
    this.service.getContactById(fd).subscribe((res: any) => {
      if (res['success'] == 1) {
        this.userDetailspopup = res.user
        console.log(this.userDetailspopup)
      }
      else {
        // this.common.error(res.msg);

      }
    })
  }
}



