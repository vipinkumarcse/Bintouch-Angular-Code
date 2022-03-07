
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Pages/application-calender/common.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private common: CommonService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        console.log(event.body.http_status)
        if(event.body.http_status == '401' ){
          this.common.error('You have been logged out for security purpose!');
          this.router.navigate(['']);
        }
        // if (event.url != this.url.bookingUrl && event.url != this.url.paymentUrl) this.common.hideSpinner()
        // console.log(event);
        // if (event.status == 200 && event.url.split('/').pop() != 'countryCodes.json' && event.url != this.url.paymentUrl && !event.body.success) return this.error(event.body.message);
      }
    }, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        console.log(error)
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

    // return next.handle(request)
    //   .pipe(
    //     tap(event => { }, error => {
    //       switch (error.status) {
    //         case 401:
    //           /********** Auto logout if 401 response returned from api **********/
    //          // alert('You have been logged out for security purpose!');
    //           this.common.error('You have been logged out for security purpose!');
    //           this.router.navigate(['']);
    //           // this.message.alert('error', 'OOPS!', 'Sorry, your account has been logged in other device! Please login again to continue.');
    //           break;
    //         case 0:
    //           /********** If server dosent respond **********/
    //           alert('Please check internet connection!');
    //           break;
    //         default:
    //           /********** Check for other serve-side errors **********/
    //           if(error.error)
    //           if(error.error.message)
    //             alert(error.error.message);
    //           break;
    //       }
    //     }));
  }

