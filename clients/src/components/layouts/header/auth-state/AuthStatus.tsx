import React, { JSX } from "react";
import Button from "../../../common/Button";

const AuthStatus = (): JSX.Element => {
  const isLoggedIn: boolean = false;
  return (
    <div>
      {isLoggedIn ? (
        <p className="text-end">Welcome, User</p>
      ) : (
        <>
          <Button link="/login" name="Login" className="" variant="login" />
          <Button
            link="/register"
            name="Get started for free"
            className=""
            variant="register"
          />
        </>
      )}
    </div>
  );
};

export default AuthStatus;
