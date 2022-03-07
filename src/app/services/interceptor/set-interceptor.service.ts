import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
// import {LocalStorageService} from 'angular-web-storage';
// import {CommonService} from '../common/common.service';


@Injectable({
  providedIn: 'root'
})
export class SetInterceptorService {

  constructor(
    // private localStorage: LocalStorageService,
    // private common: CommonService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedReq = this.handleRequest(req);
    // this.common.showSpinner();
    return next.handle(clonedReq);
  }
  handleRequest(req: HttpRequest<any>) {
    // if (req.url == 'https://www.apsp.biz/MerchantTools/MerchantTools.svc/BuildXMLToken') return req;
    const token =localStorage.getItem('token');

    // console.log( token,"token ")
    let authReq;
    authReq = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token ? token : '',

      })
    });
    if ((req.method.toLowerCase() == 'post' || req.method.toLowerCase() == 'put') && req.body instanceof FormData) {
      authReq = req.clone({
        headers: new HttpHeaders({
          'token': token ? token : '',
          // Authorization: `Bearer ${ token} ? ${token}: '' `

        })
      });
    }
    return authReq;
  }

}
