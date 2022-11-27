/* eslint-disable operator-linebreak */
import { Lexeme, LexemeType } from "shared/enums/OperatorTypes";
import LexemeBufferModel from "shared/models/LexemeBufferModel";

abstract class CalculatorUtils {
  public static calculateExpression(expression: string): string {
    const lexemes = this.analyzeString(expression);
    const lexemeBufferModel = new LexemeBufferModel(lexemes);

    return this.expression(lexemeBufferModel).toString();
  }

  private static parsedArifmeticOperationsValues = ["+", "-", "/", "*"];

  public static analyzeString(expression: string): Lexeme[] {
    const expressionLexemes: Lexeme[] = [];
    let position = 0;

    while (position < expression.length) {
      const currentValue = expression.charAt(position);

      switch (currentValue) {
        case "(":
          expressionLexemes.push({ lexemType: LexemeType.LeftBracket, value: currentValue });
          position++;
          break;

        case ")":
          expressionLexemes.push({ lexemType: LexemeType.RightBracket, value: currentValue });
          position++;
          break;

        case "*":
          expressionLexemes.push({ lexemType: LexemeType.Mul, value: currentValue });
          position++;
          break;

        case "/":
          expressionLexemes.push({ lexemType: LexemeType.Div, value: currentValue });
          position++;
          break;

        case "+":
          expressionLexemes.push({ lexemType: LexemeType.Plus, value: currentValue });
          position++;
          break;

        case "-":
          expressionLexemes.push({ lexemType: LexemeType.Minus, value: currentValue });
          position++;
          break;

        default:
          if (Number(currentValue) || Number(currentValue) === 0) {
            let stringOfNumberValues = "";

            while (true) {
              if (this.getTerminateCondition(position, expression)) {
                break;
              }

              stringOfNumberValues += expression.charAt(position);
              position++;
            }
            expressionLexemes.push({ lexemType: LexemeType.Number, value: stringOfNumberValues });
            break;
          } else {
            if (currentValue !== " ") {
              throw new Error(`Invalid token at position ${position}`);
            }
            position++;
          }
      }
    }

    expressionLexemes.push({
      value: "",
      lexemType: LexemeType.EndOfExpression,
    });

    return expressionLexemes;
  }

  private static getTerminateCondition(position: number, expression: string): boolean {
    return (
      position > expression.length ||
      (!Number(expression.charAt(position)) &&
        Number(expression.charAt(position)) !== 0 &&
        expression.charAt(position) !== ".")
    );
  }

  public static expression(lexemes: LexemeBufferModel): number {
    const lexeme = lexemes.next();

    if (lexeme.lexemType === LexemeType.EndOfExpression) {
      return 0;
    }

    lexemes.back();
    return this.incrementDecrement(lexemes);
  }

  public static incrementDecrement(lexemes: LexemeBufferModel): number {
    let value = this.mulDiv(lexemes);

    while (true) {
      const lexeme = lexemes.next();

      switch (lexeme.lexemType) {
        case LexemeType.Plus:
          value += this.mulDiv(lexemes);
          break;
        case LexemeType.Minus:
          value -= this.mulDiv(lexemes);
          break;

        default:
          lexemes.back();
          return value;
      }
    }
  }

  public static mulDiv(lexemes: LexemeBufferModel): number {
    let value = this.factor(lexemes);

    while (true) {
      const lexeme = lexemes.next();

      switch (lexeme.lexemType) {
        case LexemeType.Mul:
          value *= this.factor(lexemes);
          break;

        case LexemeType.Div:
          value /= this.factor(lexemes);
          break;

        default:
          lexemes.back();
          return value;
      }
    }
  }

  public static factor(lexemes: LexemeBufferModel): number {
    const lexeme: Lexeme = lexemes.next();
    switch (lexeme.lexemType) {
      case LexemeType.Number:
        return Number(lexeme.value);

      case LexemeType.LeftBracket:
        return this.incrementDecrement(lexemes);

      default:
        throw new Error("Invalid token");
    }
  }

  public static validateCalculatedExpression(value: string): boolean {
    const validateExpressionRegExp = /[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/;
    const validatedValue = value.match(validateExpressionRegExp);

    return validatedValue !== null;
  }

  public static validateOperation(value: string, newValue: string): boolean {
    const validateDoubleOperations =
      this.parsedArifmeticOperationsValues.includes(newValue) &&
      value.charAt(value.length - 1) === newValue;
    const validateDoubleDifferentOperations =
      this.parsedArifmeticOperationsValues.includes(newValue) &&
      this.parsedArifmeticOperationsValues.includes(value.charAt(value.length - 1));

    return !validateDoubleOperations && !validateDoubleDifferentOperations;
  }

  public static matchValue(value: string): string {
    switch (value) {
      case "×":
        return "*";

      case "÷":
        return "/";

      default:
        return value;
    }
  }
}

export default CalculatorUtils;
