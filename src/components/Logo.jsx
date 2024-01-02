import React from "react";

const Logo = ({ classVar, logo }) => {
  return (
    <div className="mx-6 px-4">
      <img src={logo} alt="logo" className={classVar} />
    </div>
  );
};

export default Logo;
