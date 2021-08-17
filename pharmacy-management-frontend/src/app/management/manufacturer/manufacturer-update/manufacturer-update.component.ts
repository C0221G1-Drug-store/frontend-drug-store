import {Component, Inject, OnInit} from '@angular/core';
import {ManufacturerService} from "../../../service/manufacturer.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Manufacturer } from 'src/app/model/manufacturer';

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
        manufacturerCode: new FormControl('',[Validators.required]),
        manufacturerName :new FormControl('',[Validators.required,Validators.pattern(/^[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ][a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]+([ ][A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ][a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]+)+$/)]),
        manufacturerAddress :new FormControl('',[Validators.required,Validators.pattern(/^[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ][a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]+([ ][A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ][a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]+)+$/)]),
        manufacturerEmail :new FormControl('',[Validators.required,Validators.email]),
        manufacturerPhoneNumber :new FormControl('',[Validators.required,Validators.pattern(/^\+84[0-9]{8,9}$/)]),
        manufacturerNote:new FormControl('',[Validators.required]),
        manufacturerDebts:new FormControl(0.0)
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
