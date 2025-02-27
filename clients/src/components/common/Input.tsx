import React, { JSX } from "react";

type InputType = {};

const Input = (): JSX.Element => {
  return (
    <>
      <label htmlFor="">lable</label>
      <input type="text" placeholder="search..." />
    </>
  );
};

export default Input;
