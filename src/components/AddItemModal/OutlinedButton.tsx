import classNames from "classnames";
import { ReactNode } from "react";

interface Props {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}

export default function OutlinedButton({
  type = "button",
  onClick,
  children,
  className,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        "text-lg px-4 py-1 relative before:pointer-events-none before:absolute",
        "before:inset-0 before:bg-emerald-400 before:rounded-md",
        "before:opacity-0 before:transition-opacity before:duration-200",
        "hover:before:opacity-20 after:absolute after:pointer-events-none",
        "after:inset-0 after:border-2 after:border-emerald-800",
        "after:rounded-md after:opacity-30 after:transition-opacity",
        "after:duration-200 hover:after:opacity-40 active:before:opacity-40",
        "focus:before:opacity-20 font-medium focus:after:opacity-80",
        "active:after:opacity-100 outline-none",
        className
      )}
    >
      {children}
    </button>
  );
}
