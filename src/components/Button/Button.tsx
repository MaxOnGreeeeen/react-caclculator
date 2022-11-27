import { HTMLAttributes } from "react";
import { ButtonTypes } from "shared/enums/ButtonTypes";

import c from "./button.module.scss";

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  onClick(): void;
  children?: string;
  disabled?: boolean;
  type?: ButtonTypes;
  className?: string;
}

const Button = (props: IProps) => {
  const { onClick, children, disabled, type, className } = props;

  const buttonClassName = (): string => {
    switch (type) {
      case ButtonTypes.Rounded:
        return `${c.button} ${c.button__rounded} ${className}`;

      default:
        return c.button;
    }
  };
  return (
    <button type="button" disabled={disabled} onClick={onClick} className={buttonClassName()}>
      {children}
    </button>
  );
};

export default Button;
