import * as Dropdown from "@radix-ui/react-dropdown-menu";
import classNames from "classnames";
import { Board } from "../../board";
import Icon from "../Icon";

const itemClassName =
  "px-4 py-3 grid items-center [grid-template-columns:auto_1fr] gap-2 text-md " +
  "relative before:absolute before:inset-0 before:bg-emerald-600 " +
  "before:opacity-0 before:transition-opacity before:duration-200 " +
  "cursor-pointer hover:before:opacity-20 outline-none " +
  "first-of-type:before:rounded-t-xl last-of-type:before:rounded-b-xl " +
  "focus:before:opacity-40 active:before:opacity-50";

interface Props {
  rightBoard?: Board;
  leftBoard?: Board;
  onDelete?: () => void;
  onMove?: (toBoard: number) => void;
}

export default function CardDropdown({
  leftBoard,
  rightBoard,
  onDelete,
  onMove,
}: Props) {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger className="flex items-center">
        <Icon kind="more_horiz" />
      </Dropdown.Trigger>

      <Dropdown.Content
        loop
        side="right"
        className="bg-white rounded-xl overflow-hidden shadow-xl"
      >
        {leftBoard && (
          <Dropdown.Item
            onClick={onMove && (() => onMove(leftBoard.id))}
            className={itemClassName}
          >
            <Icon kind="keyboard_double_arrow_left" />
            Move to "{leftBoard.name}"
          </Dropdown.Item>
        )}
        {rightBoard && (
          <Dropdown.Item
            onClick={onMove && (() => onMove(rightBoard.id))}
            className={itemClassName}
          >
            <Icon kind="keyboard_double_arrow_right" />
            Move to "{rightBoard.name}"
          </Dropdown.Item>
        )}
        <Dropdown.Item onClick={onDelete} className={classNames(itemClassName)}>
          <Icon kind="delete" />
          Delete
        </Dropdown.Item>
        <Dropdown.Arrow
          className="fill-white z-10 -m-[2px]"
          width={20}
          height={10}
        />
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
