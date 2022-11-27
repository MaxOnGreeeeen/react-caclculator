import { Lexeme } from "shared/enums/OperatorTypes";

class LexemeBufferModel {
  private _position = 0;

  public lexemes: Lexeme[] = [];

  constructor(lexemes: Lexeme[]) {
    this.lexemes = lexemes;
  }

  public next(): Lexeme {
    return this.getElementByPosition(this._position++);
  }

  private getElementByPosition(position: number): Lexeme {
    return this.lexemes.find((_lexeme, number) => number === position)!;
  }

  public back(): void {
    this._position--;
  }

  public get position(): number {
    return this._position;
  }
}

export default LexemeBufferModel;
