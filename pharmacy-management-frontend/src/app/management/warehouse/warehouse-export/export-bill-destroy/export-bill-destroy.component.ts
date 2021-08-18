import {Component, OnDestroy, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ExportBillService} from "../../../../service/export-bill.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExportBillType} from "../../../../model/export-bill/export-bill-type";
import {DrugImportBill} from "../../../../model/import-bill/drug-import-bill";
import {Employee} from "../../../../model/employee/employee";
import {Manufacturer} from "../../../../model/manufacturer/manufacturer";
import {ReplaySubject, Subject} from "rxjs";
import {take, takeUntil} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {DialogConfirmComponent} from "../dialog-confirm/dialog-confirm.component";
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import {MatSelect} from "@angular/material/select";
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/en-VI';

registerLocaleData(localeFr, 'vi');

@Component({
  selector: 'app-export-bill-destroy',
  templateUrl: './export-bill-destroy.component.html',
  styleUrls: ['./export-bill-destroy.component.css']
})
export class ExportBillDestroyComponent implements OnInit, AfterViewInit, OnDestroy {
  exportBillForm: FormGroup;
  exportBillTypes: ExportBillType[];
  drugs: DrugImportBill[] = [];
  drugDestroys: DrugImportBill[] = [];
  idDrug?: number;
  nameDrug?: string;
  totalMoney: number = 0;
  p = 1;
  a = [1, 2, 3, 4, 5];
  bankCtrl: FormControl = new FormControl();
  bankFilterCtrl: FormControl = new FormControl();
  filteredBanks: ReplaySubject<DrugImportBill[]> = new ReplaySubject<DrugImportBill[]>(0);
  @ViewChild('drugSelect') drugSelect: MatSelect;
  _onDestroy = new Subject<void>();

  constructor(private exportBillService: ExportBillService,
              private route: Router,
              private dialog: MatDialog) {
    this.createForm();
    this.getListDrug();
  }

  ngOnInit(): void {
    this.getExportBillType();
    this.setValueForm();
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

  getExportBillType() {
    this.exportBillService.getExportBillType().subscribe(data => {
      this.exportBillTypes = data;
      this.exportBillForm.patchValue({exportBillType: data[1]});
    });
  }

  createForm() {
    this.exportBillForm = new FormGroup({
      exportBillType: new FormControl('', [Validators.required]),
      exportBillCode: new FormControl('', [Validators.required]),
      exportBillDate: new FormControl('', [Validators.required]),
      employee: new FormControl('', [Validators.required]),
      exportBillReason: new FormControl('', [Validators.required]),
      exportBillAddress: new FormControl(),
      manufacturer: new FormControl()
    });
  }

  setValueForm() {
    this.exportBillService.createCodeExportBill().subscribe(data => {
      this.exportBillForm.patchValue({
        exportBillCode: data,
        exportBillDate: this.getDateNow(),
      });
    }, error => {console.log(error)});

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
    this.filteredBanks.next(this.drugs);
  }

  selectType(value: any) {
    if (Object.values(value)[0] == 0) {
      this.route.navigateByUrl("/management/warehouse/warehouse-export/export-bill-refund");
    }
  }

  createExportBill() {
    if(!this.exportBillForm.valid){
      alert("Phải nhập đầy đủ thông tin");
    }else {
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

  compareFn(c1: ExportBillType, c2: ExportBillType): boolean {
    return c1 && c2 ? c1.exportBillTypeId === c2.exportBillTypeId : c1 === c2;
  }

  setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.drugSelect.compareWith = (a: DrugImportBill, b: DrugImportBill) => a && b && a.importBillDrugId === b.importBillDrugId;
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
      alert('Bạn chưa chọn thuốc cần xóa!!!');
    } else {
      let deleteDialog = this.dialog.open(DialogConfirmComponent, {
        data: {
          title: 'Xóa thuốc',
          message: 'Bạn có muốn xóa thuốc ' + this.nameDrug + ' khỏi danh sách không ???'
        }
      });
      deleteDialog.afterClosed().subscribe(result => {
        if (result === true) {
          this.drugDestroys = this.drugDestroys.filter(item => item.importBillDrugId !== this.idDrug);
          this.idDrug = null;
        }
      }, error => {
        console.log('Not found!!!');
      });
    }
  }

  htmlToPDF() {
    let data = document.getElementById('pdfTable');
    html2canvas(data).then(canvas => {
      let imgWidth = 208;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 2;
      pdf.addImage(contentDataURL, 'PNG', 1, position, imgWidth, imgHeight)
      pdf.save('Hóa đơn xuất hủy ngày ' + this.getDateNow() + '.pdf'); // Generated PDF
    });
  }

  returnList() {
    const returnDialog = this.dialog.open(DialogConfirmComponent, {
      data: {
        title: 'Xác nhận',
        message: 'Bạn có muốn hủy hóa đơn đang lâp không?'
      }
    });
    returnDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.route.navigateByUrl('');
      }
    }, error => {
      console.log('Not found!!!');
    });
  }
}
