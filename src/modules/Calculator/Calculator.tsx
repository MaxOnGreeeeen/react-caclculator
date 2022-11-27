import { observer } from "mobx-react-lite";

import ThemeStore from "stores/ThemeStore";

import CalculatorStore from "stores/CalculatorStore";

import { ButtonTypes } from "shared/enums/ButtonTypes";

import {
  ArifmeticOperations,
  CalculatorButtons,
  Brackets,
} from "shared/consts/arifmeticOperations";

import { Switcher, Button } from "components";

import c from "./calculator.module.scss";

const htmlForSwitcher = "htmlForSwitcher";

const Calculator = () => {
  const onButtonClick = (value: string) => {
    CalculatorStore.changeValue(value);
  };

  return (
    <div className={c.calculator}>
      <div className={c.header}>
        <div className={c.header__controls}>
          <Switcher
            id={htmlForSwitcher}
            checked={ThemeStore.switchChecked}
            onChange={ThemeStore.changeTheme}
          />
        </div>

        <div className={c.header__result}>{CalculatorStore.expression}</div>
      </div>
      <div className={c.body}>
        <div className={c.body__wrapper}>
          <div className={c.body__container}>
            <div className={c.body__controls}>
              <Button
                type={ButtonTypes.Rounded}
                className={c.body__button}
                click={CalculatorStore.reset}
              >
                AC
              </Button>

              {Brackets.map((operation) => {
                return (
                  <Button
                    type={ButtonTypes.Rounded}
                    className={c.body__button}
                    click={onButtonClick}
                  >
                    {operation}
                  </Button>
                );
              })}
            </div>
            <div className={c.body__buttons}>
              {CalculatorButtons.map((button, index) => {
                return (
                  <Button key={index} type={ButtonTypes.Rounded} click={onButtonClick}>
                    {button}
                  </Button>
                );
              })}

              <Button type={ButtonTypes.Rounded} click={CalculatorStore.clearOneSymbol}>
                X
              </Button>
            </div>
          </div>

          <div className={`${c.body__container} ${c.body__container__side}`}>
            <div className={`${c.body__controls} ${c.body__controls__side}`}>
              {ArifmeticOperations.map((operation) => {
                return (
                  <Button
                    type={ButtonTypes.Rounded}
                    className={c.body__button}
                    click={onButtonClick}
                  >
                    {operation}
                  </Button>
                );
              })}
              <Button
                type={ButtonTypes.Rounded}
                className={c.body__button}
                click={CalculatorStore.calculateExpression}
              >
                =
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Calculator);
