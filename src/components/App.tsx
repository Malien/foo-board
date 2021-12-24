import { useState } from "react";
import { Map } from "immutable";
import { Board, Card } from "../board";
import Boards from "./Boards";
import Header from "./Header";
import { Reordering, reorderInMemory } from "../reorder";
import AddItemModal, { CardTemplate } from "./AddItemModal/AddItemModal";

interface Props {
  initialCards: Card[];
  boards: Board[];
  persistance?: {
    reorder?: (reordering: Reordering) => void;
    addCard?: (newCard: Card) => void;
    removeCard?: (cardId: number) => void;
  };
}

function App({ initialCards, boards, persistance = {} }: Props) {
  const [cards, setCards] = useState(() =>
    Map(initialCards.map<[number, Card]>(card => [card.id, card]))
  );
  const [modalShown, setModalShown] = useState(false);

  const handleReordering = (reordering: Reordering) => {
    setCards(cards => reorderInMemory(cards, reordering));
    persistance.reorder?.(reordering);
  };

  const handleNewCard = ({ description, title, boardId }: CardTemplate) => {
    const id = (cards.keySeq().max() || 0) + 1;
    const order =
      (cards
        .valueSeq()
        .filter(_ => _.boardId === boardId)
        .map(_ => _.boardId)
        .max() || -1) + 1;
    const newCard = { id, order, title, description, boardId };
    persistance.addCard?.(newCard);
    setCards(cards.set(id, newCard));
    setModalShown(false);
  };

  const handleMove = (card: Card, toBoard: number) => {
    handleReordering({
      cardId: card.id,
      destination: { boardId: toBoard, order: 0 },
      source: { boardId: card.boardId, order: card.order },
    });
  };

  const handleDelete = (cardId: number) => {
    setCards(cards => cards.remove(cardId));
    persistance.removeCard?.(cardId);
  };

  return (
    <div className="text-emerald-800 min-h-screen">
      <Header onNewItem={() => setModalShown(true)} />
      <main className="max-w-screen-xl m-auto overflow-x-auto">
        <Boards
          boards={boards}
          cards={cards}
          onReorder={handleReordering}
          onMove={handleMove}
          onDelete={handleDelete}
        />
      </main>
      {modalShown && (
        <AddItemModal
          boards={boards}
          defaultBoardId={boards[0]!.id}
          onCreate={handleNewCard}
          onClose={() => setModalShown(false)}
        />
      )}
    </div>
  );
}

export default App;
