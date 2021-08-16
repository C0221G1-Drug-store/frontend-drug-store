import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ExportBillService} from "../../../../service/export-bill.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ExportBillType} from "../../../../model/export-bill/export-bill-type";
import {DrugImportBill} from "../../../../model/import-bill/drug-import-bill";
import {Employee} from "../../../../model/employee/employee";
import {Manufacturer} from "../../../../model/manufacturer/manufacturer";


@Component({
  selector: 'app-export-bill-destroy',
  templateUrl: './export-bill-destroy.component.html',
  styleUrls: ['./export-bill-destroy.component.css']
})
export class ExportBillDestroyComponent implements OnInit {
  exportBillForm: FormGroup;
  exportBillTypes: ExportBillType[];
  drugs: DrugImportBill[] = [];
  drugDestroys: DrugImportBill[] = [];
  idDrug?: number;
  nameDrug?: string;
  totalMoney: number = 0;
  p = 1;
  a = [1, 2, 3, 4, 5];

  constructor(private exportBillService: ExportBillService,
              private route: Router) {
    this.createForm();

  }

  ngOnInit(): void {
    this.getListDrug();
    this.getExportBillType();
    this.setValueForm();
  }

  getExportBillType() {
    this.exportBillService.getExportBillType().subscribe(data => {
      this.exportBillTypes = data;
      this.exportBillForm.patchValue({exportBillType: data[1]});
    });
  }

  createForm() {
    this.exportBillForm = new FormGroup({
      exportBillType: new FormControl(),
      exportBillCode: new FormControl(),
      exportBillDate: new FormControl(),
      employee: new FormControl(),
      exportBillReason: new FormControl(),
      exportBillAddress: new FormControl(),
      manufacturer: new FormControl()
    });
  }

  setValueForm() {
    this.exportBillForm.patchValue({
      exportBillCode: 'HDXH12458',
      exportBillDate: this.getDateNow(),
    });
  }

  getListDrug() {
    this.drugs = [];
    this.exportBillService.getListDrugImportBill().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        let check = true;
        for (let j = 0; j < this.drugDestroys.length; j++) {
          if (this.drugDestroys[j].importBillDrugId === data[i].importBillDrugId) {
            check = false;
            break;
          }
        }
        if (check) {
          this.drugs.push(data[i]);
        }
      }
    });
  }

  selectType(value: any) {
    if (Object.values(value)[0] == 0) {
      this.route.navigateByUrl("/management/warehouse/warehouse-export/export-bill-return");
    }
  }

  createExportBill() {
    let exportBill = this.exportBillForm.value;
    console.log(exportBill);
    this.exportBillService.createExportBill(exportBill).subscribe(() => {
        // for(let i=0 ; i < this.drugDestroys.length ;i++){
        //   let exportBillDetail = {
        //     exportBill: exportBill,
        //     importBillDrug : this.drugDestroys[i]
        //   };
        //   this.exportBillService.createExportBillDetail(exportBillDetail).subscribe( () => {
        //   })
        // }
      }, error => {
        console.log(error)
      },
      () => {
        alert('Hoàn thành!!!')
      }
    );
  }

  selectRow(id: number, name: string) {
    const tr = document.getElementById(String(id));
    if (tr.style.backgroundColor == 'rgb(99, 184, 255)') {
      this.idDrug = null;
      tr.style.backgroundColor = null;
    } else {
      this.idDrug = id;
      this.nameDrug = name;
      for (let i = 0; i < this.drugDestroys.length; i++) {
        if (this.drugDestroys[i].importBillDrugId === id) {
          document.getElementById(String(this.drugDestroys[i].importBillDrugId)).style.backgroundColor = '#63B8FF';
        } else {
          document.getElementById(String(this.drugDestroys[i].importBillDrugId)).style.backgroundColor = null;
        }
      }
    }
  }

  selectDrug(id: string) {
    this.exportBillService.findDrugById(+id).subscribe(data => {
        this.drugDestroys.push(data);
        this.totalMoney += data.importAmount * data.importPrice;
      }, error => {
        console.log('Find not found');
      },
      () => {
        this.getListDrug();
      });
  }

  getDateNow(): string {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  compareFn(c1: ExportBillType, c2: ExportBillType): boolean {
    return c1 && c2 ? c1.exportBillTypeId === c2.exportBillTypeId : c1 === c2;
  }
}
