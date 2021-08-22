import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DrugService} from '../../../../service/drug.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {DrugGroup} from '../../../../model/drugGroup';
import {DrugGroupService} from '../../../../service/drug-group.service';
import {Router} from '@angular/router';
import {DrugImageDetail} from '../../../../model/drugImageDetail';

@Component({
  selector: 'app-drug-create',
  templateUrl: './drug-create.component.html',
  styleUrls: ['./drug-create.component.css']
})
export class DrugCreateComponent implements OnInit {
  drugGroups: DrugGroup[] = [];
  selectedImage;
  urlImage;
  drugForm: FormGroup = new FormGroup({
  drugName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    drugFaculty: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    activeElement: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    drugSideEffect: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    conversionRate: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)]),
    // drugImageDetails: new FormControl(''),
    wholesaleProfitRate: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern(/^\d*\.?\d*$/)]),
    retailProfitRate: new FormControl('', [Validators.min(0), Validators.pattern(/^\d*\.?\d*$/)]),
    unit: new FormControl('', [Validators.required]),
    conversionUnit: new FormControl('', [Validators.required]),
    manufacturer: new FormControl('', [Validators.maxLength(25)]),
    origin: new FormControl('', [Validators.required]),
    drugGroup: new FormControl(null, Validators.required),
    note: new FormControl('', [Validators.maxLength(250)])
  });
  // select = null;

  constructor(private drugService: DrugService,
              private drugGroupService: DrugGroupService,
              private storage: AngularFireStorage,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllDrugGroup();
  }

  submit() {
      this.drugService.save(this.drugForm.value).subscribe(data => {
        for (let i = 0; i<this.urlImage.length; i++){
          let drugImage = {
            drugImageDetailUrl: this.urlImage[i],
            drug: data,
          };
          console.log(drugImage);
          this.drugService.saveImage(drugImage).subscribe(() => {
          }, error => {
            alert("Tạo ảnh thất bại!")
          })
        }
        alert('Tạo thành công');
        this.backToList();
      },error => {
        alert("Tạo thất bại!")
      });
  }
  backToList() {
    this.router.navigateByUrl('/drug/list');
  }

  uploadFile(imageFile) {
    this.urlImage = [];
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
  showPreview(event) {
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
  getAllDrugGroup() {
    this.drugGroupService.getAll().subscribe(drugGroups => {
      this.drugGroups = drugGroups;
    });
  }

}
