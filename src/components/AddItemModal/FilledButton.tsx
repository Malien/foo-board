import classNames from "classnames";
import { ReactNode } from "react";

interface Props {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}

export default function FilledButton({
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
        "text-lg pl-4 pr-6 py-1 relative before:pointer-events-none",
        "before:absolute before:inset-0 before:bg-emerald-500",
        "before:rounded-md before:opacity-80 before:transition-opacity",
        "before:duration-200 hover:before:opacity-90 after:absolute",
        "after:pointer-events-none after:inset-0 after:border-2",
        "after:border-emerald-800 after:rounded-md after:opacity-30",
        "after:transition-opacity after:duration-200 hover:after:opacity-40",
        "active:before:opacity-100 focus:before:opacity-80",
        "focus:after:opacity-80 active:after:opacity-100 outline-none",
        "flex font-medium text-white",
        className
      )}
    >
      <div className="z-10 flex items-center">{children}</div>
    </button>
  );
}
