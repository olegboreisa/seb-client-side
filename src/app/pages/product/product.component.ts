import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "./product.service";
import {IncomeForm} from "../income/model/income.form";
import {IProduct} from "./model/i-product";
import {Subscription} from "rxjs";
import {NotificationService} from "../../../components/notification/notification.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  public defaultPage: number = 1;

  public form: IncomeForm | undefined | null;
  public products: Array<IProduct> = [];

  public prodSub: Subscription | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService,
              private productService: ProductService) {

    const form = localStorage.getItem('form');
    if (form) {
      this.form = JSON.parse(form);
    }
  }

  public ngOnInit(): void {
    if (this.form) {
      this.prodSub = this.productService.getApplicableProducts(this.form)
        .subscribe((data) => {
          this.products = data;
        }, () => {
          this.router.navigate(['/form']).then();
          this.notificationService.showError('product');
        });
    }
  }

  public back(): void {
    this.router.navigate(['/form']).then();
  }

  public ngOnDestroy(): void {
    this.prodSub?.unsubscribe();
  }

}
