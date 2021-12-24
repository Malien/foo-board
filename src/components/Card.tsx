import { Draggable } from "react-beautiful-dnd";
import classNames from "classnames";
import { Card as CardType } from "../board";

interface Props {
  card: CardType;
}

export default function Card({ card }: Props) {
  return (
    <Draggable draggableId={String(card.id)} index={card.order}>
      {(provided, snapshot) => (
        <div
          className={classNames(
            "bg-emerald-400 rounded-md overflow-hidden shadow-sm cursor-pointer",
            "mb-2 select-none",
            snapshot.isDragging && !snapshot.isDropAnimating && "opacity-60"
          )}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            transform: classNames(
              provided.draggableProps.style?.transform,
              snapshot.isDragging && !snapshot.isDropAnimating && "rotate(4deg)"
            ),
          }}
        >
          <div className="px-2 py-1 text-white font-semibold">{card.title}</div>
          <div className="bg-white px-2 py-1">{card.description}</div>
        </div>
      )}
    </Draggable>
  );
}
