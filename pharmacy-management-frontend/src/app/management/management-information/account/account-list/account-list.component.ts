import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../../service/account/account.service";
import {newArray} from "@angular/compiler/src/util";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AccountEditComponent} from "../account-edit/account-edit.component";

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  page = 0;
  size = 5;
  keyWord = '';
  property = 0;
  pagination = {
    totalPages: 0
  };
  idAccount: number;
  constructor(
    private accountService: AccountService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.findAllAccount(this.page, this.size, this.keyWord, this.property);
  }

  findAllAccount(page: number, size: number, keyword: string, property: number) {
      this.page = page;
      this.accountService.getAllAccount(page, this.size, this.keyWord, this.property).subscribe(next => {
      this.accounts = next.content;
      this.pagination.totalPages = next.totalPages;
      console.log(this.accounts);
    });
  }

  onchangeProperty(e) {
    console.log(e);
    if (e == 0) {
      this.keyWord = '';
    }
  }

  get pages() {
    return new Array(this.pagination.totalPages);
  }

  changePage(i: number) {
    this.page = i;
    this.findAllAccount(this.page, this.size, this.keyWord, this.property);
  }

  backPage() {
    if (this.page == 0) { return; }
    this.page--;
    if (this.page >= 0) {
      this.findAllAccount(this.page, this.size, this.keyWord, this.property);
    }
  }

  nextPage() {
    if (this.page == this.pagination.totalPages - 1) { return; }
    this.page++;
    if (this.page <= this.pagination.totalPages) {
      this.findAllAccount(this.page, this.size, this.keyWord, this.property);
    }
  }

  searchAccount() {
    this.page = 0;
    this.findAllAccount(this.page, this.size, this.keyWord, this.property);
  }

  getIdAccount(id: number) {
    this.idAccount = id;
  }

  onUpdateHendler(idAccount: number) {
    let dialogRef = this.dialog.open(AccountEditComponent, {
      width: '700px',
      data: idAccount
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result){
        this.findAllAccount(this.page, this.size, this.keyWord, this.property);
      }
    });
  }
}
