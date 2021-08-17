import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DrugGroup} from "../../../../model/drug-group";
import {DrugGroupService} from "../../../../service/drug-group.service";
import {DrugGroupDeleteComponent} from "../drug-group-delete/drug-group-delete.component";
import {Router} from "@angular/router";





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
              private router:Router) {


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
    }
    if (this.name == "") {
      this.smgName = "Tên nhóm thuốc không được để trống."
    } else {
      this.drugGroup.drugGroupCode = this.code;
      this.drugGroup.drugGroupName = this.name;
      this.drugGroupService.update(this.drugGroup.drugGroupId, this.drugGroup).subscribe(() => {
        console.log(this.id)
        alert("cập nhật thành công")
        this.name = "";
        this.code = "";
      }, e => {
        alert("cập nhật thất bại")
        console.log(e);
      });
    }

  }

  create() {
    const drugGroup = {
      drugGroupId: 1,
      drugGroupCode: "NT00",
      drugGroupName: "thuoc gan"
    }
    drugGroup.drugGroupId = null;
    if (this.code == "") {
      this.smgCode = "Mã nhóm thuốc không được để trống."
    }
    if (this.name == "") {
      this.smgName = "Tên nhóm thuốc không được để trống."
    } else {
      drugGroup.drugGroupName = this.name;
      drugGroup.drugGroupCode = this.code;
      this.drugGroupService.save(drugGroup).subscribe(() => {
        alert('Tạo thành công');
        this.router.navigate(['/management/management-information'])
      }, e => {
        alert("tạo thất bại")
        console.log(e);
      });
    }
  }

  onDeleteHandler(): void {
    const dialogRef = this.dialog.open(DrugGroupDeleteComponent, {
      width: '250px',
      data: this.drugGroup
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.drugGroupService.delete(this.drugGroup.drugGroupId).subscribe(next => {
          this.getAll();
        });
      }
    });
  }
  

}
