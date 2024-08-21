import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-enterprise-form',
  templateUrl: './enterprise-form.component.html',
  styleUrls: ['./enterprise-form.component.css', '../register-page.component.css']
})
export class EnterpriseFormComponent implements OnInit{

  passwordFieldType = 'password';
  enterpriseform: FormGroup;
  @Output() submitForm = new EventEmitter<FormGroup>();

  ngOnInit() {
    this.enterpriseform = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      company: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.pattern(/^(?:\+7|8)[\s-]?(\(?\d{3}\)?)[\s-]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})$/)]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]+$/)
      ]),
      privacyPolicy: new FormControl(null, [Validators.requiredTrue]),
      isFiz: new FormControl(false)
    })
  }

  OnSubmit(){
    this.submitForm.emit(this.enterpriseform);
  }

  togglePasswordVisibility(){
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  isInnCorrect(inn: string): boolean{
    // Если inn не содержит строку то сразу вернуть false
    if (typeof inn !== 'string') return false

    // Если 10-значный ИНН
    if (inn.match(/^\d{10}$/)) {
      // Вычислить сумму произведений цифр ИНН (с 1-й по 9-ю) на следующие коэффициенты — 2, 4, 10, 3, 5, 9, 4, 6, 8 (т.е. 2 * ИНН[1] + 4 * ИНН[2] + ...).
      const sum = [2, 4, 10, 3, 5, 9, 4, 6, 8].reduce((sum, current, i) => sum + current * Number(inn[i]), 0)

      // Вычислить остаток от деления полученной суммы на 11.
      // Сравнить младший разряд полученного остатка от деления с младшим разрядом ИНН. Если они равны, то ИНН верный.
      return (sum % 11) % 10 === Number(inn[9])
    }

    // Если 12-значный ИНН
    if (inn.match(/^\d{12}$/)) {
      // Вычислить 1-ю контрольную цифру:
      // Вычислить сумму произведений цифр ИНН (с 1-й по 10-ю) на следующие коэффициенты — 7, 2, 4, 10, 3, 5, 9, 4, 6, 8 (т.е. 7 * ИНН[1] + 2 * ИНН[2] + ...).
      const sum1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8].reduce((sum, current, i) => sum + current * Number(inn[i]), 0)

      // Вычислить 2-ю контрольную цифру:
      // Вычислить сумму произведений цифр ИНН (с 1-й по 11-ю) на следующие коэффициенты — 3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8 (т.е. 3 * ИНН[1] + 7 * ИНН[2] + ...).
      const sum2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8].reduce((sum, current, i) => sum + current * Number(inn[i]), 0)

      // Вычислить младший разряд остатка от деления полученных сумм на 11.
      // Сравнить 1-ю контрольную цифру с 11-й цифрой ИНН и сравнить 2-ю контрольную цифру с 12-й цифрой ИНН. Если они равны, то ИНН верный.
      return (sum1 % 11) % 10 === Number(inn[10]) && (sum2 % 11) % 10 === Number(inn[11])
    }

    // Во всех остальных ИНН некорректный
    return false
  }
}
