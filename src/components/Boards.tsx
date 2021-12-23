import { useMemo } from "react";
import { Map } from "immutable";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Board as BoardType, Card, cmpOrder } from "../board";
import Board from "./Board";
import { Reordering, toReordering } from "../reorder";

interface Props {
  boards: BoardType[];
  cards: Map<number, Card>;
  onReorder?: (reordering: Reordering) => void;
}

function sorted<T>(iter: Iterable<T>, cmpFn?: (a: T, b: T) => number) {
  const arr = [...iter];
  arr.sort(cmpFn);
  return arr;
}

export default function Boards({ boards, cards, onReorder }: Props) {
  const handleDragEnd = (result: DropResult) => {
    const reordering = toReordering(result);
    reordering && onReorder?.(reordering);
  };

  const cardDistribution = useMemo(
    () =>
      cards
        .groupBy((_) => _.boardId)
        .map((collection) => sorted(collection.values(), cmpOrder))
        .toMap(),
    [cards]
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div
        className="p-4 grid grid-flow-col [grid-auto-columns:minmax(300px,1fr)] 
        gap-4 min-h-[360px] m-auto w-fit"
      >
        {boards.map((board) => (
          <Board
            key={String(board.id)}
            board={board}
            cards={cardDistribution.get(board.id) || []}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
