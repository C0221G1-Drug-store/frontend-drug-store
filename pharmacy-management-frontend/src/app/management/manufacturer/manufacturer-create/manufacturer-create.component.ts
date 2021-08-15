import { Component, OnInit } from '@angular/core';
import {ManufacturerService} from "../../../service/manufacturer.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-manufacturer-create',
  templateUrl: './manufacturer-create.component.html',
  styleUrls: ['./manufacturer-create.component.css']
})
export class ManufacturerCreateComponent implements OnInit {
manufacturerForm: FormGroup;
  constructor(private  manufacturerService:ManufacturerService) {
  this.manufacturerForm= new FormGroup(
    {
    manufacturerCode: new FormControl('',[Validators.required]),
    manufacturerName :new FormControl('',[Validators.required]),
    manufacturerAddress :new FormControl('',[Validators.required]),
    manufacturerEmail :new FormControl('',[Validators.required]),
    manufacturerPhoneNumber :new FormControl('',[Validators.required]),
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
      this.manufacturerService.saveManufacturer(manufacturer).subscribe(  ()=>{

        }
      );
      alert("Thêm  thành công");

    } else {
      alert('Thêm không thành công');
    }
  }
}
