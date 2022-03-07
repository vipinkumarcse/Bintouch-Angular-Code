import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.baseURL
  imageUrl = environment.imageUrl

  constructor(private http: HttpClient, public router: Router) { }
  public isAuthenticated(): boolean {
    return localStorage.getItem("Bottom_up_user") ? true : false;
  }

  serviceSocialIcon = environment.service_icons;
  contactImages = environment.contact_images;
  lostFound = environment.lost_found;
  qrurl = environment.qr_images;
  tutorial = environment.tutorials;

  login(body: any) {
    return this.http.post(this.baseUrl + `authenticate_user`, body)
  }
  logout(body: any) {
    return this.http.post(this.baseUrl + `sign_out`, body)
  }
  getTotalScans(body: any) {
    return this.http.post(this.baseUrl + `total_tag_scan`, body)
  }
  getTotalContact(body: any) {
    return this.http.post(this.baseUrl + `total_user_shared_contacts`, body)
  }
  getTotalMoney(body: any) {
    return this.http.post(this.baseUrl + `get_wallet_amount`, body)
  }
  getsmartobject(body: any) {
    return this.http.post(this.baseUrl + `total_user_tag_scan`, body)
  }
  getContactList(body: any) {
    return this.http.post(this.baseUrl + `get_user_shared_contacts/`, body)
  }

  getApplicationList(body: any) {
    return this.http.post(this.baseUrl + `get_user_services/`, body)
  }
  getContactById(body: any) {
    return this.http.post(this.baseUrl + `get_user/`, body)
  }
  forgotPassword(body: any) {
    return this.http.post(this.baseUrl + `forgot_password`, body)
  }
  signupUser(body: any) {
    return this.http.post(this.baseUrl + `register`, body)
  }
  resetPassword(body: any) {
    return this.http.post(this.baseUrl + `reset_password_authenticate`, body)
  }
  getPagesData(body: any) {
    return this.http.post(this.baseUrl + `get_page`, body)
  }
  getClickList(body: any) {
    return this.http.post(this.baseUrl + `get_user_service_clicks_count/`, body)
  }
  getuserSmartobject(body: any) {
    return this.http.post(this.baseUrl + `get_user_nfctag`, body)
  }
  updatesmartObject(body: any) {
    return this.http.post(this.baseUrl + `save_user_nfctag`, body)
  }
  dowmloadContact(body: any) {
    return this.http.get(this.baseUrl + `export_contact/?user_id=Mg==${body}`,)
  }
  deleteContact(body: any) {
    return this.http.post(this.baseUrl + `delete_user_shared_contacts`, body)
  }
  uploadFile(body: any) {
    return this.http.post(this.baseUrl + `upload_file/profile_picture/`, body)
  }

  //-------------------------------------new work started --------------------------------------------------------------------//


  getProfileData(data: any) {
    return this.http.post(this.baseUrl + `get_services_by_username`, data);
  }

  saveSharedContact(data: any) {
    return this.http.post(this.baseUrl + `save_shared_contacts`, data);
  }

  saveUserContact(data: any) {
    return this.http.post(this.baseUrl + `save_user_contact`, data);
  }

  saveUserServicesClicks(data: any) {
    return this.http.post(this.baseUrl + `save_user_service_clicks`, data);
  }

  getServiceIcons(data: any) {
    return this.http.post(this.baseUrl + 'get_service_icons', data);
  }

  saveLostFound(data: any) {
    return this.http.post(this.baseUrl + 'save_lost_found', data);
  }

  saveLinkTree(data: any) {
    return this.http.post(this.baseUrl + 'save_linktree', data);
  }

  saveLinkTreeLinks(data: any) {
    return this.http.post(this.baseUrl + 'save_linktree_links', data);
  }

  saveEmergencyData(data: any) {
    return this.http.post(this.baseUrl + 'save_emergency', data);
  }

  getUserServices(data: any) {
    return this.http.post(this.baseUrl + 'get_user_services', data);
  }

  getNfcInfo(data: any) {
    return this.http.post(this.baseUrl + 'get_service_by_tag_id', data);
  }

  getQrservices(data: any) {
    return this.http.post(this.baseUrl + 'get_user_service_by_id', data);
  }


  // Bhumika Work

  SaveContactCategories(data: any) {
    return this.http.post(this.baseUrl + 'save_contact_categories', data);
  }

  GetContactCategories() {
    return this.http.post(this.baseUrl + 'get_contact_categories', '');
  }

  DeleteContactCategory(data: any) {
    return this.http.post(this.baseUrl + 'delete_contact_category', data);
  }

  SaveApplicationCategory(data: any) {
    return this.http.post(this.baseUrl + 'save_service_categories', data);
  }

  GetApplicationCategories() {
    return this.http.post(this.baseUrl + 'get_service_categories', '');
  }

  DeleteCApplicationCategory(data: any) {
    return this.http.post(this.baseUrl + 'delete_service_category', data);
  }

  DeleteApplicationList(data: any) {
    return this.http.post(this.baseUrl + 'delete_user_service/', data);
  }

  SaveObjectCategory(data: any) {
    return this.http.post(this.baseUrl + 'save_object_categories', data);
  }

  GetObjectCategories() {
    return this.http.post(this.baseUrl + 'get_object_categories', '');
  }

  DeleteObjectCategory(data: any) {
    return this.http.post(this.baseUrl + 'delete_object_category', data);
  }

  // create Application

  AppEvent(data: any) {
    return this.http.post(this.baseUrl + 'save_event/', data);
  }

  AppContact(data: any) {
    return this.http.post(this.baseUrl + 'save_user_contact', data);
  }

  AppCommon(data: any) {
    return this.http.post(this.baseUrl + 'save_user_service', data);
  }

  GetSlug(data: any) {
    return this.http.post(this.baseUrl + 'get_service_icons', data);
  }

  get_services_by_type(data: any) {
    return this.http.post(this.baseUrl + 'get_services_by_type/', data);
  }

  App_send_email(data: any) {
    return this.http.post(this.baseUrl + 'send_email/', data);
  }

  AppMedicalForm(data: any) {
    return this.http.post(this.baseUrl + 'save_medical_card', data);
  }


  GetEmergencyForm(data: any) {
    return this.http.post(this.baseUrl + 'get_emergency', data);
  }

  DeletemedicalCard(data: any) {
    return this.http.post(this.baseUrl + 'delete_medical_card', data);
  }

  UpdateAccount(data: any) {
    return this.http.post(this.baseUrl + 'update_account', data);
  }

  applicationDragDrop(data: any) {
    return this.http.post(this.baseUrl + 'save_service_cat_relation', data);
  }

  objectDragDrop(data: any) {
    return this.http.post(this.baseUrl + 'save_object_cat_relation', data);
  }

  contactDragDrop(data: any) {
    return this.http.post(this.baseUrl + 'save_contact_cat_relation', data);
  }

  getServiceDetail(data: any) {
    return this.http.post(this.baseUrl + 'get_user_service_by_id/', data);
  }

  AppSequencer(data: any) {
    return this.http.post(this.baseUrl + 'save_sequencer/', data);
  }

  getSequencer(data: any) {
    return this.http.post(this.baseUrl + 'get_sequencer/', data);
  }


  get_tutorials(data: any) {
    return this.http.post(this.baseUrl + 'get_tutorials/', data);
  }

  // graph(data:any){
  //   return this.http.post(this.baseUrl+'total_tag_scan', data);
  // }

  // dashsmart(data:any){
  //   return this.http.post(this.baseUrl+'total_user_tag_scan', data);
  // }

  activityHistory(data:any) {
    return this.http.post(this.baseUrl + 'total_user_tag_scan_per_month/', data);
  }

  appGraph(data:any) {
    return this.http.post(this.baseUrl + 'get_application_graph', data);
  }

  saveMenuCatalog(data:any){
    return this.http.post(this.baseUrl + 'save_menu_catalog/', data);

  }

  saveMenuCategory(data:any){
    return this.http.post(this.baseUrl + 'save_menu_category', data);

  }

  saveMenuItem(data:any){
    return this.http.post(this.baseUrl + 'save_menu_items', data);

  }

  saveCategoryRelation(data:any){
    return this.http.post(this.baseUrl + 'save_service_cat_relation', data);

  }

  saveObjectRelation(data:any){
    return this.http.post(this.baseUrl + 'save_object_cat_relation', data);

  }
  saveContactRelation(data:any){
    return this.http.post(this.baseUrl + 'save_contact_cat_relation', data);

  }

  changePassword(body: any) {
    return this.http.post(this.baseUrl + `change_password`, body)
  }

  notificationList(body:any){
    return this.http.post(this.baseUrl + `get_user_notification/`, body)
  }

  notificationCount(body:any){
    return this.http.post(this.baseUrl + `get_user_notification_count/`, body)
  }
  
  DeleteNotification(body:any){
    return this.http.post(this.baseUrl + `delete_user_notification/`, body)
  }

  contactUs(body:any){
    return this.http.post(this.baseUrl + `contact_us/`, body)
  }

  editnameApp(body:any){
    return this.http.post(this.baseUrl + `save_application_title/`, body)
  }

  totalScan(body:any){
    return this.http.post(this.baseUrl + `save_user_tag_scan/`, body)
  }

  sendEmail(body:any){
    return this.http.post(this.baseUrl + `send_email/`, body)
  }
 
  ActivityHistoryPerDay(body:any){
    return this.http.post(this.baseUrl + `total_user_tag_scan_per_day/`, body)
  }

  EditSmartObject(body:any){
    return this.http.post(this.baseUrl + `save_user_nfctag`, body)
  }

  GetLinktree(body:any){
    return this.http.post(this.baseUrl + `get_linktree/`, body)
  }  


  DeleteLinktreeLink(body:any){
    return this.http.post(this.baseUrl + `delete_linktree_links/`, body)
  } 

  DeletecategoryMenu(body:any){
    return this.http.post(this.baseUrl + `delete_menu_category`, body)
  }

  getMenu(body:any){
   return this.http.post(this.baseUrl + `get_menu_catalog/`, body)
  }

  
  
}