export enum LexemeType {
  Plus = "plus",
  Minus = "minus",
  Mul = "multiple",
  Div = "division ",
  Number = "number",
  RightBracket = "rightBracket",
  LeftBracket = "leftBracket",
  EndOfExpression = "endOfExpression",
}

export interface Lexeme {
  readonly lexemType: LexemeType;

  readonly value: string;
}
