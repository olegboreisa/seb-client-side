import {ProductType} from "../../create/model/product.type";
import {IncomeType} from "../../../income/model/income.type";

export interface ProductData {
  id: number;
  name: string;
  product: ProductType;
  validFrom: number;
  student: boolean;
  income: IncomeType;
}
