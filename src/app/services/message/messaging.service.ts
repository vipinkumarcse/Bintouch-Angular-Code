import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import '@firebase/messaging';
import * as firebase from 'firebase/app';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
@Injectable()
export class MessagingService {
    deviceToken: any;
    // angularFireMessaging:any;
    constructor(public angularFireMessaging: AngularFireMessaging) {
        try {
            firebase.initializeApp(environment.firebase);
            const messaging = firebase.messaging();
        } catch (e) {
            console.log(e)
        }
    }
    requestPermission() {
        this.angularFireMessaging.requestToken.subscribe((token:any) => {
            // console.log(token);
            if (token == null) {
                // this.checkPermission()
                // this.presentToast('Warning', 'top-end', 'You blocked the notifications');
                // this.requestPermission();
            } else {
                this.deviceToken = token;
                console.log(this.deviceToken)
                localStorage.setItem('deviceToken',this.deviceToken )
                this.receiveMessage();
            }
        }, (err:any) => {
            console.error('Unable to get permission to notify.', err);
        });
    }

    receiveMessage() {
        this.angularFireMessaging.messages.subscribe(
            (payload: any) => {
                console.log("new message received. ", payload);
                console.log(payload.notification);
                if(payload.notification != undefined){
                    this.showNotification(payload.notification);
                }
                
            }, (err:any) => {
                console.log('notification blocked')
            })
    }

    showNotification(value:any) {
        // create a new notification
        const notification = new Notification(value.title, {
            body: value.title,
            icon: './assets/images/main-logo.png'
        });

        // close the notification after 10 seconds
        setTimeout(() => {
            notification.close();
        }, 10 * 1000);

        // navigate to a URL
        notification.addEventListener('click', () => {
            window.open('https://www.javascripttutorial.net/web-apis/javascript-notification/', '_blank');
        });
    }

    async checkPermission() {
        // check notification permission
        let granted = false;
        if (Notification.permission === 'granted') {
            granted = true;
        } else if (Notification.permission !== 'denied') {
            let permission = await Notification.requestPermission();
            granted = permission === 'granted' ? true : false;
        }

        // show notification or error
        granted ? this.receiveMessage() : this.presentToast('warning', 'top-end', 'You blocked the notifications.');
    }

    presentToast(type: any, position: any, msg: any) {
        const Toast = Swal.mixin({
            toast: true,
            position, // top-end
            showCancelButton: false,
            showCloseButton: true,
            showConfirmButton: false,
            timer: 3000
        });
        Toast.fire({
            icon: type,
            title: msg
        });
    }
}