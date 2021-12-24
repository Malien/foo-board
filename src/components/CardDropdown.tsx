import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { Board } from "../board";
import Icon from "./Icon";

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

      <Dropdown.Content>
        {leftBoard && (
          <Dropdown.Item onClick={onMove && (() => onMove(leftBoard.id))}>
            <Icon kind="keyboard_double_arrow_left" />
            Move to "{leftBoard.name}"
          </Dropdown.Item>
        )}
        {rightBoard && (
          <Dropdown.Item onClick={onMove && (() => onMove(rightBoard.id))}>
            <Icon kind="keyboard_double_arrow_right" />
            Move to "{rightBoard.name}"
          </Dropdown.Item>
        )}
        <Dropdown.Separator />
        <Dropdown.Item onClick={onDelete}>
          <Icon kind="delete" />
          Delete
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
