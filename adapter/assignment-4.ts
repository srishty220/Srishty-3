import previous_assignment from "./assignment-3";

export type BookID = string;

export interface Book {
  id?: BookID;
  name: string;
  author: string;
  description: string;
  price: number;
  image: string;
  stock?: number;
}

export interface Filter {
  from?: number;
  to?: number;
  name?: string;
  author?: string;
}

// If multiple filters are provided, any book that matches at least one of them should be returned
// Within a single filter, a book would need to match all the given conditions
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function listBooks(filters?: Filter[]): Promise<Book[]> {
  throw new Error("Todo");
}

async function createOrUpdateBook(book: Book): Promise<BookID> {
  return await previous_assignment.createOrUpdateBook(book);
}

async function removeBook(book: BookID): Promise<void> {
  await previous_assignment.removeBook(book);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function lookupBookById(book: BookID): Promise<Book> {
  throw new Error("Todo");
}

export type ShelfId = string;
export type OrderId = string;

async function placeBooksOnShelf(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  bookId: BookID,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  numberOfBooks: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  shelf: ShelfId,
): Promise<void> {
  throw new Error("Todo");
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function orderBooks(order: BookID[]): Promise<{ orderId: OrderId }> {
  throw new Error("Todo");
}

async function findBookOnShelf(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  book: BookID,
): Promise<Array<{ shelf: ShelfId; count: number }>> {
  throw new Error("Todo");
}

async function fulfilOrder(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  order: OrderId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  booksFulfilled: Array<{
    book: BookID;
    shelf: ShelfId;
    numberOfBooks: number;
  }>,
): Promise<void> {
  throw new Error("Todo");
}

async function listOrders(): Promise<
  Array<{ orderId: OrderId; books: Record<BookID, number> }>
> {
  throw new Error("Todo");
}

const assignment = "assignment-4";

export default {
  assignment,
  createOrUpdateBook,
  removeBook,
  listBooks,
  placeBooksOnShelf,
  orderBooks,
  findBookOnShelf,
  fulfilOrder,
  listOrders,
  lookupBookById,
};
