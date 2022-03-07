import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-application-e-menu',
  templateUrl: './application-e-menu.component.html',
  styleUrls: ['./application-e-menu.component.scss']
})
export class ApplicationEMenuComponent implements OnInit {
  menuCatalogData: FormGroup
  menuCategoryData: FormGroup
  menuItems: FormGroup
  token: any;
  src: any;
  File: any;
  menu: FormGroup;
  menu_id: any;
  category_id: any;
  cat: FormArray;
  menuDetails: any;
  categoryLenght: any = 0;
  imageUrl = environment.imageUrl
  menuItem: FormGroup;
  itemImage: any;
  showItems = false
  itemsList: any;
  menucategory: FormGroup;
  shoecat: boolean = false;
  itemsData: any;
  id: any;
  slug: any;

  constructor(public activeroute: ActivatedRoute, private spinner: NgxSpinnerService, private apiService: ApiService, private formBuilder: FormBuilder, private common: CommonService) { }

  ngOnInit(): void {
    this.activeroute.params.subscribe((params: any) => {
      this.id = params['id'];
      this.slug = params['slug'];
      if (this.id) {
        this.getDetails()
      }
    })
    this.menu = this.formBuilder.group({
      menu_name: [''],
      text_highlight_color: [''],
      text_color: [''],
      bg_color: [''],
    })
    this.menucategory = this.formBuilder.group({
      category_name: ['']
    })

    this.menuItem = this.formBuilder.group({
      category_id: [''],
      name: [''],
      file_name: [''],
      description: [''],
      price: [''],
      url: [''],
      id: [''],
    })
    this.menu.patchValue({
      bg_color: '#141F3F',
      text_color: '#B9B9B9',
      text_highlight_color: '#141F3F'
    })
  }

  addCategory() {
    this.shoecat = true
    this.showItems = false
  }

  addItems() {
    this.showItems = true
  }

  catalogSubmit() {
    var data = new FormData();
    data.append('menu_name', this.menu.value.menu_name);
    data.append('text_highlight_color', this.menu.value.text_highlight_color);
    data.append('text_color', this.menu.value.text_color);
    data.append('bg_color', this.menu.value.bg_color);
    this.apiService.saveMenuCatalog(data).subscribe((res: any) => {
      if (res.http_status == '200') {
        console.log(res)
        this.common.success(res["msg"]);
        this.menu_id = res.id
        localStorage.setItem('menu_id', res.id)
      }
      else {
        this.common.error(res["msg"]);
      }
    })

  }

  categorySubmit() {
    var data = new FormData();
    if (JSON.parse(localStorage.getItem('menu_id')!) !== null) {
      data.append('menu_id', this.menu_id);
      data.append('category_name', this.menucategory.value.category_name);
      this.apiService.saveMenuCategory(data).subscribe((res: any) => {
        console.log(res)
        if (res.http_status == '200') {
          console.log(res)
          this.shoecat = false
          this.common.success(res["msg"]);
          this.category_id = res.id
          this.menucategory.reset()
          // localStorage.setItem('category_id', res.id)
          this.getMeniDetails()
        }
        else {
          this.common.error(res["msg"]);
        }
      })
    }
    else {
      this.common.error('please enter Menu/Catalog Title');
    }
  }

  async selectItemImage(e: any) {
    const file = e.target.files[0];
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        // this.src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.File = file;
      var fd = new FormData();
      fd.append('file_name', this.File)
      this.apiService.uploadFile(fd).subscribe((res: any) => {
        if (res['success'] == 1) {
          this.src = res.file_name //`${res.base_url}${res.file_name}`
          this.itemImage = `${this.imageUrl}${res.file_name}`
        }
        else {
          this.common.error(res.msg);
        }
      })
    } else {
      this.common.error('Selected file is not image.');
    }
  }

  menuItemSubmit() {
    // console.log(items)
    var data = new FormData();
    data.append('category_id', this.category_id);
    data.append('name', this.menuItem.value.name);
    data.append('file_name', this.src);
    data.append('description', this.menuItem.value.description);
    data.append('price', this.menuItem.value.price);
    data.append('url', this.menuItem.value.url);
    //  data.append('id',);
    this.spinner.show()
    this.apiService.saveMenuItem(data).subscribe((res: any) => {
      console.log(res)
      this.spinner.hide()
      this.menuItem.reset();
      this.src = ''
      this.showItems = false
      this.getMeniDetails()
    })

  }

  getMeniDetails() {
    var data = new FormData();
    data.append('id', this.menu_id);
    this.apiService.getMenu(data).subscribe((res: any) => {
      console.log(res)
      if (res.success == 1) {
        this.menuDetails = res.items
        if (res.items.category) {
          this.categoryLenght = res.items.category.length
          console.log(this.categoryLenght)
          this.category_id = res.items.category[0].id
          console.log( this.category_id)
        }
        this.itemsList = this.menuDetails.category.find((e: any) => { return e.id == this.category_id })
        console.log(this.itemsList)
      }
    })
  }


  delete(item: any) {
    var data = new FormData();
    data.append('id', item.value.id);
    this.apiService.DeletecategoryMenu(data).subscribe((res: any) => {
      if (res.success == 1) {
        this.getMeniDetails()
      }
    })
  }

  getcat(id: any) {
    console.log(id)
    this.itemsList = this.menuDetails.category.find((e: any) => { return e.id == id })
    console.log(this.itemsList)
  }

  getItems(id: any) {
    console.log(id)
    this.itemsData = this.itemsList.item.find((e: any) => { return e.id == id })
    console.log(this.itemsData)
    this.showItems = true
    this.menuItems.patchValue({
      url: this.itemsData.url,
      price: this.itemsData.price,
      name: this.itemsData.price,
      // file_name: new FormControl(''),
      description: this.itemsData.price,
    })
  }


  getDetails() {
    const formData = new FormData();
    formData.append('id', this.id);
    formData.append('slug', this.slug);
    this.apiService.getServiceDetail(formData).subscribe((response: any) => {
      console.log(response)
      if (response.success == 1) {
        // this.imgURLCover = this.auth.lostFound + response.item.cover_photo
        // this.imgURLProfile = this.auth.lostFound + response.item.photo
        this.menu_id = response.item.id;
         this.getMeniDetails()
        this.menu.patchValue({
          bg_color: response.item.bg_color,
          text_color: response.item.text_color,
          text_highlight_color: response.item.text_highlight_color,
          menu_name: response.item.menu_name
        })
      }
    })
  }

}
