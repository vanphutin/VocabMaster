import React, { useState } from "react";
import RegisterBanner from "../components/register/banner/RegisterBanner";
import RegisterForm from "../components/register/form/RegisterForm";
import style from "../assets/pages/RegisterPage.module.scss";
import { User } from "../types/User";
import { register } from "../services/api-auth";
import { validateRegister } from "../utils/validate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [, setUser] = useState<User | null>(null);
  const [errors, setErrors] = useState<Partial<User>>({});
  const [isLoading, setIsloading] = useState<boolean>(false);
  const navigation = useNavigate();
  const clearError = (field: keyof User) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };
  const handleRegister = async (user: User) => {
    const validationErrors = validateRegister(user);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsloading(true);
      const res = await register(user);

      if (String(res.status) === "success") {
        navigation("/login");
        toast.success("Account registration successful ");
        setUser(Object(res.data));
      }

      setErrors({});
    } catch (error: any) {
      const mess = error.response.data.message;
      const field = error.response.data.message.split(" ")[0].toLowerCase();
      // Gán lỗi dựa trên field
      setErrors((prev) => ({
        ...prev,
        [field]: mess,
      }));
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div
      className={`border border-secondary rounded ${style["register"]} container`}
    >
      <div className="row">
        <div className="col text-center d-none d-sm-block">
          <RegisterBanner />
        </div>
        <div className="col text-center">
          <RegisterForm
            onRegister={handleRegister}
            error={errors}
            isLoading={isLoading}
            clearError={clearError}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
