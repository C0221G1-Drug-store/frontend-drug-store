import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DrugGroup} from "../../../../model/drug-group";
import {DrugGroupService} from "../../../../service/drug-group.service";
import {DrugGroupDeleteComponent} from "../drug-group-delete/drug-group-delete.component";





@Component({
  selector: 'app-drug-group-list',
  templateUrl: './drug-group-list.component.html',
  styleUrls: ['./drug-group-list.component.css']
})
export class DrugGroupListComponent implements OnInit {

  drugGroups: DrugGroup[];
  drugGroupIdColor: number;
  drugGroup: DrugGroup;
  drugGroupObj: DrugGroup;
  code = "";
  name = "";
  id: number;
  num=0;


  constructor(private drugGroupService: DrugGroupService,
              private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getAll();

  }

  getAll() {
    this.drugGroupService.getAll().subscribe(drugGroup => {
      this.drugGroups = drugGroup;
    });
    console.log(this.drugGroups)
  }

  color(drugGroupId: number) {
    this.drugGroupIdColor = drugGroupId
  }


  getObj(drugGroup: DrugGroup) {
    this.name = drugGroup.drugGroupName;
    this.code = drugGroup.drugGroupCode;
    this.drugGroup = drugGroup;
  }

  update() {
    this.drugGroup.drugGroupCode =this.code;
    this.drugGroup.drugGroupName =this.name;
    this.drugGroupService.update(this.drugGroup.drugGroupId, this.drugGroup).subscribe(() => {
      console.log(this.id)
      alert("cập nhật thành công")
    }, e => {
      console.log(e);
    });
  }

  create() {
    console.log(this.code)
    console.log(this.name)
    this.drugGroup.drugGroupId=null;
    this.drugGroup.drugGroupCode =this.code;
    this.drugGroup.drugGroupName =this.name;
    console.log(this.drugGroup)
    this.drugGroupService.save(this.drugGroupObj).subscribe(() => {
      alert('Tạo thành công');
    });
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
