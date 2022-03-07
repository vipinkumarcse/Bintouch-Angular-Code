import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api-service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common/common.service';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2'
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  contactName = "";
  userData: any = [];
  fullName = "";
  position = "";
  city = "";
  company = "";
  bio = "";
  country = "";
  services: any = [];
  otherServices: any = [];
  imgUrl = environment.service_icons;
  round_icons = environment.round_icons
  usrImg = environment.imageUrl;
  lost_found = environment.lost_found;
  baseUrl = environment.baseURL;
  slug_image = environment.slug_images;
  qr_image = environment.qr_images;
  round_icn = environment.round_icons;
  photo = "";
  contactId: any;
  buttonStyle: any;
  buttonback: any;
  headingColor: any;
  descpColor: any;
  backColor: any;
  appIconStyle: any;
  isActive = false;
  qrimg: any;
  appicon: any;

  encodedId: any
  UppbackColor: any = '';
  private modalRef: any;
  title: any;
  ;

  // UppbackColor:any
  @ViewChild('mymodal', { static: false }) qrModal: ElementRef;
  socialIcon: any;


  constructor(private auth: ApiService, private router: Router, private route: ActivatedRoute, private common: CommonService, private modalService: NgbModal,) {
    this.common.showSpinner();
    // console.log("hello")
    this.route.params.subscribe((res: any) => {
      (!res)
        ? this.router.navigate(['/'])
        : this.getUserData(res)
      console.log(res)
    })
  }

  ngOnInit(): void {
    // this.getSocialLinks();
  }


  getUserData(res: any) {
    this.contactName = res.name;
    const data = { 'username': res.name, type: 'primary' };

    this.auth.getProfileData(data).subscribe((response: any) => {

      if (response.success == 0) {
        Swal.fire('Oops...', response.msg, 'error');
        this.router.navigate(['/']);
      } else if (response.success == 1) {
        // this.isActive = response.user.active == '1' ? true : false;
        this.userData = response.user;
        // this.contactId = this.userData.contact_id;
        // console.log(response?.style,"==================");
        // (response?.style) ? this.applyStyles(response.style) : '';

        if (response.services.length != 0) {
          (response.services || []).map((e: any) => {
            if ((e.type != 'quick_access')) {
              this.services.push(e);
              console.log(this.services)
            } else {
              this.otherServices.push(e);
            }
          });
        }

        if (response.user.instant == 1) {
          if (response.user.instant_slug != "" || response.user.instant_slug || response.user.instant_slug != undefined) {
            if (response.user.instant_slug == 'event') {
              var result = response.services.filter((o1: any) => {
                if (o1.slug == 'event') {
                  console.log(o1.id)
                  this.encodedId = o1.id;
                }
              })
              console.log(this.encodedId)
              const encodedIdd = btoa(this.encodedId);
              console.log(encodedIdd)
              const data: any = this.common.redirectToUrl(encodedIdd, this.userData.instant_slug,'');
              if (data) {
                this.common.hideSpinner()
                this.common.success('File downloaded successfully');
                window.location.href = data.url;
              } else {
                Swal.fire('Oops...', 'Somthing went wrong !', 'error');
                // this.common.error('Somthing went wrong');
                this.common.hideSpinner();
              }
            //  debugger
            } else if (response.user.instant_slug == 'contact') {
              this.common.hideSpinner()
              this.addContact(this.encodedId)
            }
            else if (response.user.instant_slug == 'messages') {
              this.common.hideSpinner()
              var result = response.services.filter((o1: any) => {
                if (o1.slug == 'messages') {
                  console.log(o1.title)
                  this.title = o1.title;
                }
              })
              const { url }: any = this.common.redirectToUrl(this.userData.instant_content, this.userData.instant_slug,this.title);
              location.replace(url);
            }
            else if (response.user.instant_slug == 'medical') {
              let { file_name } = this.services.find((e: any) => e.slug == response.user.instant_slug);
              this.qrimg = this.lost_found + file_name;
              this.modalRef = this.modalService.open(this.qrModal, { size: 'sm', ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
              return;
            }
            else if (response.user.instant_slug == 'notes') {
              this.common.hideSpinner()
              const { url }: any = this.common.redirectToUrl(this.userData.instant_content, this.userData.instant_slug,'');
              location.replace(url);
              // console.log( weburl, bundlename)
              // this.deeplink(weburl, bundlename);
            }


            else if (response.user.instant_slug == 'wifi' || response.user.instant_slug == 'pcr' || response.user.instant_slug == 'vaccine') {
              this.common.hideSpinner()
              let { qrimage } = this.services.find((e: any) => e.slug == response.user.instant_slug);
              this.qrimg = this.qr_image + qrimage;
              this.modalRef = this.modalService.open(this.qrModal, { size: 'sm', ariaLabelledBy: 'modal-basic-title', backdrop: 'static'
 });
              return;

            } else {

              this.common.hideSpinner()
              if (this.userData.instant_content && this.userData.instant_slug) {
                console.log(this.userData.instant_content, this.userData.instant_slug)
                const { url }: any = this.common.redirectToUrl(this.userData.instant_content, this.userData.instant_slug,'');
                console.log(url)
                //let ua = navigator.userAgent.toLowerCase();

                // window.location.href = url;
                location.replace(url);
              } else {
                this.common.error('No data found');
              }
            }
            this.saveOnLinkClick();
          } else {
            this.common.hideSpinner()
            Swal.fire('Oops...', 'No link/application found', 'error');
          }
        } else {
          this.common.hideSpinner()
          this.router.navigate(['/Profile', this.contactName])

          this.common.hideSpinner()

          // this.position = this.userData.position;

          // this.city = `${this.userData.city} ,${this.userData.country}`;

          // this.company = this.userData.company;

          // this.bio = this.userData.note;

          // this.photo = this.usrImg + this.userData.photo;

          // this.fullName = `${this.userData?.first_name ? this.userData.first_name : ''} ${this.userData?.last_name ? this.userData?.last_name : ''}`;
        }
      }
    })
  }

  // applyStyles(style: any) {
  //   console.log(style)
  //   this.buttonStyle = (style.btn_style == 'round') ? '40px' : '0px';
  //   this.buttonback = (style.btn_color == '') ? '#fff' : style.btn_color;
  //   this.headingColor = (style.text_color == '') ? '#0071BC' : style.text_color;
  //   this.descpColor = (style.text_color2 == '') ? '#9E9E9E' : style.text_color2;
  //   // console.log(style.keypad_color,"===========================");return
  //   this.backColor = (style.keypad_color == '') ? '#fff' : style.keypad_color;
  //   this.UppbackColor = (style.bg_color == '') ? '#fff' : style.bg_color;
  //   this.appIconStyle = (style.icon_style == 'rectangular') ? '0px' : '40px';
  //   this.appicon = style.icon_style;
  //   console.log(this.appicon)
  //   console.log(this.buttonback)
  // }



  addContact(data: any) {
    console.log(data)
    if (this.userData.contact_id) {
      const encodedStringBtoA = btoa(this.userData.contact_id);
      window.location.href = `${this.baseUrl}/export_contact/?contact_id=${encodedStringBtoA}`;
      this.common.success('File Downloaded Successfully');

    }
  }


  // applyStyles(style: any) {
  //   console.log(style)
  //   this.buttonStyle = (style.btn_style == 'round') ? '40px' : '0px';
  //   this.buttonback = (style.btn_color == '') ? '#fff' : style.btn_color;
  //   this.headingColor = (style.text_color == '') ? '#0071BC' : style.text_color;
  //   this.descpColor = (style.text_color2 == '') ? '#9E9E9E' : style.text_color2;
  //   // console.log(style.keypad_color,"===========================");return
  //   this.backColor = (style.keypad_color == '') ? '#fff' : style.keypad_color;
  //   this.UppbackColor = (style.bg_color == '') ? '#fff' : style.bg_color;
  //   this.appIconStyle = (style.icon_style == 'rectangular') ? '0px' : '40px';
  //   this.appicon = style.icon_style;
  //   console.log(this.appicon)
  //   console.log(this.buttonback)
  // }

  // onSocial(url: any, slug: string) {
  //   // console.log(url);return
  //   if (slug == 'wifi' || slug == 'pcr' || slug == 'vaccine' || slug == 'medical') {
  //     let { qrimage } = this.services.find((e: any) => e.slug == slug);
  //     this.qrimg = this.qr_image + qrimage;
  //     this.modalRef = this.modalService.open(this.qrModal, { size: 'sm', ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
  //     return;
  //   }
  //   if (slug == 'messages' || slug == 'notes') {
  //     this.common.error('No any url added');
  //   }
  //   if (slug == 'event') {
  //     let data = this.services.find((e: any) => e.slug == slug);
  //     const encodedId = btoa(data.id);

  //     const urlData: any = this.common.redirectToUrl(encodedId, slug);
  //     // console.log(urlData);return;
  //     if (urlData) {
  //       this.common.success('File downloaded successfully');
  //       window.location.href = urlData.url;
  //     } else {
  //       Swal.fire('Oops...', 'Somthing went wrong !', 'error');
  //       // this.common.error('Somthing went wrong');
  //       this.common.hideSpinner();
  //     }
  //     console.log(data);
  //     return;
  //   }

  //   this.common.showSpinner();
  //   const slugData = this.services.find((e: any) => { return e.slug === slug });

  //   let data = { 'profile_user_id': slugData.user_id, 'slug': slugData.slug, 'service_id': slugData.id };
  //   // console.log(data);return;

  //   const formData = new FormData();

  //   formData.append('profile_user_id', slugData.user_id);
  //   formData.append('slug', slugData.slug);
  //   formData.append('service_id', slugData.id);

  //   this.auth.saveUserServicesClicks(formData).subscribe((response: any) => {
  //     console.log(response)
  //     // console.log(response,"=======");return
  //     if (response.success == 1) {
  //       console.log(url, slug)

  //       const { url: weburl, bundlename }: any = this.common.redirectToUrl(url, slug);

  //       this.deeplink(weburl, bundlename);

  //     }
  //     this.common.hideSpinner();
  //   }, (e) => {
  //     this.common.hideSpinner();
  //   })

  //   // console.log(slugData);

  //   // console.log(this.services);return;
  // }


  // redirectToUrl(url: any) {
  //   console.log(url)
  //   // console.log(url);
  //   if (url) {
  //     //window.location.href = url;
  //     window.open(url, '_blank');

  //   }
  // }

  // addContact() {
  //   const token = this.common.getToken();
  //   if (token) {
  //     let data = { 'contact_id': this.contactId };

  //     this.auth.saveSharedContact(data).subscribe((response: any) => {
  //       if (response.success == 1) {
  //         this.common.success(response.msg);
  //       } else {
  //         this.common.error(response.msg);
  //       }
  //     }, (e) => {
  //       this.common.error(e.error.msg);
  //     })
  //   }

  //   if (this.contactId) {
  //     const encodedStringBtoA = btoa(this.contactId);
  //    // window.location.href = `${this.baseUrl}/export_contact/?contact_id=${encodedStringBtoA}`;
  //     window.open(`${this.baseUrl}/export_contact/?contact_id=${encodedStringBtoA}`, '_blank');

  //   }

  // }

  // moveToPage() {
  //   console.log('clicked');
  //   const encodedName = btoa(this.contactName);
  //   this.router.navigate(['/profile-contact-form', encodedName, this.userData.user_id])
  // }

  // onImgError(event: any) {
  //   event.target.src = '../../../assets/images/dummy_user.png';
  // }


  saveOnLinkClick() {
    console.log(this.services)
    const slugData = this.services.find((e: any) => {
      return e.slug === this.userData.instant_slug
    });
    console.log(slugData)
    if (slugData) {
      let data = { 'profile_user_id': this.userData.user_id, 'slug': this.userData.instant_slug, 'service_id': slugData.id };

      this.auth.saveUserServicesClicks(data).subscribe((response: any) => {
        if (response.success == 1) {

        }
      })
    }
  }

  // getSocialLinks() {
  //   const formData = new FormData();

  //   this.auth.getServiceIcons(formData).subscribe((response: any) => {
  //     // console.log(response,"===============servce");
  //   })

  // }


  // deeplink(url: string, bundlename: string) {

  //   console.log(url, bundlename)

  //   let ua = navigator.userAgent.toLowerCase();
  //   let isAndroid = ua.indexOf("android") > -1; // android check

  //   console.log(isAndroid)

  //   let isIphone = ua.indexOf("iphone") > -1; // ios check
  //   console.log(isIphone)
  //   // if (isIphone == true) {
  //     if (isIphone == false) {
  //     let app = {
  //       launchApp: function () {
  //         setTimeout(function () {
  //         //  window.location.href = url;
  //           window.open(url, '_blank');


  //         }, 25);
  //        // window.location.href = bundlename;
  //         window.open(bundlename, '_blank');


  // deeplink(url: string, bundlename: string) {

  //   console.log(url, bundlename)

  //   let ua = navigator.userAgent.toLowerCase();
  //   let isAndroid = ua.indexOf("android") > -1; // android check
    
  //   console.log(isAndroid)
    
    // let isIphone = ua.indexOf("iphone") > -1; // ios check
    // console.log(isIphone)
    // if (isIphone == true) {
     // debugger
      // if (isIphone == false) {
      // let app = {
      //   launchApp: function () {
      //     setTimeout(function () {
          //  window.location.href = url;
            // window.open(url, '_blank');

            
       //}   }, 25);
         // window.location.href = bundlename;
          // window.open(bundlename, '_blank');

          //which page to open(now from mobile, check its authorization)
     //   },
      
//         openWebApp: function () {
        //  window.location.href = url;
       // debugger
          // window.open(url, '_blank');

  //         //which page to open(now from mobile, check its authorization)
  //       },
  //       openWebApp: function () {
  //       //  window.location.href = url;
  //         window.open(url, '_blank');


  //       }
  //     };
  //     app.launchApp();
  //   // } else if (isAndroid == true) {
  //   } else if (isAndroid == false) {

  //     let app = {
  //       launchApp: function () {
  //         window.location.replace(bundlename); //which page to open(now from mobile, check its authorization)
  //         setTimeout(this.openWebApp, 500);
  //       },
  //       openWebApp: function () {
  //        // window.location.href = url;
  //         window.open(url, '_blank');

  //       }
  //     };
  //     app.launchApp();
  //   } else {
  //     console.log(url)
  //    // window.location.href = url;
  //     window.open(url, '_blank');

  //   }
  // }


  // deeplink(url: string, bundlename: string) {

  //   console.log(url, bundlename)

  //   let ua = navigator.userAgent.toLowerCase();
  //   let isAndroid = ua.indexOf("android") > -1; // android check
    
  //   console.log(isAndroid)
    
  //   let isIphone = ua.indexOf("iphone") > -1; // ios check
  //   console.log(isIphone)
  //   // if (isIphone == true) {
  //     if (isIphone == false) {
  //     let app = {
  //       launchApp: function () {
  //         setTimeout(function () {
  //         //  window.location.href = url;
  //           window.open(url, '_blank');

            
  //         }, 25);
  //        // window.location.href = bundlename;
  //         window.open(bundlename, '_blank');

  //         //which page to open(now from mobile, check its authorization)
  //       },
  //       openWebApp: function () {
  //       //  window.location.href = url;
  //         window.open(url, '_blank');

  //       }
  //     };
  //     app.launchApp();
  //   // } else if (isAndroid == true) {
  //   } else if (isAndroid == false) {

  //     let app = {
  //       launchApp: function () {
  //         window.location.replace(bundlename); //which page to open(now from mobile, check its authorization)
  //         setTimeout(this.openWebApp, 500);
  //       },
  //       openWebApp: function () {
  //        // window.location.href = url;
  //         window.open(url, '_blank');

  //       }
  //     };
  //     app.launchApp();
  //   } else {
  //     console.log(url)
  //    // window.location.href = url;
  //     window.open(url, '_blank');

  //   }
  // }
}