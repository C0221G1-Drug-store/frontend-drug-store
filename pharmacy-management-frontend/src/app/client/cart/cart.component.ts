import {Component, OnInit} from '@angular/core';
import {CartService} from '../../service/cart.service';
import {Currency} from '../../model/cart/currency';
import {DrugCart} from "../../model/cart/drug-cart";

const CART_KEY = 'drug-cart-id';

//#region USD100 >> 100 USD
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {logger} from "codelyzer/util/logger";
import {HttpClient} from "@angular/common/http";

registerLocaleData(localeFr, 'fr');

// #endregion

declare let paypal: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  //#region DATA TEST
  listVoucher = [
    {id: 1, code: '1234567890', money: '100000'},
    {id: 2, code: '1234567891', money: '200000'},
    {id: 3, code: '1234567892', money: '150000'},
    {id: 4, code: '1234567893', money: '50000'},
  ];
  account = {
    accountName: "Khánh Phan",
    email: "khanhphan900@gmail.com"
  };
  // #endregion

  //#region CART
  drugCart!: DrugCart;
  drugCartListShow: DrugCart[] = [];
  moneyTotal = 0;
  moneyPayPal = 0;
  medicineTotal = 0;
  currency!: Currency;
  currencyDateNow = '';
  currencyMoney = 0;
  resultMsg = '';
  deleteId: number;
  deleteInfo = '';
  moneyPayVN = 0;
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
        this.drugCartListShow = [];
        localStorage.removeItem(CART_KEY);
        this.showMessageSuccess();
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
              private fb: FormBuilder,
              private toastrService: ToastrService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getDrugCartList();
    this.postTotalCartLocalStorage();
  }

  postTotalCartLocalStorage() {

  }

  getDrugCartList() {
    this.resultMsg = '';
    let data = JSON.parse(localStorage.getItem(CART_KEY));
    if (data == null) {
      return;
    }
    for (let i = 0; i < data.length; i++) {
      let count = data[i].count;
      this.cartService.findDrugCartById(data[i].drugId).subscribe(drug => {
        this.drugCart = {
          drugId: drug.drugId,
          drugName: drug.drugName,
          wholesalePrice: drug.wholesalePrice,
          drugAmount: drug.drugAmount,
          drugImageDetails: drug.drugImageDetails,
          count: data[i].count,
          price: drug.wholesalePrice * data[i].count,
        };
        this.drugCartListShow.push(this.drugCart);
      });
    }
  }


  //#region ADD + SUB + DEL + UPDATE
  sendDeleteId(i: number, info: string) {
    this.deleteId = i;
    this.deleteInfo = info;
  }

  medicineSub(i: number) {
    if (this.drugCartListShow[i].count > 0) {
      this.drugCartListShow[i].count--;
    }
    this.drugCartListShow[i].price = this.drugCartListShow[i].wholesalePrice * this.drugCartListShow[i].count;
    localStorage.setItem(CART_KEY, JSON.stringify(this.drugCart));
  }

  medicineAdd(i: number) {
    if (this.drugCartListShow[i].count >= this.drugCartListShow[i].drugAmount) {
      this.showMessageOutOfDrug();
      return;
    }
    this.drugCartListShow[i].count++;
    this.drugCartListShow[i].price = this.drugCartListShow[i].wholesalePrice * this.drugCartListShow[i].count;
    localStorage.setItem(CART_KEY, JSON.stringify(this.drugCartListShow));
  }

  delMedicine(i) {
    this.drugCartListShow.splice(i, 1);
    localStorage.setItem(CART_KEY, JSON.stringify(this.drugCartListShow));
    this.postTotalCartLocalStorage();
  }

  getTotal() {
    for (let i = 0; i < this.drugCartListShow.length; i++) {
      this.moneyTotal += this.drugCartListShow[i].price;
      this.medicineTotal += this.drugCartListShow[i].count;
      if (this.drugCartListShow[i].count === 0) {
        this.delMedicine(i);
      }
    }
    this.moneyPayVN = this.moneyTotal + 30000 - this.voucherMoney;
    if (this.moneyPayVN <0 ) {
      this.moneyPayVN = 0;
    }
    this.convertUsdCurrency(this.moneyPayVN);
  }

  update() {
    this.medicineTotal = 0;
    this.moneyTotal = 0;
    this.moneyPayPal = 0;
    this.getTotal();
    localStorage.setItem(CART_KEY, JSON.stringify(this.drugCartListShow));
    this.postTotalCartLocalStorage();
    if (!this.moneyTotal) {
      this.showMessageNotFound();
    }
    this.getPaypPal()
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
  getPaypPal(): void {
    if (!this.addScript && this.medicineTotal) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#myPaypalButton');
        this.paypalLoad = false;
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

  //#region Voucher
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

  // #endregion

  showMessageNotFound() {
    this.toastrService.error('Bạn chưa có sản phẩm trong giỏ hàng', 'Thông báo', {
      timeOut: 3000,
      progressBar: true,
    });
  }

  showMessageOutOfDrug() {
    this.toastrService.error('Thuốc đã hết hàng', 'Thông báo', {
      timeOut: 3000,
      progressBar: true,
    });
  }

  showMessageSuccess() {
    this.toastrService.success('Thanh toán thành công', 'Thông báo', {
      timeOut: 3000,
      progressBar: true,
    });
  }
}
