import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DrugService} from '../../../../service/drug.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-drug-create',
  templateUrl: './drug-create.component.html',
  styleUrls: ['./drug-create.component.css']
})
export class DrugCreateComponent implements OnInit {
  selectedImage: any = null;
  drugForm: FormGroup = new FormGroup({
  drugName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    drugFaculty: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    activeElement: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    drugSideEffect: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    conversionRate: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)]),
    drugImageDetails: new FormControl(''),
    wholesaleProfitRate: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern(/^\d*$/)]),
    retailProfitRate: new FormControl('', [Validators.min(0), Validators.pattern(/^\d*$/)]),
    unit: new FormControl('', [Validators.required]),
    conversionUnit: new FormControl('', [Validators.required]),
    manufacturer: new FormControl('', [Validators.maxLength(25)]),
    origin: new FormControl('', [Validators.required]),
    drugGroup: new FormControl('', [Validators.required]),
    note: new FormControl('', [Validators.maxLength(250)])
  });

  constructor(private drugService: DrugService,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  submit() {
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.drugForm.patchValue({drugImageDetails: url});
          this.drugService.save(this.drugForm.value).subscribe(() => {
            alert('Tạo thành công');
            this.drugForm.reset();
          });
        });
      })
    ).subscribe();
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}
