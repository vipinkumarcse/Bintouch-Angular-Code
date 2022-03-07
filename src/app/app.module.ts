import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {GetInterceptorService} from "./services/interceptor/get-interceptor.service";
import {SetInterceptorService} from "./services/interceptor/set-interceptor.service";
import { AppRoutingModule } from './app-routing.module';
import {ToastrModule} from "ng6-toastr-notifications";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Pages/login/login.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { SmartObjectsComponent } from './Pages/smart-objects/smart-objects.component';
import { ApplicationsComponent } from './Pages/applications/applications.component';
import { ContactsComponent } from './Pages/contacts/contacts.component';
import { SettingComponent } from './Pages/setting/setting.component';
import { SidebarComponent } from './Component/sidebar/sidebar.component';
import { ForgotpasswordComponent } from './Pages/forgotpassword/forgotpassword.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { ResetPaawordComponent } from './Pages/reset-paaword/reset-paaword.component';
import { ApplicationCalenderComponent } from './Pages/application-calender/application-calender.component';
import { ApplicationCallsmsComponent } from './Pages/application-callsms/application-callsms.component';
import { ApplicationContactcardComponent } from './Pages/application-contactcard/application-contactcard.component';
import { ApplicationCvComponent } from './Pages/application-cv/application-cv.component';
import { ApplicationDirectionComponent } from './Pages/application-direction/application-direction.component';
import { ApplicationEmailComponent } from './Pages/application-email/application-email.component';
import { ApplicationEMenuComponent } from './Pages/application-e-menu/application-e-menu.component';
import { ApplicationEmergencyComponent } from './Pages/application-emergency/application-emergency.component';
import { ApplicationEventComponent } from './Pages/application-event/application-event.component';
import { ApplicationLinkComponent } from './Pages/application-link/application-link.component';
import { ApplicationLinktreeComponent } from './Pages/application-linktree/application-linktree.component';
import { ApplicationLostnfoundComponent } from './Pages/application-lostnfound/application-lostnfound.component';
import { ApplicationSequencerComponent } from './Pages/application-sequencer/application-sequencer.component';
import { ApplicationSocialmediaComponent } from './Pages/application-socialmedia/application-socialmedia.component';
import { ApplicationTextnoteComponent } from './Pages/application-textnote/application-textnote.component';
import { ApplicationWhatsappComponent } from './Pages/application-whatsapp/application-whatsapp.component';
import { ApplicationWifiComponent } from './Pages/application-wifi/application-wifi.component';
import { PrivacyPolicyComponent } from './Pages/privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './Pages/terms-condition/terms-condition.component';
// import { QRCodeModule } from 'angularx-qrcode';
// import { NgApexchartsModule } from "ng-apexcharts";
import { TutorialComponent } from './Pages/tutorial/tutorial.component';
import { ProfilePageComponent } from './Pages/profile-page/profile-page.component';
import { ProfileContactFormComponent } from './Pages/profile-contact-form/profile-contact-form.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppLostFoundComponent } from './Pages/app-lost-found/app-lost-found.component';
import { NfcTagComponent } from './Pages/nfc-tag/nfc-tag.component';
import { SlugProfileComponent } from './Pages/slug-profile/slug-profile.component';
import { AppEmergencyComponent } from './Pages/app-emergency/app-emergency.component';
import { QrAppServiceComponent } from './Pages/qr-app-service/qr-app-service.component';
import { EmenuCardComponent } from './Pages/emenu-card/emenu-card.component';
import { AppLinkTreeComponent } from './Pages/app-link-tree/app-link-tree.component';
import { ContactAppPageComponent } from './Pages/contact-app-page/contact-app-page.component';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MedicalComponent } from './Pages/application-emergency/medical/medical.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ApplicationlinkingComponent } from './Pages/smart-objects/applicationlinking/applicationlinking.component';
import { ApplicationListComponent } from './Pages/smart-objects/application-list/application-list.component';
import { EditMedicalComponent } from './Pages/application-emergency/edit-medical/edit-medical.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
import { ChartsModule } from 'ng2-charts';
import { MatMomentDateModule } from "@angular/material-moment-adapter";

