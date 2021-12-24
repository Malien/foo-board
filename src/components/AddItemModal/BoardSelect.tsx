import React from "react";
import { Board } from "../../board";
import Label from "../Label";

interface Props {
  boardId: number;
  onChange: (newBoardId: number) => void;
  boards: Board[];
}

export default function BoardSelect({ boardId, boards, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = Number.parseInt(e.target.value, 10);
    if (!Number.isNaN(newId)) onChange?.(newId);
  };
  return (
    <Label label="Board*">
      <select
        name="board"
        required
        value={boardId}
        onChange={handleChange}
        className="w-full outline-none px-4 py-2 [background:none] appearance-none cursor-pointer"
      >
        {boards.map(board => (
          <option key={board.id} value={board.id}>
            {board.name}
          </option>
        ))}
      </select>
    </Label>
  );
}
