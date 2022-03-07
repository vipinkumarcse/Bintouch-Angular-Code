import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { SmartObjectsComponent } from './Pages/smart-objects/smart-objects.component';
import { ApplicationsComponent } from './Pages/applications/applications.component';
import { ContactsComponent } from './Pages/contacts/contacts.component';
import { SettingComponent } from './Pages/setting/setting.component';
import { AuthenticationGuard } from './guard/authentication.guard';
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
import { TutorialComponent } from './Pages/tutorial/tutorial.component';
import { ProfilePageComponent } from './Pages/profile-page/profile-page.component';
import { ProfileContactFormComponent } from './Pages/profile-contact-form/profile-contact-form.component';
import { AppLostFoundComponent } from './Pages/app-lost-found/app-lost-found.component';
import { NfcTagComponent } from './Pages/nfc-tag/nfc-tag.component';
import { SlugProfileComponent } from './Pages/slug-profile/slug-profile.component';
import { QrAppServiceComponent } from './Pages/qr-app-service/qr-app-service.component';
import { ContactUsComponent } from './Pages/contact-us/contact-us.component';
import { Template1Component } from './template/template1/template1.component';
import { Template2Component } from './template/template2/template2.component';
import { Template3Component } from './template/template3/template3.component';
import { Template4Component } from './template/template4/template4.component';
import { ProfileRedirectComponent } from './Pages/profile-redirect/profile-redirect.component';
import { Linktree1Component } from './Linktree/linktree1/linktree1.component';
import { Linktree2Component } from './Linktree/linktree2/linktree2.component';
import { Linktree3Component } from './Linktree/linktree3/linktree3.component';
import { Linktree4Component } from './Linktree/linktree4/linktree4.component';

const routes: Routes = [
  {
    path: '',
    //pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
    // canActivate:[AuthenticationGuard]
  },
  {
    path: 'sign_up',
    component: SignupComponent,
    // canActivate:[AuthenticationGuard]
  },
  {
    path: 'reset_password/:token/:id',
    component: ResetPaawordComponent,
    // canActivate:[AuthenticationGuard]
  },
  {
    path: 'smart',
    component: SmartObjectsComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'application',
    component: ApplicationsComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'setting',
    component: SettingComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'contact',
    component: ContactsComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'calendar',
    component: ApplicationCalenderComponent,
    canActivate: [AuthenticationGuard]
  }, {
    path: 'callsms',
    component: ApplicationCallsmsComponent,
    canActivate: [AuthenticationGuard]
  }, {
    path: 'contactcard',
    component: ApplicationContactcardComponent,
    canActivate: [AuthenticationGuard]
  }, {
    path: 'cv',
    component: ApplicationCvComponent,
    canActivate: [AuthenticationGuard]
  }, {
    path: 'email',
    component: ApplicationEmailComponent,
    canActivate: [AuthenticationGuard]
  }, {
    path: 'direction',
    component: ApplicationDirectionComponent,
    canActivate: [AuthenticationGuard]
  }, {
    path: 'emergency',
    component: ApplicationEmergencyComponent,
    canActivate: [AuthenticationGuard]
  }, {
    path: 'eMenu',
    component: ApplicationEMenuComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'event',
    component: ApplicationEventComponent,
    canActivate: [AuthenticationGuard]
  }, {
    path: 'link',
    component: ApplicationLinkComponent,
    canActivate: [AuthenticationGuard]
  }, {
    path: 'linktree',
    component: ApplicationLinktreeComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'lostnfound',
    component: ApplicationLostnfoundComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'sequencer',
    component: ApplicationSequencerComponent,
    canActivate: [AuthenticationGuard]
  }, {
    path: 'socialmedia',
    component: ApplicationSocialmediaComponent,
    canActivate: [AuthenticationGuard]
  }, {
    path: 'contactus',
    component: ContactUsComponent,
  },
  {
    path: 'textnote',
    component: ApplicationTextnoteComponent,
    canActivate: [AuthenticationGuard]
  }, {
    path: 'whatsapp',
    component: ApplicationWhatsappComponent,
    canActivate: [AuthenticationGuard]
  }, {
    path: 'wifi',
    component: ApplicationWifiComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'terms',
    component: TermsConditionComponent,
    // canActivate:[AuthenticationGuard]
  },
  {
    path: 'privacy',
    component: PrivacyPolicyComponent,
    // canActivate:[AuthenticationGuard]
  },
  {
    path: 'tutorial',
    component: TutorialComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'profile/:name',
    component: ProfilePageComponent,
  },
  {
    path: 'nfc/:id',
    component: NfcTagComponent,
  },
  {
    path: 'slug-profile/:slug',
    component: SlugProfileComponent,
  },

  {
    path: 'app/:slug/:id',
    component: QrAppServiceComponent,
  },
  {
    path: 'profile-contact-form/:name/:id/:where',
    component: ProfileContactFormComponent,
  },
  // {
  //   path: 'profile-contact-form/:name/:id',
  //   component: ProfileContactFormComponent,
  // },
  // {
  //   path: 'profile-contact-form/:name/:id',
  //   component: ProfileContactFormComponent,
  // },
  {
    path: 'template1',
    component: Template1Component,
  },
  {
    path: 'template2',
    component: Template2Component,
  },
  {
    path: 'template3',
    component: Template3Component,
  },
  {
    path: 'template4',
    component: Template4Component,
  },
  {
    path: 'Profile/:name',
    component: ProfileRedirectComponent,
  },
  {
    path: 'linktree1',
    component: Linktree1Component,
  },
  {
    path: 'linktree2',
    component: Linktree2Component,
  },
  {
    path: 'linktree3',
    component: Linktree3Component,
  },
  {
    path: 'linktree4',
    component: Linktree4Component,
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
