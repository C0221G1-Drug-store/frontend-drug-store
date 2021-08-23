import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../app.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private toast: ToastrService,
              private router: Router) {
    const state = this.router.getCurrentNavigation().extras.state as { data };
    if (state != null) {
      this.toast.success('Đã thanh toán thành công');
    }
  }

  ngOnInit(): void {
  }

}
