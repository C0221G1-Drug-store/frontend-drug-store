import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ExportbilltypeService} from '../../../../service/export-bill/exportbilltype.service';
import {ImportbilldrugService} from '../../../../service/export-bill/importbilldrug.service';
import {ManufacturerService} from '../../../../service/export-bill/manufacturer.service';
import {Exportbilltype} from '../../../../model/export-bill/exportbilltype';
import {Importbilldrug} from '../../../../model/export-bill/importbilldrug';
import {Manufacturer} from '../../../../model/export-bill/manufacturer';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {DialogService} from '../../../../service/export-bill/dialog.service';
import {Router} from '@angular/router';
import {ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material/select';
import {take, takeUntil} from 'rxjs/operators';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import {ExportbillService} from '../../../../service/export-bill/exportbill.service';


@Component({
  selector: 'app-export-bill-refund',
  templateUrl: './export-bill-refund.component.html',
  styleUrls: ['./export-bill-refund.component.css']
})
export class ExportBillRefundComponent implements OnInit, AfterViewInit, OnDestroy {
  exportBillForm: FormGroup;
  exportBillType: Exportbilltype[] = [];
  importBillDrug: Importbilldrug[] = [];
  manufacturer: Manufacturer[] = [];
  addressManufacture = '';
  drugDestroy: Importbilldrug[] = [];
  total = 0;
  p = 1;
  a = [1, 2, 3, 4, 5];
  exportBillCode: string;
  bankCtrl: FormControl = new FormControl();
  bankFilterCtrl: FormControl = new FormControl();
  filteredBanks: ReplaySubject<Importbilldrug[]> = new ReplaySubject<Importbilldrug[]>(0);
  @ViewChild('drugSelect') drugSelect: MatSelect;
  _onDestroy = new Subject<void>();

  constructor(private exportbilltypeService: ExportbilltypeService,
              private importbilldrugService: ImportbilldrugService,
              private manufacturerService: ManufacturerService,
              private matDialog: MatDialog,
              private snackBar: MatSnackBar,
              private dialogService: DialogService,
              private exportbillService : ExportbillService,
              private router: Router) {
    this.createForm();
    this.createExportBillRefundCode();
  }

  ngOnInit(): void {
    this.getAllExportBillType();
    this.getAllManufacturer();
    this.getListDrug();
    this.setValueDateForm();
    this.getExportBillType();
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
    verticalPosition: 'top'
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
      this.exportBillType = data;
      this.exportBillForm.patchValue({exportBillType: data[0]});
    });
  }


  createForm() {
    this.exportBillForm = new FormGroup({
      exportBillType: new FormControl(),
      exportBillCode: new FormControl(),
      exportBillDate: new FormControl(),
      employee: new FormControl('Nguyễn Văn A'),
      exportBillReason: new FormControl(),
      exportBillAddress: new FormControl(),
      manufacturer: new FormControl()
    });
  }

  setValueDateForm() {
    this.exportBillForm.patchValue({
      exportBillDate: this.getDateNow(),
    });
  }

  createExportBillRefundCode(){
    this.exportbillService.createCodeExportBillRefund().subscribe(res => {
      this.exportBillCode = res;
      this.exportBillForm.patchValue({
        exportBillCode: this.exportBillCode
      })
    })
  }

  getAllExportBillType() {
    this.exportbilltypeService.getAllExportBillType().subscribe(res => {
      this.exportBillType = res;
    });
  }

  getAllManufacturer() {
    this.manufacturerService.getAllManufacturer().subscribe(res => {
      this.manufacturer = res;
    });
  }

  selectedObj: Importbilldrug;

  onselect(drugDestroy: Importbilldrug) {
    this.selectedObj = drugDestroy;
  }

  getListDrug() {
    this.importBillDrug = [];
    this.importbilldrugService.getAllImportBillDrug().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        let check = true;
        for (let j = 0; j < this.drugDestroy.length; j++) {
          if (this.drugDestroy[j].importBillDrugId === res[i].importBillDrugId) {
            check = false;
            break;
          }
        }
        if (check) {
          this.importBillDrug.push(res[i]);
        }
      }
    });
    this.filteredBanks.next(this.importBillDrug);
  }

  selectDrug() {
    let res = this.bankCtrl.value;
    if (this.drugDestroy.includes(res) == false) {
      this.drugDestroy.push(res);
      this.total += (res.importAmount * res.importPrice) - (res.discountRate * res.importPrice / 100) - (res.importAmount * res.importPrice * res.vat / 100);
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

  deleteDrug() {
    if (this.idDrug == null) {
      this.warn('::Bạn chưa chon thuốc');
    } else {
      this.dialogService.openConfirm('Bạn có muốn xóa thuốc ' + this.nameDrug + ' khỏi danh sách').afterClosed().subscribe(res => {
        if (res === true) {
          console.log(res);
          this.drugDestroy = this.drugDestroy.filter(item => item.importBillDrugId !== this.idDrug);
          this.success('::Bạn đã xóa thuốc thành công');
        }
        this.total = 0;
        for (let i = 0; i < this.drugDestroy.length; i++) {
          this.total += (this.drugDestroy[i].importAmount * this.drugDestroy[i].importPrice) - (this.drugDestroy[i].discountRate * this.drugDestroy[i].importPrice / 100) - (this.drugDestroy[i].importAmount * this.drugDestroy[i].importPrice * this.drugDestroy[i].vat / 100);
        }
      }, error => {
        this.warn('::Bạn chưa chon thuốc');
      });
    }
  }

  setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.drugSelect.compareWith = (a: Importbilldrug, b: Importbilldrug) => a && b && a.importBillDrugId === b.importBillDrugId;
      });
  }

  filterBanks() {
    if (!this.importBillDrug) {
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
      this.importBillDrug.filter(data => (data.drug.drugName).toLowerCase().indexOf(search) > -1)
    );
  }

  compareFn(c1: Exportbilltype, c2: Exportbilltype): boolean {
    return c1 && c2 ? c1.exportBillTypeId === c2.exportBillTypeId : c1 === c2;
  }

  selectType(value: string) {
    // @ts-ignore
    if (Object.values(value)[0] == 1) {
      this.router.navigateByUrl('');
    }
  }

  compareFn1(c1: Manufacturer, c2: Manufacturer): boolean {
    return c1 && c2 ? c1.manufacturerId === c2.manufacturerId : c1 === c2;
  }

  idManufacture = 0;

  changeName(value: string) {
    this.idManufacture = parseInt(value);
    console.log(this.idManufacture);
    for (let i = 0; i < this.manufacturer.length; i++) {
      // @ts-ignore
      if (this.idManufacture == this.manufacturer[i].manufacturerId) {
        this.addressManufacture = this.manufacturer[i].manufacturerAddress;
        break;
      }
    }
    console.log(this.addressManufacture);
    this.exportBillForm.patchValue({
      exportBillAddress: this.addressManufacture
    });
    this.getDrugBillByManufacturerId(this.idManufacture);

  }

  idDrug: number;
  nameDrug: string;

  deleteById(importBillDrugId) {
    this.idDrug = importBillDrugId;
    for (let i = 0; i < this.drugDestroy.length; i++) {
      if (this.idDrug === this.drugDestroy[i].importBillDrugId) {
        this.nameDrug = this.drugDestroy[i].drug.drugName;
      }
    }
    console.log(this.nameDrug);
  }


  htmlToPDF() {
    let data = document.getElementById('content');
    html2canvas(data).then(canvas => {
      let imgWidth = 208;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4');
      let position = 2;
      pdf.addImage(contentDataURL, 'PNG', 1, position, imgWidth, imgHeight);
      pdf.save('Hóa đơn xuất trả ngày ' + this.getDateNow() + '.pdf');
      this.success(':: Bạn đã in hóa đơn thành công ');
    });
  }


  getDrugBillByManufacturerId(id: number) {
    this.importbilldrugService.getByManufacturerId(id).subscribe(res => {
      this.importBillDrug = res;
      console.log(this.importBillDrug);
      // @ts-ignore
      this.filteredBanks.next(
        this.importBillDrug.filter(data => (data.drug.drugName).toLowerCase())
      );
    });
  }

  getBackExportManagerment() {
    this.dialogService.openConfirm('Bạn có muốn trở lại màn hình quản lí hay không ?')
      .afterClosed().subscribe(res => {
      if (res == true) {
        this.backToManagementScreen();
      }

    });
  }

  backToManagementScreen() {
    this.router.navigateByUrl('/');
  }
}
