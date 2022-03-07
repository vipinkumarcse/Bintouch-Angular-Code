import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {CommonService} from '../../services/common/common.service';



@Component({
  selector: 'app-emenu-card',
  templateUrl: './emenu-card.component.html',
  styleUrls: ['./emenu-card.component.scss']
})
export class EmenuCardComponent implements OnInit {

  imgUrl=environment.slug_images;
  emenuData:any=[];
  allCatData:any=[];
  hasData:boolean = false;

  constructor(private router:Router,private common:CommonService) {

    const data = localStorage.getItem('emenu');
    if(data){
      this.emenuData = JSON.parse(data);
    }else{
      this.router.navigate(['/']);
    }
   }

  ngOnInit(): void {
    if(this.emenuData.category.length != -0){
      this.allCatData = this.emenuData.category;
      this.hasData = true;
    }else{
      this.common.error('No Data Found')
    }
  }

  onImgError(event:any){
    event.target.src = '../../../assets/images/def_app.png';
  }

}
