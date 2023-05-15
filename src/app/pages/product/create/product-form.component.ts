import {Component, OnDestroy, OnInit} from '@angular/core';
import {IncomeType} from "../../income/model/income.type";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ProductService} from "../product.service";
import {ProductType} from "./model/product.type";
import {Subscription} from "rxjs";
import {NotificationService} from "../../../../components/notification/notification.service";
import {ProductFormGroup} from "./model/product.form";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['../../../../shared/form.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy  {

  public incomes: Array<string> = Object.keys(IncomeType);
  public products: Array<string> = Object.keys(ProductType);
  public form: FormGroup = ProductFormGroup;

  public pubSub: Subscription | undefined;

  constructor(private productService: ProductService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  public ngOnInit(): void { }

  public save(): void {
    this.pubSub = this.productService.upsert(this.form.value)
      .subscribe(() => {
        this.router.navigate(['/home']).then();
      }, () => {
        this.notificationService.showError('new');
      });
  }

  public ngOnDestroy() {
    this.pubSub?.unsubscribe();
  }

}
