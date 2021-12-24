import classNames from "classnames";

interface Props {
  length: number;
  maxLength: number;
}

export default function CharRestrictionIndicator({ length, maxLength }: Props) {
  return (
    <div
      className={classNames(
        "absolute right-0 -bottom-5 text-sm px-1 text-emerald-800",
        "opacity-60 flex",
        { "text-rose-600 opacity-100": length > maxLength }
      )}
    >
      <div
        key={length}
        className={classNames(length > maxLength && "animation-pulse")}
      >
        {length}
      </div>
      /{maxLength}
    </div>
  );
}
