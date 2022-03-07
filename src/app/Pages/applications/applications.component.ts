import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ApplicationNameComponent } from '../application-name/application-name.component';
import { MatDialog } from '@angular/material/dialog';

declare var $: any;

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})

export class ApplicationsComponent implements OnInit {
  public ajaxSettings: object;
  public allowDragAndDrop: boolean;
  public hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';


  activeCustomers = [
    'John',
    'Watson'
  ];

  inactiveCustomers = [
    'Adam',
    'Jack',
    'Katherin'
  ];
  applicationDetails: any=[];
  private modalRef: any;
  catForm: FormGroup
  inputField = false
  CategoryList: any = 0;
  search: any
  bodyId: any;
  dragDivId: any;
  dropDivId: any;
  slug: any;
  dialogRef: any;
  classAdd: boolean = false;
  classMobile = false

  constructor(private service: ApiService,
    private common: CommonService,
    private modalService: NgbModal,
    private router: Router,
    public formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { 
  //   this.ajaxSettings = {
  //     url: this.hostUrl + 'api/FileManager/FileOperations',
  //     getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
  //     uploadUrl: this.hostUrl + 'api/FileManager/Upload',
  //     downloadUrl: this.hostUrl + 'api/FileManager/Download'
  // };
  // this.allowDragAndDrop = true;
  }

  ngOnInit(): void {

    this.common.ref();
    this.applicationData();
    this.catForm = this.formBuilder.group({
      name: [''],
    })

    this.ajaxSettings = {
      url: this.hostUrl + 'api/FileManager/FileOperations',
      getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
      uploadUrl: this.hostUrl + 'api/FileManager/Upload',
      downloadUrl: this.hostUrl + 'api/FileManager/Download'
  };
  this.allowDragAndDrop = true;
  
  }

  openDialog(id:any,slug:any,name:any){
    let data ={
      id:id,
      slug:slug,
      name:name
    }
    this.dialogRef = this.dialog.open(
      ApplicationNameComponent, {width: '350px' })
     // dialogRef.componentInstance.user = data;;

     this.dialogRef.componentInstance.fromParent = data;
    // dialogRef.result.then((result:any) => {
    //   console.log(result);
    // }, (reason) => {
    // });
    this.dialogRef.afterClosed().subscribe((result:any) => {
      console.log("comp closed");
      this.applicationData();
  })
  // dialogRef.afterClosed().subscribe(result => {
  //   console.log('The dialog was closed');
  //   console.log(result)
  //   this.getListMedical(this.emergencyId)
  //   // this.animal = result;
  // });
  }


  applicationData() {
    this.applicationDetails=[]
    this.service.getApplicationList('').subscribe((res: any) => {
      this.GetContactList()
      this.classAdd = true 
      if (res.success == 1) {
       // this.applicationDetails = res.items
        res.items.forEach((element:any) => {
          if(element.source != 'primary'){
            this.applicationDetails.push(element)
          }
        })
        this.classMobile = false
        if(this.CategoryList){
          this.CategoryList.forEach((element:any) => {
            element.active = false
          });
        }
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


  showModal(modal: any) {
    this.modalRef = this.modalService.open(modal, { size: 'xl', ariaLabelledBy: 'modal-basic-title', backdrop: 'static', modalDialogClass: 'applicationModal', centered: true });
  }

  movetoRoute(route: any) {
    this.modalService.dismissAll();
    this.router.navigate([`/${route}`])
  }

  input() {
    this.inputField = true
  }

  submitCat() {
    // Token( in header), name, row_order, id(for update)
    // console.log(this.catForm.value.catname)
    let row: any = this.CategoryList.length + 1
    console.log(row)
    var data = new FormData
    data.append('name', this.catForm.value.name)
    data.append('row_order', row)
    this.service.SaveApplicationCategory(data).subscribe((res: any) => {
      console.log(res)
      this.inputField = false
      this.catForm.reset()
      this.GetContactList()
    })
  }

  deleteContact(id: any) {
    var data = new FormData
    data.append('id', id)
    this.service.DeleteCApplicationCategory(data).subscribe((res: any) => {
      console.log(res)
      if (res.success == 1) {
        this.GetContactList()
        this.common.success(res["msg"]);
      }else{
        this.common.error(res["msg"]);
      }
    }, error => {
    })

  }

  GetContactList() {
    this.service.GetApplicationCategories().subscribe((res: any) => {
      console.log(res)
      if (res.success == 1) {
        this.CategoryList = res.items;
        // this.done = this.contactList
        console.log(this.CategoryList)
        this.CategoryList.forEach((element:any) => {
          element.active = false
          
        });
      }
    }, error => {
    })
  }

  deleteapp(id: any, slug: any) {
    var data = new FormData
    data.append('id', id)
    data.append('slug', slug)
    this.service.DeleteApplicationList(data).subscribe((res: any) => {
      console.log(res)
      if (res.success == 1) {
        this.common.success("Successfully deleted");
        this.applicationData()
      }else{
        //this.common.error(res["msg"]);
      }
    }, error => {

    })
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   console.log(event)
  //   if (event.previousContainer === event.container) {
  //     console.log('dropped Event', `> dropped '${event.item.data}' into '${event.container.id}'`);
  //     console.log(event.item.data)
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   } else {
  //     console.log('dropped Event', `> dropped '${event.item.data}' into '${event.container.id}'`);
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }
  // }

  dropHandler(event: any) {
    console.log('File(s) dropped');
    console.log(event)
  }

  dragOverHandler(event: any) {
    console.log(event)
  }

  edit(id: any, slug: any) {
    console.log(slug)
    switch (slug) {
      case 'contact':
        this.router.navigate(['/contactcard', {
          id: id,
          slug: slug
        }])
        break;
      case 'event':
        this.router.navigate(['/event', {
          id: id,
          slug: slug
        }])
        break;
      case 'calendar':
        this.router.navigate(['/calendar', {
          id: id,
          slug: slug
        }])
        break
      case 'cv':
        this.router.navigate(['/cv', {
          id: id,
          slug: slug
        }])
        break
      case 'googleMaps':
        this.router.navigate(['/direction', {
          id: id,
          slug: slug
        }])
        break
      case 'whatsApp':
        this.router.navigate(['/whatsapp', {
          id: id,
          slug: slug
        }])
        break
      case 'notes':
        this.router.navigate(['/textnote', {
          id: id,
          slug: slug
        }])
        break
      case 'link':
        this.router.navigate(['/link', {
          id: id,
          slug: slug
        }])
        break
      case 'wifi':
        this.router.navigate(['/wifi', {
          id: id,
          slug: slug
        }])
        break
      case 'lost_found':
        this.router.navigate(['/lostnfound', {
          id: id,
          slug: slug
        }])
        break
      case 'emergency':
        this.router.navigate(['/emergency', {
          id: id,
          slug: slug
        }])
        break
      case 'phone':
        this.router.navigate(['/callsms', {
          id: id,
          slug: slug
        }])
        break
      case 'messages':
        this.router.navigate(['/callsms', {
          id: id,
          slug: slug
        }])
        break
        case 'linktree':
          this.router.navigate(['/linktree', {
            id: id,
            slug: slug
          }])
          break
          case 'emenu':
            this.router.navigate(['/eMenu', {
              id: id,
              slug: slug
            }])
            break
      // default:
      // code block
    }
  }

  

//   onFileDragStart(args: any) {
//     console.log("File drag start");
// }
// // File Manager's file drag stop event function
// onFileDragStop(args: any) {
//     console.log("File drag stop");
// }
// // File Manager's file dragging event function
// onFileDragging(args: any) {
//     console.log("File dragging");
// }
// // File Manager's file dropped event function
// onFileDropped(args: any) {
//     console.log("File dropped");
// }

// drop(index:any,event: CdkDragDrop<string[]>) {
//   alert(index)
  
//   if (event.previousContainer === event.container) {
//     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
//   } else {
//     transferArrayItem(event.previousContainer.data,
//                       event.container.data,
//                       event.previousIndex,
//                       event.currentIndex);
//   }
// }

drag(ev:any,id:any,slug:any) {
  this.bodyId=id
  // ev.dataTransfer.setData("text", ev.target.id);
  this.dragDivId = ev.target.id
  this.slug=slug
}

drop(ev:any,i:any, id:any) {
    console.log(this.bodyId,id)
    var data = new FormData
    data.append('service_id', this.bodyId)
    data.append('cat_id', id)
    data.append('slug', this.slug)


 this.service.saveCategoryRelation(data).subscribe((res:any)=>{
  console.log(res)
  if(res.http_status=='200'){
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

getFilterApplicationListing(categoryId:any){
  this.classAdd = false 
  this.classMobile = false
  console.log(categoryId)
  this.CategoryList.forEach((element: any) => {
    element.active = false
    if (element.id == categoryId) {
      element.active = true
    }
  });
  console.log(this.CategoryList)
  var data = new FormData()
  data.append('cat_id', categoryId)
 this.service.getApplicationList(data).subscribe((res:any)=>{
   
  
  this.applicationDetails=res.items;   
 })
}

// editname(id:any, slug:any){
//   console.log(id,slug)
//   $('.modal-backdrop').remove();
//   $('#editnameaa').modal('show');
// }

showMobile(){
  this.classAdd = false
  this.classMobile = true
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
}
