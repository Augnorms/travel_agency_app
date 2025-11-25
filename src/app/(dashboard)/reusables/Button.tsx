import React, { MouseEvent } from "react";
import {ButtonSpinner} from "@/app/(dashboard)/reusables/Spinner";

interface ButtonProps {
  variant?: "primary" | "secondary" | "with_border";
  logo?:string;
  disabled?: boolean;
  buttonLabel?: string;
  loading?: boolean;
  dataCy?: string;
  className?: string;
  buttonStyle?: React.CSSProperties;
   onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  disabled = false,
  buttonLabel = "",
  loading = false,
  dataCy = "",
  className = "",
  buttonStyle = {},
  onClick,
  logo,
}) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!disabled && onClick) {
      onClick();
    }
  };

  const classes = `button ${variant} ${disabled ? "disabled" : ""} ${className}`;

  return (
    <button
      style={buttonStyle}
      className={
        disabled === false
          ? `flex items-center justify-center gap-1 cursor-pointer ${classes}`
          : `flex items-center justify-center gap-1 cursor-not-allowed opacity-50 ${classes}`
      }
      onClick={handleClick}
      disabled={disabled}
      data-cy={dataCy}
    >
      {loading && <Loader />}
      {logo && <img className="mr-1" src={logo} alt={logo} />}
      {buttonLabel}
    </button>
  );
};

// Rest of the component remains the same...

const Loader: React.FC = () => {
  // Implement your loader component or replace it with your actual Loader component
  return <div><ButtonSpinner size={'small'}/></div>;
};

export default Button;