// ***************** Angular Firebase Module ***********************************
import { AngularFireModule } from '@angular/fire';
import {AngularFireMessagingModule} from '@angular/fire/messaging'
import { environment } from 'src/environments/environment';
import { MessagingService } from './services/message/messaging.service';
import { ContactUsComponent } from './Pages/contact-us/contact-us.component';
import { ApplicationNameComponent } from './Pages/application-name/application-name.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { Template1Component } from './template/template1/template1.component';
import { Template2Component } from './template/template2/template2.component';
import { Template3Component } from './template/template3/template3.component';
import { Template4Component } from './template/template4/template4.component';
import { Linktree1Component } from './Linktree/linktree1/linktree1.component';
import { Linktree2Component } from './Linktree/linktree2/linktree2.component';
import { Linktree3Component } from './Linktree/linktree3/linktree3.component';
import { Linktree4Component } from './Linktree/linktree4/linktree4.component';
import { ProfileRedirectComponent } from './Pages/profile-redirect/profile-redirect.component';
import { SmartObjectnameComponent } from './Pages/smart-objects/smart-objectname/smart-objectname.component';
// import { AgmCoreModule } from '@agm/core';
//import { AgmCoreModule } from '@agm/core';

//import { ErrorInterceptor } from './services/interceptor/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SmartObjectsComponent,
    ApplicationsComponent,
    ContactsComponent,
    SettingComponent,
    SidebarComponent,
    ForgotpasswordComponent,
    SignupComponent,
    ResetPaawordComponent,
    ApplicationCalenderComponent,
    ApplicationCallsmsComponent,
    ApplicationContactcardComponent,
    ApplicationCvComponent,
    ApplicationDirectionComponent,
    ApplicationEmailComponent,
    ApplicationEMenuComponent,
    ApplicationEmergencyComponent,
    ApplicationEventComponent,
    ApplicationLinkComponent,
    ApplicationLinktreeComponent,
    ApplicationLostnfoundComponent,
    ApplicationSequencerComponent,
    ApplicationSocialmediaComponent,
    ApplicationTextnoteComponent,
    ApplicationWhatsappComponent,
    ApplicationWifiComponent,
    PrivacyPolicyComponent,
    TermsConditionComponent,
    TutorialComponent,
    ProfilePageComponent,
    ProfileContactFormComponent,

    AppLostFoundComponent,
    NfcTagComponent,
    SlugProfileComponent,
    AppEmergencyComponent,
    QrAppServiceComponent,
    EmenuCardComponent,
    AppLinkTreeComponent,
    ContactAppPageComponent,
    MedicalComponent,
    ApplicationlinkingComponent,
    ApplicationListComponent,
    EditMedicalComponent,
    ContactUsComponent,
    ApplicationNameComponent,
    Template1Component,
    Template2Component,
    Template3Component,
    Template4Component,
    Linktree1Component,
    Linktree2Component,
    Linktree3Component,
    Linktree4Component,
    ProfileRedirectComponent,
    SmartObjectnameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
 //   NgApexchartsModule,
    // NgApexchartsModule,
    NgxSpinnerModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    Ng2SearchPipeModule,
    FileManagerModule,
    ChartsModule,
     NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatNativeDateModule,
    NgxMatNativeDateModule,
    //MatMomentDateModule,,
  
    // QRCodeModule,
    AngularFireMessagingModule,
    ClipboardModule,
    // AgmCoreModule.forRoot({
    //   // please get your own API key here:
    //   // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
    //   apiKey: 'AIzaSyAqgQiVAJGhKtAnUfLfmN6KTnZF-_aUPRY'
    // }),
    AngularFireModule.initializeApp(environment.firebase),


  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: GetInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: SetInterceptorService, multi: true},
  //  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
     MatDatepickerModule,MessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
