import React from "react";
import img from "../../../assets/image/register/image.png";
import style from "./RegisterBanner.module.scss";
import { GrFormNext } from "react-icons/gr";
import { Link } from "react-router-dom";

const RegisterBanner = () => {
  return (
    <div>
      <div className={style["banner-img"]}>
        <img
          src={img}
          alt="Image created by CHATGPT"
          className={style["img"]}
        />
        <div className={style["back-home"]}>
          <Link to="/">
            <span>
              Back to website <GrFormNext />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterBanner;
