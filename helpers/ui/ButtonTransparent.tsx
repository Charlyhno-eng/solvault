import React, { ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react";

export type ButtonTransparentProps = {
  children: React.ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function ButtonTransparentBase(
  { children, className = "", ...props }: ButtonTransparentProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      className={`
        px-4 py-2 text-sm font-medium text-white/90
        hover:text-white transition-all duration-200
        border border-white/20 rounded-lg backdrop-blur-sm
        hover:bg-white/5 whitespace-nowrap w-40 text-center
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

const ButtonTransparent = forwardRef<HTMLButtonElement, ButtonTransparentProps>(
  ButtonTransparentBase,
);

ButtonTransparent.displayName = "ButtonTransparent";

export default ButtonTransparent;
