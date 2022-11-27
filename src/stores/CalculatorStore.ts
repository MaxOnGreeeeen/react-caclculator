/* eslint-disable operator-linebreak */
import { makeAutoObservable } from "mobx";
import { ArifmeticOperations } from "shared/consts/arifmeticOperations";

import CalculatorUtils from "shared/helpers/CaclulatorUtils";

class CalculatorStore {
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  public resultExpression = "0";

  public expression = "0";

  public blocked = true;

  public changeValue(value: string): void {
    const parsedValue = CalculatorUtils.matchValue(value);
    const validationResult = CalculatorUtils.validateOperation(this.resultExpression, parsedValue);

    if (this.expression.charAt(this.expression.length - 1) === parsedValue && parsedValue === "-") {
      this.expression = `${this.expression.slice(0, -1)}+`;
      this.resultExpression = `${this.expression.slice(0, -1)}+`;

      return;
    }

    if (this.checkSignChangeCondition(parsedValue)) {
      this.expression = `${this.expression.slice(0, -1)}${parsedValue}`;
      this.resultExpression = `${this.expression.slice(0, -1)}${parsedValue}`;

      return;
    }

    if (this.blocked && ArifmeticOperations.includes(value)) {
      this.blocked = false;
      this.expression += value;
      this.resultExpression += parsedValue;
    } else if (this.blocked && !ArifmeticOperations.includes(value)) {
      this.blocked = false;
      this.expression = value;
      this.resultExpression = parsedValue;
    } else if (validationResult) {
      this.expression += value;
      this.resultExpression += parsedValue;
    }
  }

  public reset(): void {
    this.blocked = true;
    this.expression = "0";
    this.resultExpression = "0";
  }

  public clearOneSymbol(): void {
    if (this.expression.length > 1 && this.expression !== "0") {
      this.expression = this.expression.slice(0, this.expression.length - 1);
      this.resultExpression = this.resultExpression.slice(0, this.resultExpression.length - 1);
    }

    if (this.expression.length === 1 && this.expression !== "0") {
      this.expression = "0";
      this.resultExpression = "0";
    }
  }

  public calculateExpression(): void {
    const validationResult = CalculatorUtils.validateCalculatedExpression(this.resultExpression);

    if (!validationResult) {
      this.expression = "Error";
    }

    if (validationResult) {
      try {
        const calculationResult = CalculatorUtils.calculateExpression(this.resultExpression);
        this.expression = calculationResult;
        this.resultExpression = calculationResult;
      } catch (e: Error | unknown) {
        if (e instanceof Error) {
          // eslint-disable-next-line no-alert
          alert(e.message);
          this.expression = "Error";
        }
      } finally {
        this.blocked = true;
      }
    }
  }

  private checkSignChangeCondition(value: string): boolean {
    const mulDivCondition =
      (this.resultExpression.charAt(this.resultExpression.length - 1) === "*" && value === "/") ||
      (this.resultExpression.charAt(this.resultExpression.length - 1) === "/" && value === "*");

    const incDecCondition =
      (this.resultExpression.charAt(this.resultExpression.length - 1) === "+" && value === "-") ||
      (this.resultExpression.charAt(this.resultExpression.length - 1) === "-" && value === "+");

    return mulDivCondition || incDecCondition;
  }
}

export default new CalculatorStore();
