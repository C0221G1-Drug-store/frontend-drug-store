import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DrugService} from '../../../../service/drug.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DrugDeleteComponent} from '../drug-delete/drug-delete.component';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {DrugGroupService} from '../../../../service/drug-group.service';
import {DrugGroup} from '../../../../model/drugGroup';
import {Drug} from '../../../../model/drug';

@Component({
  selector: 'app-drug-edit',
  templateUrl: './drug-edit.component.html',
  styleUrls: ['./drug-edit.component.css']
})
export class DrugEditComponent implements OnInit {
  drugGroups: DrugGroup[] = [];
  drugForm: FormGroup;
  drugId;
  drugCode;
  drugGroup;
  selectedImage;
  urlImage = [];

  constructor(private drugService: DrugService,
              private drugGroupService: DrugGroupService,
              private dialogRef: MatDialogRef<DrugDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private storage: AngularFireStorage) {
    this.drugId = this.data.data1.drugId;
    this.drugCode = this.data.data1.drugCode;
    this.drugGroup = this.data.data1.drugGroup;
    this.getDrug();
  }

  ngOnInit(): void {
    this.getAllDrugGroup();
  }
  compareFn(c1: Drug, c2: Drug): boolean {
    return c1 && c2 ? c1.drugId === c2.drugId : c1 === c2;
  }
  private getDrug() {
    return this.drugService.getDrugById(this.drugId).subscribe(drug => {
      this.drugForm = new FormGroup({
        drugName: new FormControl(drug.drugName, [Validators.required, Validators.maxLength(25)]),
        drugFaculty: new FormControl(drug.drugFaculty, [Validators.required, Validators.maxLength(50)]),
        activeElement: new FormControl(drug.activeElement, [Validators.required, Validators.maxLength(50)]),
        drugSideEffect: new FormControl(drug.drugSideEffect, [Validators.required, Validators.maxLength(50)]),
        conversionRate: new FormControl(drug.conversionRate, [Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)]),
        // drugImageDetails: new FormControl(drug.drugImageDetails),
        // tslint:disable-next-line:max-line-length
        wholesaleProfitRate: new FormControl(drug.wholesaleProfitRate, [Validators.required, Validators.min(0), Validators.pattern(/^\d*$/)]),
        retailProfitRate: new FormControl(drug.retailProfitRate, [Validators.min(0), Validators.pattern(/^\d*$/)]),
        unit: new FormControl(drug.unit, [Validators.required]),
        conversionUnit: new FormControl(drug.conversionUnit, [Validators.required]),
        manufacturer: new FormControl(drug.manufacturer, [Validators.maxLength(25)]),
        origin: new FormControl(drug.origin, [Validators.required]),
        drugGroup: new FormControl(drug.drugGroup, [Validators.required]),
        note: new FormControl(drug.note, [Validators.maxLength(250)])
      });
    });
  }
  updateDrug() {
    // const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    // const fileRef = this.storage.ref(nameImg);
    // this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
    //   finalize(() => {
    //     fileRef.getDownloadURL().subscribe((url) => {
    //       this.drugForm.patchValue({drugImageDetails: url});
    //       this.drugService.update(this.drugId, this.drugCode, this.drugForm.value).subscribe(() => {
    //         alert('Cập nhật thành công');
    //         this.drugForm.reset();
    //         this.dialogRef.close();
    //       }, error => alert('Cập nhất thất bại'));
    //     });
    //   })
    // ).subscribe();

    // @ts-ignore
    this.drugService.update(this.drugId, this.drugCode,this.drugForm.value).subscribe(data => {
      alert('Cập nhật thành công');
      this.dialogRef.close();
      // console.log(data);
      for (let i = 0; i < this.urlImage.length; i++) {
        let drugImage = {
          drugImageDetailUrl: this.urlImage[i],
          drug: data,
        };
        console.log(drugImage);
        this.drugService.saveImage(drugImage).subscribe(() => {
        });
      }
      });
  }
  uploadFile(imageFile) {
    const nameImg = this.getCurrentDateTime() + imageFile.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, imageFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.urlImage.push(url);
        });
      })
    ).subscribe();
  }
  showPreview(event: any) {
    // this.selectedImage = event.target.files[0];
    this.selectedImage = [];
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImage.push(e.target.result);
        };
        reader.readAsDataURL(file);
        this.uploadFile(file);
      }
    }
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getAllDrugGroup() {
    this.drugGroupService.getAll().subscribe(drugGroups => {
      this.drugGroups = drugGroups;
    });
  }
}
