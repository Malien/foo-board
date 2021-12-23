import { useState } from "react";
import { Map } from "immutable";
import { Board, Card } from "../board";
import Boards from "./Boards";
import Header from "./Header";
import { Reordering, reorderInMemory } from "../reorder";

interface Props {
  initialCards: Card[];
  boards: Board[];
  persistReorder?: (reordering: Reordering) => void
}

function App({ initialCards, boards, persistReorder }: Props) {
  const [cards, setCards] = useState(() =>
    Map(initialCards.map<[number, Card]>((_) => [_.id, _]))
  );

  const handleReordering = (reordering: Reordering) => {
    setCards((cards) => reorderInMemory(cards, reordering));
    persistReorder?.(reordering)
  };

  return (
    <div className="text-emerald-800 min-h-screen">
      <Header />
      <main className="max-w-screen-xl m-auto overflow-x-auto">
        <Boards
          boards={boards}
          cards={cards}
          onReorder={handleReordering}
        />
      </main>
    </div>
  );
}

export default App;
