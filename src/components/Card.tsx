import { Draggable } from "react-beautiful-dnd";
import { Card as CardType } from "../board";

interface Props {
  card: CardType;
}

export default function Card({ card }: Props) {
  return (
    <Draggable draggableId={String(card.id)} index={card.order}>
      {(provided) => (
        <div
          className="bg-emerald-400 rounded-md overflow-hidden shadow-sm 
            cursor-pointer mb-2 select-none"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="px-2 py-1 text-white font-semibold">{card.title}</div>
          <div className="bg-white px-2 py-1">{card.description}</div>
        </div>
      )}
    </Draggable>
  );
}
