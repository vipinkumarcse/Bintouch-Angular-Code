import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor() { }
  
  gettoken(){  
    return !!localStorage.getItem("B-in-Touch");  
    }
}
