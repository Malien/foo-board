import { Map } from "immutable";
import { DropResult } from "react-beautiful-dnd";
import { Card } from "./board";

export interface Reordering {
  cardId: number;
  source: {
    boardId: number;
    order: number;
  };
  destination: {
    boardId: number;
    order: number;
  };
}

export function toReordering({
  draggableId,
  source,
  destination,
}: DropResult): Reordering | undefined {
  if (!destination) return;
  const cardId = Number.parseInt(draggableId, 10);
  if (Number.isNaN(cardId)) return;
  const sourceBoardId = Number.parseInt(source.droppableId, 10);
  if (Number.isNaN(sourceBoardId)) return;
  const destinationBoardId = Number.parseInt(destination.droppableId, 10);
  if (Number.isNaN(destinationBoardId)) return;

  return {
    cardId,
    source: {
      boardId: sourceBoardId,
      order: source.index,
    },
    destination: {
      boardId: destinationBoardId,
      order: destination.index,
    },
  };
}

export function reorderInMemory(
  cards: Map<number, Card>,
  { destination, cardId, source }: Reordering
) {
  if (
    destination.boardId === source.boardId &&
    destination.order === source.order
  )
    return cards;

  return cards
    .map((card) => {
      let dx = 0
      if (card.boardId === source.boardId && card.order > source.order) {
        dx -= 1
      }
      if (
        card.boardId === destination.boardId &&
        card.order + dx >= destination.order
      ) {
        dx += 1
      }
      if (dx === 0) return card
      return { ...card, order: card.order + dx };
    })
    .update(cardId, (card) => {
      // Ooooh scarry. as any. But returning the same value the function was
      // called with will not change the map. The value function is called with if
      // there is no such key present is undefined, so returning value is the same
      // - undefined
      if (!card) return undefined as any;
      return {
        ...card,
        ...destination,
      };
    });
}
