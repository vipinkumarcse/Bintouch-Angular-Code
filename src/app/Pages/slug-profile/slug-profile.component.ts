import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-slug-profile',
  templateUrl: './slug-profile.component.html',
  styleUrls: ['./slug-profile.component.scss']
})
export class SlugProfileComponent implements OnInit {

  slug:any;
  constructor(private router:Router,private route:ActivatedRoute) { 
    this.route.params.subscribe((res: any) => {
      (!res)
      ? this.router.navigate(['/'])
      : this.slug = res.slug;
    })
  }

  ngOnInit(): void {
    // console.log("==============>",this.slug);
  }

}
