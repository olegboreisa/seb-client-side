import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../../components/notification/notification.service";
import {ProductService} from "../product.service";
import {Subscription} from "rxjs";
import {ProductForm, ProductFormGroup} from "../create/model/product.form";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IncomeType} from "../../income/model/income.type";
import {ProductType} from "../create/model/product.type";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['../../../../shared/form.scss']

})
export class ProductEditComponent implements OnInit, OnDestroy {

  public id: number | undefined;
  public product: ProductForm | undefined;
  public incomes: Array<string> = Object.keys(IncomeType);
  public products: Array<string> = Object.keys(ProductType);

  public form: FormGroup = ProductFormGroup;

  public prodGetSub: Subscription | undefined;
  public prodEditSub: Subscription | undefined;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private productService: ProductService) {

    const pathId = this.route.snapshot.paramMap.get('id');
    if (pathId) {
      this.id = +pathId;
    }
  }

  public ngOnInit(): void {
    if (this.id) {
      this.prodGetSub = this.productService.getOne(this.id)
        .subscribe((data) => {
          this.setForm(data);
        }, () => {
          this.router.navigate(['/home']).then();
          this.notificationService.showError('edit');
        });
    } else {
      this.notificationService.showError('edit');
    }
  }

  private setForm(data: ProductForm): void {
    this.form.patchValue({
        id: data.id,
        name: data.name,
        product: data.product,
        validFrom: data.validFrom,
        student: data.student,
        income: data.income
      });
  }

  public back(): void {
    this.router.navigate(['/list']).then();
  }

  public update(): void {
    if (this.form) {
      this.prodEditSub = this.productService.upsert(this.form.value)
        .subscribe(() => {
          this.router.navigate(['/list']).then();
        }, () => {
          this.notificationService.showError('update');
        });
    } else {
      this.notificationService.showError('update');
    }
  }

  public ngOnDestroy(): void {
    this.prodGetSub?.unsubscribe();
    this.prodEditSub?.unsubscribe();
  }
}
