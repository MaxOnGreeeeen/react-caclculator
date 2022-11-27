import { makeAutoObservable } from "mobx";
import { themeKeyAttributeValue } from "shared/consts/theme";
import { ThemeVariants, ThemeVariantsType } from "shared/enums/ThemeVariants";

class ThemeStore {
  /**
   * Значение поля текущей темы
   */
  public currentThemeVal?: ThemeVariantsType;

  public switchChecked = false;

  constructor() {
    makeAutoObservable(this, undefined, {
      autoBind: true,
    });
    this.initValues();
  }

  private initValues(): void {
    this.currentThemeVal = ThemeVariants.Dark;
    document.body.setAttribute(themeKeyAttributeValue, this.currentThemeVal);
  }

  public changeTheme() {
    this.switchChecked = !this.switchChecked;

    const themeValue = this.currentThemeVal === ThemeVariants.Dark;
    this.currentThemeVal = themeValue ? ThemeVariants.Light : ThemeVariants.Dark;
    document.body.setAttribute(themeKeyAttributeValue, this.currentThemeVal);
  }
}

export default new ThemeStore();
