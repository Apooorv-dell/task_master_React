import React from "react";






const SpaceInput = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-outline flex-fill">
      <label className="form-label" htmlFor={name}></label>
      <input
        placeholder={label}
        {...rest}
        id={name}
        name={name}
        className="form-control  "
      />
      {error && <div className="alert alert-danger p-2 mt-1  ">{error}</div>}
    </div>
  );
};

export default SpaceInput;
