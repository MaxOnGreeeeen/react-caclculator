import { HTMLAttributes } from "react";

import c from "./button.module.scss";

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  onClick(): void;
  children?: string;
  disabled?: boolean;
}

const Button = (props: IProps) => {
  const { onClick, children, disabled } = props;

  const onButtonClick = (): void => {
    onClick();
  };

  return (
    <button type="button" disabled={disabled} onClick={onButtonClick} className={c.button}>
      {children}
    </button>
  );
};

export default Button;
