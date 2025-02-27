import React from "react";
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
};

const Button: React.FC<ButtonType> = ({
  name,
  type = "button",
  link,
  size,
  variant,
  className,
}) => {
  const buttonClass = `${styles.button} ${variant ? styles[variant] : ""} ${
    size ? styles[size] : ""
  } ${className || ""}`;

  return link ? (
    <Link to={link} className={buttonClass}>
      {name}
    </Link>
  ) : (
    <button type={type} className={buttonClass}>
      {name}
    </button>
  );
};

export default Button;
