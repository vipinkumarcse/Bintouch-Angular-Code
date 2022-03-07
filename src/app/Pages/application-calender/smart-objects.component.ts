import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-smart-objects',
  templateUrl: './smart-objects.component.html',
  styleUrls: ['./smart-objects.component.scss']
})
export class SmartObjectsComponent implements OnInit {
  smartobjects: any;

  constructor(private service:ApiService,private common:CommonService) { }

  ngOnInit(): void {

    this.Smartobject()
  }
  Smartobject(){
    this.service.getuserSmartobject('').subscribe((res: any) => {
      if (res['success'] == 1) {
        this.smartobjects=res.items
      }
      else {
        this.common.error(res.msg);
  
      }
    })
  }
  change(event:any,status:any){
    // let form = {
    //   "promoId": event._id,
    //   "status": status ? 0 : 1
    // }
    var fd = new  FormData
    fd.append('shared_services',event.shared_services)
    fd.append('tag_id',event.tag_id)
    fd.append('tag_name',event.tag_name)
    fd.append('lock_status',status)

    this.service.updatesmartObject(fd).subscribe((res: any) => {
      if (res['success'] == 1) {
        this.common.success(res.msg)
        // this.smartobjects=res.items
      }
      else {
        // this.common.error(res.msg);
  
      }
    })  }
    remove(event:any){
    console.log(event)
    var fd = new  FormData
    fd.append('shared_services','')
    fd.append('tag_id',event.tag_id)
    fd.append('tag_name',event.tag_name)
    fd.append('lock_status',event.lock_status)
    this.service.updatesmartObject(fd).subscribe((res: any) => {
      if (res['success'] == 1) {
        this.common.success(res.msg)
        this.Smartobject()
      }
      else {
        this.common.error(res.msg);
  
      }
    })
    }
}
