import Button from "components/Button/Button";
import { observer } from "mobx-react-lite";
import ThemeStore from "stores/ThemeStore";

import { ButtonTypes } from "shared/enums/ButtonTypes";

import Switcher from "components/Checkbox/Switcher";

import c from "./calculator.module.scss";

const htmlForSwitcher = "htmlForSwitcher";

const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "00"];

const Calculator = () => {
  const onButtonClick = () => {
    console.log("click");
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
      </div>
      <div className={c.body}>
        <div className={c.body__wrapper}>
          <div className={c.body__container}>
            <div className={c.body__controls}>
              <Button type={ButtonTypes.Rounded} className={c.body__button} onClick={onButtonClick}>
                AC
              </Button>

              <Button type={ButtonTypes.Rounded} className={c.body__button} onClick={onButtonClick}>
                +/-
              </Button>

              <Button type={ButtonTypes.Rounded} className={c.body__button} onClick={onButtonClick}>
                %
              </Button>
            </div>
            <div className={c.body__buttons}>
              {buttons.map((button, key) => {
                return (
                  <Button type={ButtonTypes.Rounded} onClick={onButtonClick}>
                    {button}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className={`${c.body__container} ${c.body__container__side}`}>
            <div className={`${c.body__controls} ${c.body__controls__side}`}>
              <Button type={ButtonTypes.Rounded} className={c.body__button} onClick={onButtonClick}>
                ÷
              </Button>

              <Button type={ButtonTypes.Rounded} className={c.body__button} onClick={onButtonClick}>
                ×
              </Button>

              <Button type={ButtonTypes.Rounded} className={c.body__button} onClick={onButtonClick}>
                -
              </Button>

              <Button type={ButtonTypes.Rounded} className={c.body__button} onClick={onButtonClick}>
                +
              </Button>

              <Button type={ButtonTypes.Rounded} className={c.body__button} onClick={onButtonClick}>
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
