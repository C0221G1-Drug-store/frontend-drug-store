import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {CartService} from '../../service/cart.service';
import {DrugCart} from '../../model/cart/drug-cart';
import {Currency} from '../../model/cart/currency';

//#region USD100 >> 100 USD

import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

registerLocaleData(localeFr, 'fr');

// #endregion

declare let paypal: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewChecked {
  list = [
    {
      img: 'https://image.pharmacity.vn/live/uploads/2019/04/P00066_1_l-300x300.jpg',
      info: 'Dầu gió xanh Thiên Thảo (Chai12ml)',
      unit: 19500,
      amount: 10,
      price: 195000,
      maxAmount: 11,
    },
    {
      img: 'https://image.pharmacity.vn/live/uploads/2019/04/P00779_1_l.jpg',
      info: 'Fugacar Mebendazole (500mg)',
      unit: 19000,
      amount: 5,
      price: 95000,
      maxAmount: 20,
    },
    {
      img: 'https://image.pharmacity.vn/live/uploads/2021/07/P20426_1_l-300x300.jpg',
      info: 'Tăm bông kháng khuẩn đầu xoán Sakura(Lọ 200 que giấy)',
      unit: 44000,
      amount: 1,
      price: 44000,
      maxAmount: 3,
    },
    {
      img: 'https://image.pharmacity.vn/live/uploads/2021/07/P20426_1_l-300x300.jpg',
      info: 'Tăm bông kháng khuẩn đầu xoán Sakura(Lọ 200 que giấy)',
      unit: 44000,
      amount: 3,
      price: 132000,
      maxAmount: 20,
    },
    {
      img: 'https://image.pharmacity.vn/live/uploads/2021/07/P20426_1_l-300x300.jpg',
      info: 'Tăm bông kháng khuẩn đầu xoán Sakura(Lọ 200 que giấy)',
      unit: 44000,
      amount: 2,
      price: 88000,
      maxAmount: 20,
    }
  ];
  listVoucher = [
    {id: 1, code: '1234567890', money: '100000'},
    {id: 2, code: '1234567891', money: '200000'},
    {id: 3, code: '1234567892', money: '150000'},
    {id: 4, code: '1234567893', money: '50000'},
  ];
  //#region CART
  medicines: DrugCart[];
  medicine!: DrugCart;
  moneyTotal = 0;
  moneyPayPal = 0;
  medicineTotal = 0;
  currency!: Currency;
  currencyDateNow = '';
  currencyMoney = 0;
  resultMsg = '';
  // #endregion

  //#region PAYPAL
  finalAccount = 1;
  paypalLoad = true;

  addScript = false;
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AbnnpqkZWFt3p_vsAq9MTYGktX4-6iq1LQVNQlSCVSFPxZ-wNFmL65aE0JGqu4E8a1nzUDX8XkP2amk6',
      production: ''
    },
    style: {
      label: 'pay',   // paypal | checkout | pay
      size: 'responsive',    // small | medium | large | responsive
      shape: 'pill',     // pill | rect
      color: 'gold',      // gold | blue | silver | black
      tagline: 'true'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {amount: {total: this.finalAccount, currency: 'USD'}}
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        // Do something when payment is successful.
        this.voucherMoney = 0;
        this.resultMsg = 'Thanh toán thành công';
        this.medicines = null;
        localStorage.removeItem('medicineList');
        // Send email.
        this.cartService.sendEmail().subscribe(e => {
          console.log('ok');
        }, error => {
          console.log('error');
        });
      });
    }
  };

//   #endregion

  //#region VOUCHER
  voucherMsg = '';
  voucherForm = this.fb.group({
    code: ['', [Validators.maxLength(10)]]
  });
  isVoucher = true;
  voucherMoney = 0;

  // #endregion

  constructor(private cartService: CartService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getMedicineList();
    this.cartService.sendEmail().subscribe(e => {
      console.log('ok');
    }, error => {
      console.log('error');
    });
  }

  getMedicineList() {
    // localStorage.setItem('medicineList', JSON.stringify(this.list));

    this.resultMsg = '';
    this.medicines = JSON.parse(localStorage.getItem('medicineList'));
  }


  //#region ADD + SUB + DEL + UPDATE
  medicineSub(i: number) {
    if (this.medicines[i].amount > 0) {
      this.medicines[i].amount--;
    }
    this.medicines[i].price = this.medicines[i].unit * this.medicines[i].amount;
    localStorage.setItem('medicines', JSON.stringify(this.medicine));
  }

  medicineAdd(i: number) {
    if (this.medicines[i].amount < this.medicines[i].maxAmount) {
      this.medicines[i].amount++;
    }
    this.medicines[i].price = this.medicines[i].unit * this.medicines[i].amount;
    localStorage.setItem('medicines', JSON.stringify(this.medicine));
  }

  delMedicine(i: number) {
    this.medicines.splice(i, 1);
    localStorage.setItem('medicineList', JSON.stringify(this.medicines));
  }

  getTotal() {
    for (let i = 0; i < this.medicines.length; i++) {
      this.moneyTotal += this.medicines[i].price;
      this.medicineTotal += this.medicines[i].amount;
      if (this.medicines[i].amount === 0) {
        this.delMedicine(i);
      }
    }
    this.convertUsdCurrency(this.moneyTotal);
  }

  update() {
    this.medicineTotal = 0;
    this.moneyTotal = -this.voucherMoney;
    this.moneyPayPal = 0;
    this.getTotal();
    localStorage.setItem('medicineList', JSON.stringify(this.medicines));
  }

  // #endregion

  //#region CONVERT MONEY get MONEY + Date now currency + Currency
  convertUsdCurrency(VND: number) {
    this.cartService.convertUsdCurrency().subscribe(data => {
      this.currency = data;
      const vnd = this.currency.rates['VND'];
      const usd = this.currency.rates['USD'];
      this.currencyDateNow = this.currency.date;
      this.currencyMoney = vnd / usd;
      this.moneyPayPal = usd * VND / vnd;
    });
  }

  // #endregion

  //#region Paypal
  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#myPaypalButton');
        this.paypalLoad = false;
        // alert('ok successful');
      });
    }
  }

  private addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, rejects) => {
      const scriptTagElement = document.createElement('script');
      scriptTagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptTagElement.onload = resolve;
      document.body.appendChild(scriptTagElement);
    });
  }

  // #endregion

  checkVoucher() {
    this.isVoucher = false;
    for (let i = 0; i < this.listVoucher.length; i++) {
      if (this.listVoucher[i].code == this.voucherForm.value.code) {
        this.voucherMoney += parseInt(this.listVoucher[i].money);
        this.voucherMsg = 'Mã trị giá: ' +
          this.listVoucher[i].money.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev;
          });
        this.update();
        this.listVoucher.splice(i, 1);
        this.isVoucher = true;
        console.log(this.voucherMoney);
        return;
      }
    }
    this.voucherMsg = 'Mã phiếu ưu đãi không tồn tại';
  }
}
