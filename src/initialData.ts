import { Map } from "immutable";
import { Board, Card } from "./board";

export const initialCards: Map<number, Card> = Map(
  [
    {
      id: 1,
      order: 0,
      title: "Welcome",
      description: "Welcome to the FooBoard web application",
      boardId: 1,
    },
    {
      id: 2,
      order: 1,
      title: "Add new card",
      description:
        'To add new card just press "Add new item" button at the' +
        "top-right corner of the page",
      boardId: 1,
    },
    {
      id: 3,
      order: 0,
      title: "Dummy 1",
      description: "Surely a dummy",
      boardId: 2,
    },
    {
      id: 4,
      order: 1,
      title: "Dummy 2",
      description: "Surely a dummy",
      boardId: 2,
    },
    {
      id: 5,
      order: 2,
      title: "Dummy 3",
      description: "Surely a dummy",
      boardId: 2,
    },
    {
      id: 6,
      order: 3,
      title: "Dummy 4",
      description: "Surely a dummy",
      boardId: 2,
    },
  ].map<[number, Card]>((_) => [_.id, _])
);

export const initialBoards: Board[] = [
  { id: 1, name: "To Do" },
  { id: 2, name: "In progress" },
  { id: 3, name: "Done" },
];
