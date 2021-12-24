import classNames from "classnames";
import { ReactNode } from "react";

interface Props {
  label: string;
  children?: ReactNode;
  className?: string;
  invalid?: boolean;
}

export default function Label({ label, children, className, invalid }: Props) {
  return (
    <label
      className={classNames(
        invalid && "before:border-rose-600 before:opacity-70",
        !invalid && "before:opacity-30",
        "relative my-4 flex before:border-2 before:border-emerald-800",
        "before:rounded-lg before:absolute before:inset-0",
        "before:pointer-events-none before:duration-200",
        "before:transition-opacity before:ease-in hover:before:opacity-70",
        "focus-within:before:opacity-100 focus-within:hover:before:opacity-100",
        className
      )}
    >
      <div
        className="absolute bg-white top-[-10px] left-2 text-sm font-semibold
          px-1"
      >
        {label}
      </div>
      {children}
    </label>
  );
}
