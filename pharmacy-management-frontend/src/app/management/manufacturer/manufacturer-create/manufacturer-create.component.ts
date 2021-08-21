import {Component, Inject, OnInit} from '@angular/core';
import {ManufacturerService} from '../../../service/manufacturer.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-manufacturer-create',
  templateUrl: './manufacturer-create.component.html',
  styleUrls: ['./manufacturer-create.component.css']
})
export class ManufacturerCreateComponent implements OnInit {
  manufacturerForm: FormGroup;
  constructor(private  manufacturerService: ManufacturerService, public dialogRef: MatDialogRef<ManufacturerCreateComponent>) {
    this.manufacturerForm = new FormGroup(
      {
        manufacturerCode: new FormControl('', [Validators.required]),
        manufacturerName : new FormControl('', [Validators.required]),
        manufacturerAddress : new FormControl('', [Validators.required]),
        manufacturerEmail : new FormControl('', [Validators.required]),
        manufacturerPhoneNumber : new FormControl('', [Validators.required]),
        manufacturerNote: new FormControl('', [Validators.required]),
        manufacturerDebts: new FormControl(0.0)
      }
    );
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.manufacturerForm.valid) {
      const manufacturer = this.manufacturerForm.value;
      console.log(manufacturer);
      this.manufacturerService.saveManufacturer(manufacturer).subscribe(  () => {
        this.dialogRef.close(manufacturer);
        }
      );
      alert('Thêm  thành công');
    } else {
      alert('Thêm không thành công');
      this.dialogRef.close();
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
