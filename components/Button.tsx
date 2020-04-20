import * as React from "react";
import classNames from "classnames";

/**
 * Button
 */
const Button: React.FC<{
  title: string;
  onClick: () => any;
  className?: string;
}> = ({ title, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={classNames(
      "px-4 py-1 bg-blue-700 rounded text-white shadow hover:shadow-lg",
      className,
    )}
  >
    {title}
  </button>
);

export default Button;
