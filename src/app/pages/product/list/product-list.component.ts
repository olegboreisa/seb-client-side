import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../../components/notification/notification.service";
import {ProductService} from "../product.service";
import {Subscription} from "rxjs";
import {ProductData} from "./model/product.data";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  public defaultPage: number = 1;
  public products: Array<ProductData> = [];

  public prodGetSub: Subscription | undefined;
  public prodDelSub: Subscription | undefined;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private productService: ProductService) {
  }

  public ngOnInit(): void {
    this.prodGetSub = this.productService.getAll()
      .subscribe((data) => {
        this.products = data;
      }, () => {
        this.router.navigate(['/home']).then();
        this.notificationService.showError('product');
      });
  }

  public back(): void {
    this.router.navigate(['/home']).then();
  }

  public edit(id: number): void {
    this.router.navigate([`/product/${id}`]).then();
  }

  public delete(id: number): void {
    this.prodDelSub = this.productService.delete(id)
      .subscribe(() => {
        this.products = this.products.filter(it => it.id != id);
      }, () => {
        this.router.navigate(['/home']).then();
        this.notificationService.showError('delete');
      });
  }

  public ngOnDestroy(): void {
    this.prodGetSub?.unsubscribe();
    this.prodDelSub?.unsubscribe();
  }

}
