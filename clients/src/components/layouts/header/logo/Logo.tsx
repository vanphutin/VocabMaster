import React from "react";
import logo from "../../../../assets/image/logo/logo-main.webp";
import style from "./_logo.module.scss";
const Logo: React.FC = () => {
  return (
    <div className={`logo ${style.logo}`}>
      <img
        src={logo}
        alt="vocabmaster"
        className={style.img_logo}
        height={50}
        width={50}
      />
      <p className={style.logo_name}>vocabmaster</p>
    </div>
  );
};

export default Logo;
