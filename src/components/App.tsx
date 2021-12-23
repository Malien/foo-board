import { useState } from "react";
import { Map } from "immutable";
import { Board, Card } from "../board";
import Boards from "./Boards";
import Header from "./Header";

const initialCards: Map<number, Card> = Map([
  [
    1,
    {
      id: 1,
      order: 0,
      title: "Welcome",
      description: "Welcome to the FooBoard web application",
      boardId: 1,
    },
  ],
  [
    2,
    {
      id: 2,
      order: 1,
      title: "Add new card",
      description:
        'To add new card just press "Add new item" button at the' +
        "top-right corner of the page",
      boardId: 1,
    },
  ],
]);

const initialBoards: Board[] = [
  { id: 1, name: "To Do" },
  { id: 2, name: "In progress" },
  { id: 3, name: "Done" },
];

function App() {
  const [boards, setBoards] = useState(initialBoards);
  const [cards, setCards] = useState(initialCards);

  return (
    <div className="text-emerald-800">
      <Header />
      <main className="max-w-screen-xl m-auto">
        <Boards boards={boards} cards={cards} onChange={setCards} />
      </main>
    </div>
  );
}

export default App;
