import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../common/Input";
import style from "./RegisterForm.module.scss";
import Button from "../../common/Button";
import { FaApple, FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { User } from "../../../types/User";
import { validateRegister } from "../../../utils/validate";
import { toast } from "react-toastify";
import { LuLoaderCircle } from "react-icons/lu";

interface RegisterFormProps {
  onRegister: (user: User) => void;
  clearError: (field: keyof User) => void;
  error: Partial<User>;
  isLoading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegister,
  error,
  isLoading,
  clearError,
}) => {
  const [dataForm, setDataForm] = useState<User>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [eye, setEye] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<User>>({});

  const toggleEye = (): void => {
    setEye((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;

    setDataForm({ ...dataForm, [id]: value });
    setErrors((prev) => ({ ...prev, [id]: "" }));

    // Xóa lỗi từ props nếu có
    if (error[id as keyof User]) {
      clearError(id as keyof User);
    }
  };
  const displayError = (field: keyof User) => {
    return errors[field] || error[field];
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedToTerms(e.target.checked);
  };
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const validationErrors = validateRegister(dataForm);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    }
    if (!agreedToTerms) {
      toast.info("Please agree to Terms & Conditions before continuing");
      return;
    }

    onRegister(dataForm);
  };

  return (
    <div className={` ${style["register"]} register`}>
      <p className={` ${style["register_title"]}`}>Create an account</p>
      <span className={` ${style["register_account_exists"]} `}>
        Already have an account ? <Link to="/login">log in</Link>
      </span>

      <form
        onSubmit={handleSubmit}
        className={` ${style["register_form"]} register`}
      >
        <div
          className={`form-group  ${style["fullname"]} ${style["inputGroup"]}`}
        >
          <div className={` first-name me-auto bd-highlight `}>
            <Input
              id="firstname"
              autoFocus
              type="text"
              placeholder="First name"
              onChange={handleChange}
              error={!!displayError("firstname")}
              value={dataForm.firstname}
            />
            {displayError("firstname") && (
              <p className="error_field">
                <i>{displayError("firstname")}</i>
              </p>
            )}
          </div>
          <div className={`last-name bd-highlight ${style["distance"]}`}>
            <Input
              id="lastname"
              type="text"
              placeholder="Last name"
              onChange={handleChange}
              error={!!displayError("lastname")}
              value={dataForm.lastname}
            />
            {displayError("lastname") && (
              <p className="error_field">
                <i>{displayError("lastname")}</i>
              </p>
            )}
          </div>
        </div>
        <div className={` username `}>
          <Input
            id="username"
            type="text"
            placeholder="username"
            onChange={handleChange}
            error={!!displayError("username")}
            value={dataForm.username}
          />
          {displayError("username") && (
            <p className="error_field">
              <i>{displayError("username")}</i>
            </p>
          )}
        </div>
        <div className={`${style["inputGroup"]} email `}>
          <Input
            id="email"
            type="text"
            placeholder="email"
            onChange={handleChange}
            error={!!displayError("email")}
            value={dataForm.email}
          />
          {displayError("email") && (
            <p className="error_field">
              <i>{displayError("email")}</i>
            </p>
          )}
        </div>
        <div className={`${style["inputGroup"]} ${style["password"]}  `}>
          <Input
            id="password"
            type={eye ? "text" : "password"}
            placeholder="Enter your password"
            onChange={handleChange}
            error={!!displayError("password")}
            value={dataForm.password}
          />
          {displayError("password") && (
            <p className="error_field">
              <i>{displayError("password")}</i>
            </p>
          )}

          <div className={style["icon_hidden_password"]} onClick={toggleEye}>
            {eye ? <FaRegEyeSlash /> : <FaRegEye />}
          </div>
        </div>
        <label
          htmlFor="checkbox"
          className={`chkbox d-flex  ${style["inputGroup"]}`}
        >
          <Input
            id="checkbox"
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={agreedToTerms}
          />
          I agree to the Terms & Conditions
        </label>

        <div className={`${style["btn_group"]}`}>
          <Button
            name={isLoading ? "Creating account..." : "Create account"}
            className=""
            type="submit"
            variant="primary"
            disabled={isLoading || !agreedToTerms}
            isLoading={isLoading}
            icon={isLoading ? <LuLoaderCircle /> : ""}
          />
        </div>
      </form>
      <div className={style["social_login"]}>
        <p className={style["methods"]}>Or sign up with</p>
        <div className={style["btn_group"]}>
          <Button
            type="button"
            className={style["distance"]}
            variant="outline"
            name="Login with Google"
            icon={<FaGoogle size={15} />}
            onClick={() =>
              (window.location.href =
                "http://localhost:3000/api/v1/auth/google")
            }
          />
          <Button
            type="button"
            className={style["distance"]}
            variant="outline"
            name="Login with Apple"
            icon={<FaApple size={20} />}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
