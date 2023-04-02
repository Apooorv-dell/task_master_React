import React from "react";
import styled from "styled-components";




const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group mb-2">
      <label htmlFor={name}></label>
      <input
        placeholder={label}
        {...rest}
        id={name}
        name={name}
        className="form-control p-2  "
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
