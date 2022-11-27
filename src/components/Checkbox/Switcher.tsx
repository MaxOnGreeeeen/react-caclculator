import { ChangeEvent } from "react";

import c from "./switcher.module.scss";

interface IProps {
  id: string;
  onChange(checked: boolean): void;
  checked: boolean;
}

const Switcher = (props: IProps) => {
  const { checked, onChange, id } = props;

  const onToggleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.checked);
  };

  const sliderClassName = checked
    ? `${c.switch__slider} ${c.switch__slider__checked}`
    : c.switch__slider;

  return (
    <label className={c.switch} htmlFor={id}>
      <input
        id={id}
        onChange={onToggleChange}
        checked={checked}
        type="checkbox"
        className={c.switch__input}
      />
      <span className={sliderClassName} />
    </label>
  );
};

export default Switcher;
