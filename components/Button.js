import * as React from "react";
import classNames from "classnames";

/**
 * Button
 */
const Button = ({ title, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={classNames(
      "px-4 py-1 bg-blue-700 rounded text-white",
      className,
    )}
  >
    {title}
  </button>
);

export default Button;
