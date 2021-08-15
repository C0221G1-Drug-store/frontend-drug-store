import {Component, Inject, OnInit} from '@angular/core';
import {ManufacturerService} from "../../../service/manufacturer.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Manufacturer} from "../../../model/manufacturer";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-manufacturer-update',
  templateUrl: './manufacturer-update.component.html',
  styleUrls: ['./manufacturer-update.component.css']
})
export class ManufacturerUpdateComponent implements OnInit {
  manufacturer: Manufacturer;
  manufacturerForm: FormGroup;

  constructor(private manufacturerService: ManufacturerService, @Inject(MAT_DIALOG_DATA) public data) {
    this.manufacturerService.findByIdManufacture(data.id).subscribe(manufacturer => {
      this.manufacturer = manufacturer;
      console.log(this.manufacturer);
      this.manufacturerForm.patchValue(this.manufacturer);
    });
    this.manufacturerForm = new FormGroup(
      {
        manufacturerId: new FormControl('', [Validators.required]),
        manufacturerCode: new FormControl('', [Validators.required]),
        manufacturerName: new FormControl('', [Validators.required]),
        manufacturerAddress: new FormControl('', [Validators.required]),
        manufacturerEmail: new FormControl('', [Validators.required]),
        manufacturerPhoneNumber: new FormControl('', [Validators.required]),
        manufacturerNote: new FormControl('', [Validators.required]),
        manufacturerDebts: new FormControl(0.0)
      }
    )
  }

  ngOnInit(): void {

  }

  submit() {
    if (this.manufacturerForm.valid) {
      const manufacturer = this.manufacturerForm.value;
      console.log(manufacturer);
      this.manufacturerService.updateManufacturer(manufacturer.manufacturerId,manufacturer).subscribe(  ()=>{

        }
      );
      alert("Chỉnh sửa  thành công");

    } else {
      alert('Chỉnh sửa không thành công');
    }
  }
}
