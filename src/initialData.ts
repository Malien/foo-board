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
        'To add new card just press "Add new item" button at the top-right ' +
        "corner of the page",
      boardId: 1,
    },
    {
      id: 3,
      order: 2,
      title: "You don't even need to add descriptions!",
      description: "",
      boardId: 1,
    },
    {
      id: 4,
      order: 3,
      title: "Drag me!",
      description:
        "If you feel like you're ready to move to the next stage, just drag " +
        "this card to the other column. I'm even mobile friendly",
      boardId: 1,
    },
    {
      id: 5,
      order: 4,
      title: "Cleaning up",
      description:
        "Honestly, all of these cards I've added are pretty useless after " +
        "you've read them. So why not just delete them completely? Just press " +
        "on triple dots in the top right corner of this card, to see the option" +
        "to delete those pesky cards",
      boardId: 1,
    },
  ].map<[number, Card]>(_ => [_.id, _])
);

export const initialBoards: Board[] = [
  { id: 1, name: "To Do" },
  { id: 2, name: "In progress" },
  { id: 3, name: "Done" },
];
