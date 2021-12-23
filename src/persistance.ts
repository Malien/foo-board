import { DBSchema, openDB } from "idb/with-async-ittr";
import { Board, Card } from "./board";
import { initialBoards, initialCards } from "./initialData";
import { Reordering } from "./reorder";

interface Schema extends DBSchema {
  boards: {
    key: number;
    value: Board;
  };
  cards: {
    key: number;
    value: Card & { toBePatched: number };
    indexes: {
      "toBePatched-boardId-order": [number, number, number];
    };
  };
}

const dbPromise = openDB<Schema>("tasks", 1, {
  upgrade(db) {
    const boardsStore = db.createObjectStore("boards", {
      autoIncrement: true,
      keyPath: "id",
    });
    const cardsStore = db.createObjectStore("cards", {
      autoIncrement: true,
      keyPath: "id",
    });
    cardsStore.createIndex(
      "toBePatched-boardId-order",
      ["toBePatched", "boardId", "order"],
      {
        // Unfortunately while updating card order, values temporarily can be in a
        // inconsistent state, due to iterative nature of updating values
        unique: false,
      }
    );

    initialBoards.map((board) => boardsStore.put(board));
    initialCards.map((card) => cardsStore.put({ ...card, toBePatched: 0 }));
  },
});

export async function retrieveData() {
  const db = await dbPromise;
  const tx = db.transaction(["boards", "cards"], "readonly", {
    durability: "relaxed",
  });
  const [boards, cards] = await Promise.all([
    tx.objectStore("boards").getAll(),
    tx.objectStore("cards").getAll(),
    tx.done,
  ]);
  return { boards, cards };
}

export async function reorder({ cardId, destination, source }: Reordering) {
  const db = await dbPromise;
  const tx = db.transaction("cards", "readwrite");

  const leftBehind = tx
    .objectStore("cards")
    .index("toBePatched-boardId-order")
    .iterate(
      IDBKeyRange.bound(
        [0, source.boardId, source.order],
        [0, source.boardId + 1, 0],
        true,
        true
      )
    );

  for await (const cursor of leftBehind) {
    const { value } = cursor;
    value.order -= 1;
    cursor.update(value);
  }

  const toBeSmudged = tx
    .objectStore("cards")
    .index("toBePatched-boardId-order")
    .iterate(
      IDBKeyRange.bound(
        [0, destination.boardId, destination.order],
        [0, destination.boardId + 1, 0],
        false,
        true
      )
    );

  for await (const cursor of toBeSmudged) {
    const { value } = cursor;
    // Iterating over index while updating it causes cursor to be stuck in an
    // infinite loop. So to avoid it, I'm marking values to be updated so they
    // are completely disjoint with the index range which I'm updating
    value.toBePatched = 1;
    cursor.update(value);
  }

  const toBePatched = tx
    .objectStore("cards")
    .index("toBePatched-boardId-order")
    .iterate(IDBKeyRange.lowerBound([1, 0, 0], false));

  for await (const cursor of toBePatched) {
    const { value } = cursor;
    value.toBePatched = 0;
    value.order += 1;
    cursor.update(value);
  }

  const cardCursor = await tx.objectStore("cards").openCursor(cardId);
  if (!cardCursor) throw new Error("Invalid card id passed");
  const card = cardCursor.value;
  card.boardId = destination.boardId;
  card.order = destination.order;
  cardCursor.update(card);

  await tx.done;
}
