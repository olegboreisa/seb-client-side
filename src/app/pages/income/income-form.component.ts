import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {IncomeType} from "./model/income.type";

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.scss']
})
export class IncomeFormComponent implements OnInit, OnDestroy {

  public incomes: Array<string> = Object.keys(IncomeType);
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router) {

    this.form = this.formBuilder.group(
      {
        age: ['', Validators.required],
        student: ['', Validators.required],
        income: ['', Validators.required]
      });
  }

  public ngOnInit(): void { }

  public getOffer(): void {
    localStorage.setItem('form', JSON.stringify(this.form.value));
    this.router.navigate(['/product']).then();
  }

  public back(): void {
    this.router.navigate(['/home']).then();
  }

  public ngOnDestroy() { }

}
