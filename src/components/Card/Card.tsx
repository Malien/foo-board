import { Draggable } from "react-beautiful-dnd";
import classNames from "classnames";
import { Board, Card as CardType } from "../../board";
import CardDropdown from "./CardDropdown";

interface Props {
  card: CardType;
  leftBoard?: Board;
  rightBoard?: Board;
  onDelete?: () => void;
  onMove?: (toBoard: number) => void;
}

export default function Card({
  card,
  leftBoard,
  rightBoard,
  onDelete,
  onMove,
}: Props) {
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
          <div
            className="px-2 py-1 text-white font-semibold flex 
              justify-between items-center"
          >
            {card.title}
            <CardDropdown
              leftBoard={leftBoard}
              rightBoard={rightBoard}
              onDelete={onDelete}
              onMove={onMove}
            />
          </div>
          {card.description && (
            <div className="bg-white px-2 py-1">{card.description}</div>
          )}
        </div>
      )}
    </Draggable>
  );
}
