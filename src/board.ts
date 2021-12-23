export interface Board {
    id: number;
    name: string;
}

export interface Card {
    id: number;
    order: number;
    title: string;
    description: string;
    boardId: number;
}

export const cmpOrder = (a: Card, b: Card) => a.order - b.order
