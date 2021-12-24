import classNames from "classnames";

interface Props {
  kind: string;
  className?: string;
}

export default function Icon({ kind, className }: Props) {
  return <i className={classNames("material-icons", className)}>{kind}</i>;
}
