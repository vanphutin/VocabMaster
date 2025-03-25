import React, { useEffect, useRef } from "react";
import styles from "./styles/Input.module.scss";

type InputType = {
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  disabled?: boolean;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
  error?: boolean;
  autoFocus?: boolean;
  checked?: boolean;
};

const Input = React.memo(
  ({
    type,
    placeholder,
    disabled = false,
    id,
    value,
    onChange,
    label,
    className,
    error,
    autoFocus,
    checked,
  }: InputType) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [autoFocus]);
    return (
      <div
        className={`${styles.inputWrapper} ${className || ""} ${
          error ? styles.error : ""
        }`}
      >
        {label && <label htmlFor={id}>{label}</label>}
        <input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          id={id}
          ref={autoFocus ? inputRef : null}
          value={value}
          onChange={onChange}
          aria-invalid={error}
          aria-describedby={error ? `${id}-error` : undefined}
          autoFocus={autoFocus}
          checked={checked}
        />
      </div>
    );
  }
);

export default Input;
