import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../Component/sidebar/sidebar.component';

@Component({
  selector: 'app-application-callsms',
  templateUrl: './application-callsms.component.html',
  styleUrls: ['./application-callsms.component.scss']
})
export class ApplicationCallsmsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    ////location.reload() 
    //   localStorage.setItem('foo', 'no reload')
    //   location.reload()
    // } else {
    //   localStorage.removeItem('foo')
    // }
  }

}

