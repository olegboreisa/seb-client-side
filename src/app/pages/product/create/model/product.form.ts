import {IncomeType} from "../../../income/model/income.type";
import {ProductType} from "./product.type";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export interface ProductForm {
  id: number;
  name: string;
  product: ProductType;
  validFrom: number;
  student: boolean;
  income: IncomeType;
}

export const ProductFormGroup = new FormGroup({
  id: new FormControl(''),
  name: new FormControl('',
    Validators.compose([
      Validators.minLength(4),
      Validators.required]
  )),
  product: new FormControl('', Validators.required),
  validFrom: new FormControl(0, Validators.required),
  student: new FormControl('', Validators.required),
  income: new FormControl('', Validators.required)
});

