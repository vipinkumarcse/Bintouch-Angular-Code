import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
import { EventsService } from 'src/app/services/event/events.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  userData: any;
  src: any;
  imageUrl:any
  File: any;
  constructor(private service:ApiService,private common:CommonService, public event: EventsService) { }

  ngOnInit(): void {
    this.imageUrl = this.service.imageUrl
    if (localStorage.getItem('B-in-Touch')) {
      this.userData = JSON.parse(localStorage.getItem('B-in-Touch') || '{}')
      this.src =`${this.imageUrl}${this.userData.photo}`

      console.log(this.userData, "data")
    }
  }
  profile(data:NgForm){
    console.log(data)
  }
  chnange(dat:NgForm){
    console.log(dat.form.value)
  }
  async profilePic(e:any) {
    const file = e.target.files[0];
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.File = file;
      var fd=new FormData
      fd.append('file_name',this.File)
      this.service.uploadFile(fd).subscribe((res:any)=>{
        if (res['success'] == 1) {
          this.src =`${res.base_url}${res.file_name}`
          localStorage.setItem("B-in-Touch", JSON.stringify(res["user"]));
          this.event.publishSomeData("editData")
        }
        else {
          this.common.error(res.msg);
    
        }
      })
    } else {
      this.common.error('Selected file is not image.');
    }
  }
}
