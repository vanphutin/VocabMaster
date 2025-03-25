import React, { ReactNode } from "react";
import styles from "./styles/Button.module.scss";
import { Link } from "react-router-dom";

type ButtonType = {
  name: string;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  link?: string;
  size?: "small" | "large";
  variant?: "primary" | "secondary" | "outline" | "login" | "register";
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
};

const Button: React.FC<ButtonType> = ({
  name,
  type = "button",
  link,
  size,
  variant,
  disabled,
  className,
  icon,
  onClick,
  isLoading,
}) => {
  const buttonClass = `${styles.button} ${variant ? styles[variant] : ""} ${
    size ? styles[size] : ""
  } ${className || ""}`;

  return link ? (
    <Link to={link} className={buttonClass}>
      <span>{icon}</span>
      {name}
    </Link>
  ) : (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      aria-label={name}
      onClick={onClick}
    >
      {icon && (
        <span className={isLoading ? styles["loading_icon"] : styles.icon}>
          {icon}
        </span>
      )}
      {name}
    </button>
  );
};

export default Button;
