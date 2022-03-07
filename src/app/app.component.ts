import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MessagingService } from './services/message/messaging.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public router:Router,private route:ActivatedRoute,private messagingService:MessagingService){
    console.log(this.router.config,"===============");
    this.getNotification();

  }
  title = 'B-in-Touch';
  getNotification(){
    const userId = 'user001';
  
    this.messagingService.requestPermission()
    this.messagingService.receiveMessage()
   }
}
