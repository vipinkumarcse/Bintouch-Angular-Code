import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
import { EventsService } from 'src/app/services/event/events.service';
declare let $: any;
// declare var customScrollbar: any;
declare var PerfectScrollbar: any;
import * as moment from 'moment';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userData: any;
  ImageUrl: any;
  Contactlist: any;
  contactDetails: any;
  userDetails: any;
  Clicklist: any;
  base_url: any;
  notList: any;
  notCount: any;

  constructor(private service: ApiService, private common: CommonService, private router: Router, public event: EventsService) { }

  ngOnInit(): void {

  
  $( function(){
    //console.log('scrollbar function called')
    $(".deznav-scroll").length > 0 && (new PerfectScrollbar(".deznav-scroll").isRtl = !1);
  });
    


    // new customScrollbar;

    this.ImageUrl = this.service.imageUrl

    if (localStorage.getItem('B-in-Touch')) {
      this.userData = JSON.parse(localStorage.getItem('B-in-Touch') || '{}')
      //console.log(this.userData, "data")
    }
    this.contactlist();


    this.event.getObservable().subscribe((res: any) => {
      //console.log(res)
      if (res == 'editData') {
        if (localStorage.getItem('B-in-Touch')) {
          this.userData = JSON.parse(localStorage.getItem('B-in-Touch') || '{}')
          //console.log(this.userData, "data")
        }
      }
    })


      

  }

  openrightMenu(){
    $( function(){
      $('.right_sidebar').toggleClass('open_right_menu');
  });
  
    $( function(){
      $('#main-wrapper').removeClass('menu-toggle');
      $('.hamburger').removeClass('is-active');
    });
  }

  openLeftMenu(){
    $( function(){
      $('.right_sidebar').removeClass('open_right_menu');
    });
    $( function () {
      $("#main-wrapper").toggleClass("menu-toggle"); 
      $(".hamburger").toggleClass("is-active");
    })
  }

  logout() {
    this.service.logout('').subscribe((res: any) => {
      if (res['success'] == 1) {
        // this.common.hideSpinner();
        this.common.success(res.msg)
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/'])
      }else if(res.http_status == '401'){
        this.common.error('You have been logged out for security purpose!');
        this.router.navigate(['']);
        // this.common.error(res.msg);

      }
      else {
        // this.common.hideSpinner();
        this.common.error(res.msg);

      }
    },error=>{
      
    })
  }
  contactlist() {
    this.service.getContactList('').subscribe((res: any) => {
      this.clicklist();
      this.notificationList()
      this.notificationC()
      if (res['success'] == 1) {
        this.Contactlist = res.items
        this.Contactlist.forEach((element:any) => {
          element.firstletter = element.first_name.charAt(0)
          element.date = moment(element.created_on).format('DD/MM/yyyy')
        });
        //console.log(this.Contactlist);
      }
      else {
        // this.common.error(res.msg);

      }
    })
  }
  contactData(data: any) {
    //console.log( data.user_id)
    var fd = new FormData
    fd.append('target_user_id', data.user_id)
    this.service.getContactById(fd).subscribe((res: any) => {
      if (res['success'] == 1) {
        this.userDetails = res.user
      }
      else {
        // this.common.error(res.msg);

      }
    })
    this.contactDetails = data
    //console.log(this.contactDetails)

  }


  clicklist() {
    this.service.getClickList('').subscribe((res: any) => {
      if (res['success'] == 1) {
        this.Clicklist = res.items
        this.base_url = res.base_url
      }
      else {
        // this.common.error(res.msg);

      }
    })
  }

  delete(data: any) {
    //console.log(data, "data")
    var fd = new FormData
    fd.append('profile_user_id', data.user_id)
    this.service.deleteContact(fd).subscribe((res: any) => {
      if (res['success'] == 1) {
        this.common.success(res.msg);
        $('#contact_complete_detail').modal('hide')
        this.contactlist();
      }
      else {
        // this.common.error(res.msg);

      }
    })
  }


  gotocontactus(){
    //window.open(['/contactus'])
  }

  // gotocontactus() {
  //   window.open('http://b-in-touch.fr/contact/', '_blank');
  // }
  
  gotoTouchShop() {
    window.open('http://b-in-touch.fr/', '_blank')
  }

  gotosetting() {
    this.router.navigate(['/setting'])
  }

  notificationList() {
    this.service.notificationList('').subscribe((res: any) => {
      //console.log(res)
      if (res['success'] == 1) {
        this.notList = res.items
        if (res.items != null) {
          this.notList.forEach((element: any) => {
            element.timeDuration = moment(element.modified_on).fromNow();
          });
        }

      }
      else {
        // this.common.error(res.msg);

      }
    })
  }

  notificationC() {
    this.service.notificationCount('').subscribe((res: any) => {
      //console.log(res)
      if (res['success'] == 1) {
        this.notCount = res.count
        //console.log(this.notCount)
      }
      else {
        // this.common.error(res.msg);
      }
    })
  }

  deletenoti() {
    this.service.DeleteNotification('').subscribe((res: any) => {
      //console.log(res)
      if (res['success'] == 1) {
        this.notificationList();
        this.notificationC()
      }
      else {
        // this.common.error(res.msg);
      }
    })
  }
}

