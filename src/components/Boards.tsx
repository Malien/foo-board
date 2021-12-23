import { useMemo } from "react";
import { Map } from "immutable";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Board as BoardType, Card, cmpOrder } from "../board";
import Board from "./Board";

function sorted<T>(iter: Iterable<T>, cmpFn?: (a: T, b: T) => number) {
  const arr = [...iter];
  arr.sort(cmpFn);
  return arr;
}

function reorder(
  cards: Map<number, Card>,
  { destination, draggableId, source }: DropResult
) {
  if (!destination) return cards;
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return cards;

  const destinationDroppableId = Number.parseInt(destination.droppableId);
  const sourceDroppableId = Number.parseInt(source.droppableId);

  return cards
    .map((card) => {
      let dx = 0;
      if (card.boardId === sourceDroppableId && card.order > source.index) {
        return { ...card, order: card.order - 1 };
      }
      if (
        card.boardId === destinationDroppableId &&
        card.order >= destination.index
      ) {
        return { ...card, order: card.order + 1 };
      }
      return card;
    })
    .update(Number.parseInt(draggableId), (card) => {
      // Ooooh scarry. as any. But returning the same value the function was
      // called with will not change the map. The value function is called with if
      // there is no such key present is undefined, so returning value is the same
      // - undefined
      if (!card) return undefined as any;
      return {
        ...card,
        boardId: destinationDroppableId,
        order: destination.index,
      };
    });
}

interface Props {
  boards: BoardType[];
  cards: Map<number, Card>;
  onChange?: (cards: Map<number, Card>) => void;
}

export default function Boards({ boards, cards, onChange }: Props) {
  const handleDragEnd = (result: DropResult) => {
    if (!onChange) return;
    onChange(reorder(cards, result));
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
