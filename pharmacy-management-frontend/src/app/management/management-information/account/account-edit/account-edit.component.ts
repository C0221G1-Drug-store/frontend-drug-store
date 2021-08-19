import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AccountService} from "../../../../service/account/account.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../../../model/account/role";
import {RoleService} from "../../../../service/account/role.service";
import {UserRole} from "../../../../model/account/user-role";
import {UserRoleService} from "../../../../service/account/user-role.service";
import {Account} from "../../../../model/account/account";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {
  accountForm: FormGroup = new FormGroup({
    userCode: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    accountName: new FormControl('', [Validators.required]),
    encrytedPassword: new FormControl(''),
    enabled: new FormControl(''),
    role: new FormControl(''),
  });
  roles: Role[];
  account: any;
  id: number;
  constructor(
    public dialogRef: MatDialogRef<AccountEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private roleService: RoleService,
    private userRoleService: UserRoleService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getAccount(this.data);
    this.getRole();
  }
  getAccount(id: number) {
    return this.accountService.findById(id).subscribe(account => {
      this.account = account;
      console.log(this.account);
      this.accountForm.patchValue(this.account);
      this.accountForm.get('role').setValue(this.account.userRoles[0].role);
      console.log(this.accountForm.value);
    });
  }

  getRole() {
    return this.roleService.getAllRole().subscribe(roles => {
      this.roles = roles;
      console.log(this.roles);
    });
  }

  submit() {
    const accountNew =  this.accountForm.value;
    console.log(accountNew);
    this.accountService.updateAccount(this.data,accountNew).subscribe(next => {
      const userRole = {
        role: accountNew.role,
        user: next
      };
      this.userRoleService.updateAccount(next.userId,userRole).subscribe()
          });
  }
  compareFn(c1: Role, c2: Role): boolean {
    return c1 && c2 ? c1.roleId === c2.roleId : c1 === c2;
  }



  confirmUpdateHandler() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
          });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
           if (result){
            this.submit();
             this.dialogRef.close(true);
      }
    });
  }

  confirmResetHandler() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
          this.accountForm.get('encrytedPassword').setValue('123456');
          const accountNew =  this.accountForm.value;
          this.accountService.updateAccount(this.id,accountNew).subscribe(next => {
          });
          this.router.navigateByUrl("management/management-information/account/list")
      }
    });
  }
}
