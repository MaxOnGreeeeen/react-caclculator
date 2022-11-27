import { HTMLInputTypeAttribute } from "react";

import c from "./textInput.module.scss";

interface IProps {
  onChange(value: string): void;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  disabled: boolean;
  className: string;
}

const TextInput = (props: IProps) => {
  const { onChange, placeholder, type, disabled, className } = props;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  const inputClassName = disabled
    ? `${c.input} ${c.input__disabled} ${className}`
    : `${c.input} ${className}`;

  return (
    <input
      type={type}
      onChange={onInputChange}
      placeholder={placeholder}
      className={inputClassName}
    />
  );
};

export default TextInput;
