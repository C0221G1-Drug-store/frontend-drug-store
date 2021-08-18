import {Component, OnDestroy, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReplaySubject, Subject} from "rxjs";
import {take, takeUntil} from "rxjs/operators";
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import {MatSelect} from "@angular/material/select";
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/en-VI';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {Exportbilltype} from '../../../../model/export-bill/exportbilltype';
import {Importbilldrug} from '../../../../model/export-bill/importbilldrug';
import {DialogService} from '../../../../service/export-bill/dialog.service';
import {validateDate} from '../validateDate';
import {ExportbilltypeService} from '../../../../service/export-bill/exportbilltype.service';
import {ImportbilldrugService} from '../../../../service/export-bill/importbilldrug.service';
import {ExportbillService} from '../../../../service/export-bill/exportbill.service';

registerLocaleData(localeFr, 'vi');

@Component({
  selector: 'app-export-bill-destroy',
  templateUrl: './export-bill-destroy.component.html',
  styleUrls: ['./export-bill-destroy.component.css']
})
export class ExportBillDestroyComponent implements OnInit, AfterViewInit, OnDestroy {
  exportBillForm: FormGroup;
  exportBillTypes: Exportbilltype[];
  drugs: Importbilldrug[] = [];
  drugDestroys: Importbilldrug[] = [];
  idDrug?: number;
  nameDrug?: string;
  totalMoney: number = 0;
  p = 1;
  a = [1, 2, 3, 4, 5];
  today = new Date();
  click = true;
  bankCtrl: FormControl = new FormControl();
  bankFilterCtrl: FormControl = new FormControl();
  filteredBanks: ReplaySubject<Importbilldrug[]> = new ReplaySubject<Importbilldrug[]>(0);
  @ViewChild('drugSelect') drugSelect: MatSelect;
  @ViewChild('pdfTable') pdfTable: ElementRef;
  _onDestroy = new Subject<void>();

  constructor(private exportbilltypeService: ExportbilltypeService,
              private importbilldrugService: ImportbilldrugService,
              private  exportbillService : ExportbillService,
              private route: Router,
              private dialogService: DialogService,
              private snackBar: MatSnackBar) {
    this.createForm();
    this.getListDrug();
    this.getExportBillType();
    this.setValueForm();
    this.exportbillService.getEmployee().subscribe(data => {
      this.exportBillForm.get('employee').setValue(data.employeeName);
    });
    this.importbilldrugService.getAllImportBillDrug().subscribe(data => {
      this.drugs = data;
      this.getListDrug();
    });
  }

  ngOnInit(): void {
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };

