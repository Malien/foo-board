import { Droppable } from "react-beautiful-dnd";
import { Board as BoardType, Card as CardType } from "../board";
import Card from "./Card";

interface Props {
  board: BoardType;
  cards: CardType[];
}

export default function Board({ board, cards }: Props) {
  return (
    <div className="rounded-md bg-slate-300 flex flex-col">
      <div className="mx-2 my-1 font-medium">{board.name}</div>
      <Droppable droppableId={String(board.id)}>
        {(provided) => (
          <div
            className="h-full bg-slate-100 m-1.5 mt-0 rounded-md p-2 grid 
              auto-rows-min"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {cards.map((card) => (
              <Card key={String(card.id)} card={card} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
