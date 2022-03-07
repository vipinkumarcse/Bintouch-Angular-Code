import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
// import {CommonService} from '../common/common.service';
// import {LocalStorageService} from "angular-web-storage";
// import { ObservableService } from '../rxjs/observable.service';
// import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})
export class GetInterceptorService {

  constructor(
    // private common: CommonService,
    private router: Router,
    // private localStorage: LocalStorageService,
    // private observable: ObservableService,
    // private url: UrlService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // if (event.url != this.url.bookingUrl && event.url != this.url.paymentUrl) this.common.hideSpinner()
        // console.log(event);
        // if (event.status == 200 && event.url.split('/').pop() != 'countryCodes.json' && event.url != this.url.paymentUrl && !event.body.success) return this.error(event.body.message);
      }
    }, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        // this.common.hiYdeSpinner();
        // if (error.status == 401 || error.status == 403) {
        //   this.error('Your session is expired, please sign in.');
        //   this.localStorage.clear();
        //   // this.observable.setLogin(false);
        //   return this.router.navigateByUrl('/');
        // } else {
        //   return alert(error.message);
        // }
      }
    }));
  }
  error = (message:any) => {
    // this.common.error(message);
  }
}
