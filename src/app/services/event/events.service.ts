import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  private fooSubject = new Subject<any>();

  publishSomeData(data: any) {
    console.log(data)
      this.fooSubject.next(data);
  }

  getObservable(): Subject<any> {
      return this.fooSubject;
  }
}
