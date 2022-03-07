import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-app-emergency',
  templateUrl: './app-emergency.component.html',
  styleUrls: ['./app-emergency.component.scss']
})
export class AppEmergencyComponent implements OnInit {

  imgUrl=environment.slug_images;
  emergencyData:any={};
  name:string='';
  dob:any='';
  isOrganDonor:any='';
  height:any='';
  weight:any='';
  bloodType:any='';
  image:any;
  cardData:any=[];
  med_condn:any=[];
  allrgy:any=[];
  medication:any=[];
  med_note:any=[];
  emrg_cont:any=[];


  constructor(private router:Router) {

    const data = localStorage.getItem('emergency');
    if(data){
      this.emergencyData = JSON.parse(data);
       }else{
      this.router.navigate(['/']);
    }
   }

  ngOnInit(): void {
    this.makeData();
  }

  makeData(){
    if(this.emergencyData){
      this.name = this.emergencyData.first_name + this.emergencyData.last_name  ;
      this.image = (this.emergencyData.photo ? this.imgUrl + this.emergencyData.photo : '');
      console.log(this.image);
      this.dob = (this.emergencyData.dob ? this.emergencyData.dob : '');
      this.isOrganDonor = (this.emergencyData.organ_donar ? this.emergencyData.organ_donar : '');
      this.height = (this.emergencyData.height ? this.emergencyData.height : '');
      this.weight = (this.emergencyData.weight ? this.emergencyData.weight : '');
      this.bloodType = (this.emergencyData.blood_type ? this.emergencyData.blood_type : '');
      this.cardData = (this.emergencyData.medical_card.length != 0 ? this.emergencyData.medical_card : []);
      (this.cardData || []).map((e:any)=>{
        if(e.type == 'medical_condition'){
          this.med_condn.push(e);
        }else if(e.type == 'allergy'){
          this.allrgy.push(e);
        }else if(e.type == 'medical_note'){
          this.med_note.push(e);
        }else if(e.type == 'medication'){
          this.medication.push(e);
        }else if(e.type == 'emergency_contact'){
          this.emrg_cont.push(e);

        }
      })
    } 
  }

  onImgError(event:any){
    event.target.src = '../../../assets/images/def_app.png';
  }

  call(data:any){
    const url = `${data}`
    console.log(url)
    document.location.href = "tel:+" + url
  }

}
