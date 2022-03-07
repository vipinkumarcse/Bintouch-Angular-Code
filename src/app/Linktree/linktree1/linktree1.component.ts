import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-linktree1',
  templateUrl: './linktree1.component.html',
  styleUrls: ['./linktree1.component.scss']
})
export class Linktree1Component implements OnInit {
  linkTree:any=[];
  buttonStyle:any;
  buttonback:any;
  title:any='';
  bio:any='';
  coverImg:any;
  profileImg:any;
  slugImg= environment.service_icons;
  imgUrl = environment.slug_images;
  pageBack:any;
  otherLinks:any=[];
  socialLinks:any=[];
  iconStyle:any;
  bioTextColor:any;

  constructor(private router:Router) {
    const data = localStorage.getItem('linktree');
    if(data){
      this.linkTree = JSON.parse(data);
       }else{
      this.router.navigate(['/']);
    }
   }

  ngOnInit(): void {
    this.makeData();
  }


  makeData(){
    this.buttonStyle = (this.linkTree.button_style  == 'rounded') ? '30px' : '14px';
    this.buttonback = (this.linkTree.button_color == '') ? '#fff' : this.linkTree.button_color;
    this.title = this.linkTree.title;
    this.bio = this.linkTree.bio;
    this.coverImg = this.imgUrl+this.linkTree.cover_photo;
    this.pageBack = (this.linkTree.bg_color == '') ? '#ffff' : this.linkTree.bg_color;
    this.profileImg = this.imgUrl+this.linkTree.photo;
    this.iconStyle = this.linkTree.icon_style;
    this.bioTextColor =  (this.linkTree.text_color == '') ? '#000' : this.linkTree.text_color;

    (this.linkTree.links || []).map((e:any)=>{
      if(e.type == 'social'){
        this.socialLinks.push(e);
      }else{
        this.otherLinks.push(e);
      }
    })
// console.log('other links',this.otherLinks);
// /    console.log('social links',this.socialLinks);
  }


  onImgError(event:any){
    event.target.src = '../../../assets/images/def_app.png';
  }


}

