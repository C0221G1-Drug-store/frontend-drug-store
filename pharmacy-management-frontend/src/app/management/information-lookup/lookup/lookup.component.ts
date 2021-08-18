import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LookupService} from '../../../service/lookup.service';
import {CustomerLookup} from '../../../model/lookup/customer-lookup';
import {CustomerGroupLookup} from '../../../model/lookup/customer-group-lookup';
import {ManufacturerLookup} from '../../../model/lookup/manufacturer-lookup';
@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent implements OnInit {
  lookups = [
    {eng: 'drug', vn: 'Thuốc'},
    {eng: 'prescription', vn: 'Toa thuốc'},
    {eng: 'employee', vn: 'Nhân viên'},
    {eng: 'bill', vn: 'Hóa đơn'},
    {eng: 'manufacturer', vn: 'Nhà cung cấp'},
    {eng: 'customer', vn: 'Khách hàng'}
  ];
  attributes = {
    manufacturer: [
      {eng: 'manufacturerCode', vn: 'Mã nhà cung cấp'},
      {eng: 'manufacturerName', vn: 'Tên nhà cung cấp'},
      {eng: 'manufacturerAddress', vn: 'Địa chỉ'},
      {eng: 'manufacturerPhone', vn: 'Điện thoại'}
    ],
    customer: [
      {eng: 'code', vn: 'Mã khách hàng'},
      {eng: 'name', vn: 'Tên khách hàng'},
      {eng: 'address', vn: 'Địa chỉ'},
      {eng: 'phone', vn: 'Điện thoại'},
      {eng: 'groupId', vn: 'Nhóm khách hàng'}]
  };

  selectItem = '';
  selectAttribute = '';
  mySearch = this.fb.group({
    inputLookup: ['']
  });
  myChoose = this.fb.group({
    selectItem: [''],
    selectAttribute: []
  });
  thead = [];

  customers!: CustomerLookup[];
  customerTh = ['Mã KH', 'Tên khách hàng', 'Tuổi', 'Địa chỉ', 'Số điện thoại', 'Nhóm KH', 'Ghi chú'];
  customerGroups!: CustomerGroupLookup[];

  manufacturers!: ManufacturerLookup[];
  manufacturerTh = ['Mã NXS', 'Tên nhà sản xuất', 'Địa chỉ', 'Số điện thoại', 'Ghi chú'];


  inputLook = '';
  selectAttr = '';
  pages: Array<any>;
  page = 0;

  constructor(private fb: FormBuilder,
              private lookupService: LookupService) {
  }

  ngOnInit(): void {
  }

  getCustomerGroups() {
    this.lookupService.getCustomerGroups().subscribe(list => {
      this.customerGroups = list;
    });
  }


  search() {
    this.pages = null;
    this.selectAttr = this.myChoose.value.selectAttribute;
    if (!this.selectAttr) {
      this.selectAttr = 'all';
    }
    this.inputLook = this.mySearch.value.inputLookup + ',a';

    switch (this.selectItem) {
      case 'customer':
        this.manufacturers = null;
        this.customers = null;
        this.getCustomerGroups();
        this.lookupService.getCustomersByKeyWord(this.selectAttr, this.inputLook, String(this.page)).subscribe(data => {
          if (data == null){
            alert("Không tìm thấy dữ liệu " + this.mySearch.value.inputLookup)
          }
          this.customers = data.content;
          this.pages = new Array<any>(data.totalPages);
        }, error => {
          alert('Không tìm thấy dữ liệu ' + this.mySearch.value.inputLookup);
        });
        this.thead = this.customerTh;
        break;
      case 'manufacturer':
        this.customers = null;
        this.lookupService.getManufacturerByKeyWord(this.selectAttr, this.inputLook, String(this.page)).subscribe(data => {
          if (data == null){
            alert("Không tìm thấy dữ liệu " + this.mySearch.value.inputLookup)
          }
          this.manufacturers = data.content;
          this.pages = new Array<any>(data.totalPages);
        }, error => {
          alert('Không tìm thấy dữ liệu ' + this.mySearch.value.inputLookup);
        });
        this.thead = this.manufacturerTh;
        break;
      default:
        console.log('Please NOT hacker');
    }
  }

  selectLookup() {
    this.selectItem = this.myChoose.value.selectItem;
  }

  setPage(i: number) {
    this.page = i;
    this.search();

  }

  previous() {
    if (this.page === 0) {
      alert('Không tìm thấy trang');
    } else {
      this.page = this.page - 1;
      this.search();
    }
  }

  next() {
    if (this.page > this.pages.length - 2) {
      alert('Không tìm thấy trang');
    } else {
      this.page = this.page + 1;
      this.search();
    }
  }
}
