import {Component, Inject, OnInit} from '@angular/core';
import {ManufacturerService} from "../../../service/manufacturer.service";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-manufacturer-delete',
  templateUrl: './manufacturer-delete.component.html',
  styleUrls: ['./manufacturer-delete.component.css']
})
export class ManufacturerDeleteComponent implements OnInit {

  constructor(private manufacturerService: ManufacturerService, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }
  delete(id: any){
    this.manufacturerService.deleteManufacturer(id).subscribe();
    console.log(id)
  }
}
