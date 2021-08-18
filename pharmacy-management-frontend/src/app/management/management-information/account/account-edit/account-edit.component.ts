import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AccountService} from "../../../../service/account/account.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../../../model/account/role";
import {RoleService} from "../../../../service/account/role.service";
import {UserRole} from "../../../../model/account/user-role";
import {UserRoleService} from "../../../../service/account/user-role.service";
import {Account} from "../../../../model/account/account";

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
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private roleService: RoleService,
    private userRoleService: UserRoleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      console.log(this.id);
      this.getAccount(this.id);
    });
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
    this.accountService.updateAccount(this.id,accountNew).subscribe(next => {
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
}
