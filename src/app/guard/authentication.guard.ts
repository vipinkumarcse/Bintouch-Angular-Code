import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import{AuthenticationServiceService} from '../guard/authentication-service.service'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private Authguardservice: AuthenticationServiceService, private router: Router) {}  

    canActivate(next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {  
      if (!this.Authguardservice.gettoken()) {  
          this.router.navigateByUrl("/");  
      }  
      return this.Authguardservice.gettoken(); 
    
  }
  
}
