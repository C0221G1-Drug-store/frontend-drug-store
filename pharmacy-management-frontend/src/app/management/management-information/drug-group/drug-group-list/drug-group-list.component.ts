import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DrugGroupDto} from "../../../../model/drug-group";
import {DrugGroupService} from "../../../../service/drug-group.service";
import {DrugGroupDeleteComponent} from "../drug-group-delete/drug-group-delete.component";
import {ToastrService} from "ngx-toastr";
import { FormControl, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-drug-group-list',
  templateUrl: './drug-group-list.component.html',
  styleUrls: ['./drug-group-list.component.css']
})
export class DrugGroupListComponent implements OnInit {
  drugGroups: DrugGroupDto[];
  drugGroupList: DrugGroupDto[];
  drugGroupIdColor: number;
  drugGroup: DrugGroupDto;
  pages: Array<any> = [];
  page = 0;
  code = 'NT001';
  codeId: number;
  err = true;
  name = '';
  drugGroupForm: FormGroup = new FormGroup({
    drugGroupCode: new FormControl(''),
    drugGroupName: new FormControl('', [Validators.required, Validators.maxLength(30)])
  })


  constructor(private drugGroupService: DrugGroupService,
              private dialog: MatDialog,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getAll();
    this.getDrugGroup();


  }

  getAll() {
    this.drugGroupService.getAllPage(this.page).subscribe(next => {
      this.drugGroups = next['content'];
      this.pages = new Array<any>(next['totalPages']);
    });
  }

  getDrugGroup() {
    this.drugGroupService.getAll().subscribe(next => {
      this.drugGroupList = next;
      this.codeId = next.length;
      if (this.codeId <= 9) {
        this.code = 'NT00' + (this.codeId + 1);
      } else if (this.codeId < 100) {
        this.code = 'NT0' + (this.codeId + 1);
      } else {
        this.code = 'NT' + (this.codeId + 1);
      }
    });
  }

  previous() {
    if (this.page === 0) {
      this.showPage()
    } else {
      this.page = this.page - 1;
      this.getAll();
    }
  }

  next() {
    if (this.page > this.pages.length - 2) {
      this.showPage()
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
    this.err = !this.err;
    if (this.err === false) {
      this.drugGroupIdColor = drugGroupId;

    } else {
      this.drugGroupIdColor = null;
      this.drugGroupForm.reset();
      this.getDrugGroup();


    }

  }



  getObj(drugGroup: DrugGroupDto) {

    this.drugGroupForm = new FormGroup({
      drugGroupCode: new FormControl(drugGroup.drugGroupCode),
      drugGroupName: new FormControl(drugGroup.drugGroupName, [Validators.required, Validators.maxLength(30)])
    })
    this.drugGroup = drugGroup


  }

  update() {
  if(this.drugGroupIdColor==null){
    this.showEditErrs();
  }
    const drugGroup = this.drugGroupForm.value;
    this.drugGroupService.update(this.drugGroup.drugGroupId, drugGroup).subscribe(() => {
      this.getAll();
      this.showEdit();
      this.drugGroupForm.reset();
      this.getDrugGroup()
    }, e => {
      this.showEditErr();
    });

  }

  create() {
    const drugGroup = this.drugGroupForm.value;
    drugGroup.drugGroupCode = this.code;

    this.drugGroupService.save(drugGroup).subscribe(() => {
      this.getAll();
      this.showCreate();
      this.drugGroupForm.reset();
      this.getDrugGroup();

    }, e => {
      this.showCreateErr()

    });
  }


  onDeleteHandler(): void {
    if (this.drugGroupIdColor == null) {
      this.showDeleteErr();
    }else {
      const dialogRef = this.dialog.open(DrugGroupDeleteComponent, {
        width: '400px',
        data: this.drugGroup
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.drugGroupService.delete(this.drugGroup.drugGroupId).subscribe(next => {
            this.showDelete()
            this.drugGroupForm.reset();
            this.getDrugGroup();
            this.drugGroupIdColor = null;
            this.getAll();
          });
        }
      });
    }



  }



  get drugGroupName() {
    return this.drugGroupForm.get('drugGroupName');
  }
  showEditErrs() {
    this.toastr.error('Ch???n tr?????ng mu???n s???a', 'C???nh b??o!');
  }
  showPage() {
    this.toastr.error('kh??ng t??m th???y trang', 'C???nh b??o!');
  }

  showCreate() {
    this.toastr.success('T???o m???i th??nh c??ng', 'Th??ng b??o!');
  }

  showCreateErr() {
    this.toastr.error('T???o m???i th???t b???i', 'C???nh B??o!');
  }

  showEdit() {
    this.toastr.success('C???p nh???t th??nh c??ng', 'Th??ng b??o!');
  }

  showEditErr() {
    this.toastr.error('C???p nh???t th???t b???i', 'C???nh b??o!');
  }

  showDelete() {
    this.toastr.success('X??a th??nh c??ng', 'Th??ng b??o!');
  }

  showDeleteErr() {
    this.toastr.error('Kh??ng th??nh c??ng', 'C???nh b??o!');
  }


}
