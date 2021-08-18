import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DrugGroup} from "../../../../model/drug-group";
import {DrugGroupService} from "../../../../service/drug-group.service";
import {DrugGroupDeleteComponent} from "../drug-group-delete/drug-group-delete.component";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";





@Component({
  selector: 'app-drug-group-list',
  templateUrl: './drug-group-list.component.html',
  styleUrls: ['./drug-group-list.component.css']
})
export class DrugGroupListComponent implements OnInit {

  drugGroups: DrugGroup[];
  drugGroupIdColor: number;
  drugGroup: DrugGroup;
  code = "";
  name = "";
  id: number;
  smgCode = "";
  smgName = "";
  pages: Array<any>;
  page = 0;


  constructor(private drugGroupService: DrugGroupService,
              private dialog: MatDialog,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAll();

  }

  getAll() {
    this.drugGroupService.getAllPage(this.page).subscribe(next => {
      this.drugGroups = next['content'];
      this.pages = new Array<any>(next['totalPages']);
    });

  }

  previous() {
    if (this.page === 0) {
      alert('Khong tim thay trang');
    } else {
      this.page = this.page - 1;
      this.getAll();
    }
  }

  next() {
    if (this.page > this.pages.length - 2) {
      alert('ko tim thay trang');
    } else {
      this.page = this.page + 1;
      this.getAll();
    }
  }
  setPage(i: number) {
    this.page = i;
    this.getAll();
  }
  color(drugGroupId: number) {
    this.drugGroupIdColor = drugGroupId
  }


  getObj(drugGroup: DrugGroup) {
    this.name = drugGroup.drugGroupName;
    this.code = drugGroup.drugGroupCode;
    this.drugGroup = drugGroup
  }

  update() {
    if (this.code == "") {
      this.smgCode = "Mã nhóm thuốc không được để trống."
    }else {
      this.smgCode ="";
    }
    if (this.name == "") {
      this.smgName = "Tên nhóm thuốc không được để trống."
    } else {
      this.smgName ="";
    }
    this.drugGroup.drugGroupCode = this.code;
    this.drugGroup.drugGroupName = this.name;
    this.drugGroupService.update(this.drugGroup.drugGroupId, this.drugGroup).subscribe(() => {
      console.log(this.id)
      this.showEdit()
      this.name = "";
      this.code = "";
    }, e => {
      this.showEditErr()
      console.log(e);
    });

  }

  create() {
    const drugGroup = {
      drugGroupId: null,
      drugGroupCode: "",
      drugGroupName: ""
    }
    if (this.code == "") {
      this.smgCode = "Mã nhóm thuốc không được để trống."
    }else {
      this.smgCode ="";
    }
    if (this.name == "") {
      this.smgName = "Tên nhóm thuốc không được để trống."
    } else {
      this.smgName =" ";
    }
    drugGroup.drugGroupName = this.name;
    drugGroup.drugGroupCode = this.code;
    this.drugGroupService.save(drugGroup).subscribe(() => {
      this.showCreate()
    }, e => {
      this.showCreateErr()
      console.log(e);
    });
  }
  showCreate() {
    this.toastr.success('tạo mới thành công', 'Toastr fun!');
  }
  showCreateErr() {
    this.toastr.success('tạo mới thất bại', 'Toastr fun!');
  }
  showEdit() {
    this.toastr.success('cập nhật thành công', 'Toastr fun!');
  }
  showEditErr() {
    this.toastr.error('cập nhật thất bại', 'Toastr fun!');
  }
  showDelete(){
    this.toastr.success('xóa thành công', 'Toastr fun!');
  }
  onDeleteHandler(): void {
    const dialogRef = this.dialog.open(DrugGroupDeleteComponent, {
      width: '250px',
      data: this.drugGroup
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.drugGroupService.delete(this.drugGroup.drugGroupId).subscribe(next => {
          this.showDelete()
          this.getAll();
        });
      }
    });
  }


}
