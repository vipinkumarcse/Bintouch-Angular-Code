import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {
  tutorialList: any;

  constructor(private service: ApiService, private common: CommonService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.service.get_tutorials('').subscribe((res:any)=>{
      console.log(res)
      this.tutorialList = res.items;
      res.items.forEach((element:any) => {
        element.tutorial.forEach((element1:any) => {
          if (element1.type == 'youtube') {
          let url = element1.youtube_url.replace("watch", "embed");
          element1.safevideo = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          }
          if (element1.type == 'upload') {
            element.safevideo = this.sanitizer.bypassSecurityTrustHtml(element1.video);
            }
        });
        
      });
    })
  }

}