  success(msg) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, '', this.config);
  }

  warn(msg) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }

  getExportBillType() {
    this.exportbilltypeService.getAllExportBillType().subscribe(data => {
      this.exportBillTypes = data;
      this.exportBillForm.patchValue({exportBillType: data[1]});
    });
  }

  createForm() {
    this.exportBillForm = new FormGroup({
      exportBillType: new FormControl('', [Validators.required]),
      exportBillCode: new FormControl('', [Validators.required]),
      exportBillDate: new FormControl('', [Validators.required,validateDate]),
      exportBillReason: new FormControl('', [Validators.required]),
      exportBillAddress: new FormControl({value: '', disabled: true}),
      manufacturer: new FormControl({value: '', disabled: true}),
      employee: new FormControl({value: '', disabled: true})
    });
  }

  setValueForm() {
    this.exportbillService.createCodeExportBillDestroy().subscribe(data => {
      this.exportBillForm.patchValue({
        exportBillCode: data[0],
        exportBillDate: this.getDateNow()
      });
    }, error => {
      console.log(error)
    });

  }

  getListDrug() {
    let drugs = this.drugs;
    for (let i = 0; i < this.drugDestroys.length; i++) {
      drugs = drugs.filter(item => item.importBillDrugId != this.drugDestroys[i].importBillDrugId)
    }
    console.log(drugs);
    this.filteredBanks.next(drugs);
  }

  selectType(value: any) {
    if (Object.values(value)[0] == 0) {
      this.route.navigateByUrl("/management/warehouse/warehouse-export/export-bill-refund");
    }
  }

  selectRow(id: number, name: string) {
    const tr = document.getElementById(String(id));
    if (tr.style.backgroundColor == 'rgb(98, 184, 255)') {
      this.idDrug = null;
      tr.style.backgroundColor = null;
    } else {
      this.idDrug = id;
      this.nameDrug = name;
      for (let i = 0; i < this.drugDestroys.length; i++) {
        if (this.drugDestroys[i].importBillDrugId === id) {
          document.getElementById(String(this.drugDestroys[i].importBillDrugId)).style.backgroundColor = '#62b8ff';
        } else {
          document.getElementById(String(this.drugDestroys[i].importBillDrugId)).style.backgroundColor = null;
        }
      }
    }
  }

  selectDrug() {
    let data = this.bankCtrl.value;
    if (this.drugDestroys.includes(data) == false) {
      this.drugDestroys.push(data);
      this.totalMoney += data.importAmount * data.importPrice;

      this.getListDrug();
    }
  }

  getDateNow(): string {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  compareFn(c1: Exportbilltype, c2: Exportbilltype): boolean {
    return c1 && c2 ? c1.exportBillTypeId === c2.exportBillTypeId : c1 === c2;
  }

  setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.drugSelect.compareWith = (a: Importbilldrug, b: Importbilldrug) => a && b && a.importBillDrugId === b.importBillDrugId;
      });
  }

  filterBanks() {
    if (!this.drugs) {
      return;
    }
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.getListDrug();
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredBanks.next(
      this.drugs.filter(data => (data.drug.drugName + data.importBill.importSystemCode).toLowerCase().indexOf(search) > -1)
    );
  }

  deleteDrug() {
    if (this.idDrug == null) {
      this.warn('Bạn chưa chon thuốc');
    } else {

      this.dialogService.openConfirm('Bạn có muốn xóa thuốc ' + this.nameDrug + ' khỏi danh sách').afterClosed().subscribe(result => {
          if (result === true) {
            this.drugDestroys = this.drugDestroys.filter(item => {
                if (item.importBillDrugId !== this.idDrug) {
                  return item;
                } else {
                  this.totalMoney -= (item.importAmount * item.importPrice);
                }
              }
            );
            this.idDrug = null;
            this.success('Xóa thuốc thành công')
          }
        }, error => {
          this.warn('Bạn chưa chon thuốc');
        },
        () => {
          this.bankCtrl.setValue('');
          this.getListDrug();
        });
    }
  }

  createExportBill() {
    if (!this.exportBillForm.valid || this.drugDestroys.length == 0) {
      alert("Bạn phải nhập đầy đủ thông tin");
    } else {
      let exportBill = this.exportBillForm.value;
      exportBill.exportBillDate += " " + this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
      this.exportbillService.createExportBill(exportBill).subscribe(data => {
        for (let i = 0; i < this.drugDestroys.length; i++) {
          let exportBillDetail = {
            exportBill: data,
            importBillDrug: this.drugDestroys[i]
          };
          this.exportbillService.createExportBillDetail(exportBillDetail).subscribe(() => {
          })
        }
        this.success('Tạo hóa đơn thành công');
        this.route.navigateByUrl('');
      }, error => {
        this.warn('Tạo hóa đơn thất bại')
      });
    }
  }

  htmlToPDF() {
    let data = document.getElementById('pdfTable');
    html2canvas(data).then(canvas => {
      let imgWidth = 208;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let contentDataURL = canvas.toDataURL('image/png');
      let position = 2;
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      pdf.addImage(contentDataURL, 'PNG', 1, position, imgWidth, imgHeight);
      pdf.save('Hóa đơn xuất hủy ngày ' + this.getDateNow() + '.pdf'); // Generated PDF
    });
  }

  returnList() {
    this.dialogService.openConfirm('Bạn có muốn hủy hóa đơn đang lâp không?').afterClosed().subscribe(result => {
      if (result === true) {
        this.route.navigateByUrl('');
      }
    }, error => {
      console.log('Not found!!!');
    });
  }
}
