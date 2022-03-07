import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-app-lost-found',
  templateUrl: './app-lost-found.component.html',
  styleUrls: ['./app-lost-found.component.scss']
})
export class AppLostFoundComponent implements OnInit {

  imgUrl=environment.slug_images;
  lostData:any={};
  name:string='';
  relation:string='';
  image:any;
  description:any='';
  tel:any='';
  email:any='';
  contact:any='';
  title:any='';
  addr:any='';
  constructor(private router:Router) { 
    const data = localStorage.getItem('lost_found');
    if(data){
      this.lostData = JSON.parse(data);
      // console.log(data);
    }else{
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // console.log(this.lostData,"==========")
    this.makeData();
  }

  makeData(){
    if(this.lostData){
      this.name = (this.lostData.name ? this.lostData.name : '');
      this.relation = (this.lostData.relation ? this.lostData.relation : '');
      this.image = (this.lostData.photo ? this.imgUrl + this.lostData.photo : '');
      console.log(this.image);
      this.description = (this.lostData.description ? this.lostData.description : '');
      this.tel = (this.lostData.phone ? this.lostData.phone : '');
      this.email = (this.lostData.email ? this.lostData.email : '');
      this.contact = (this.lostData.contact_name ? this.lostData.contact_name : '');
      this.title = (this.lostData.contact_title ? this.lostData.contact_title : '');
      this.addr =` ${this.lostData.street_1} ${this.lostData.street_2},${this.lostData.postcode},${this.lostData.state} ${this.lostData.country}`
    } 
  }

  onImgError(event:any){
    event.target.src = '../../../assets/images/def_app.png';
  }
}
