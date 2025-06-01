import { z } from "zod";
import { book_collection } from "../database_access";
import { type Book } from "../../adapter/assignment-2";
import { ZodRouter } from "koa-zod-router";
import { Filter } from "mongodb";

export default function books_list(router: ZodRouter) {
  router.register({
    name: "list books",
    method: "get",
    path: "/books",
    validate: {
      query: z.object({
        filters: z
          .object({
            from: z.coerce.number().optional(),
            to: z.coerce.number().optional(),
            name: z.string().optional(),
            author: z.string().optional(),
          })
          .array()
          .optional(),
      }),
    },
    handler: async (ctx, next) => {
      const { filters } = ctx.request.query;

      const query =
        filters && filters.length > 0
          ? {
            $or: filters
            .map(({ from, to, name, author }) => {
              const andConditions: Filter<Book>[] = [];

              if (from !== undefined) {
                andConditions.push({ price: { $gte: from } });
              }

              if (to !== undefined) {
                andConditions.push({ price: { $lte: to } });
              }

              if (name !== undefined) {
                andConditions.push({ name: { $regex: new RegExp(name, "i") } });
              }

              if (author !== undefined) {
                andConditions.push({ author: { $regex: new RegExp(author, "i") } });
              }

              if (andConditions.length > 0) {
                return { $and: andConditions };
              } else {
                return null;
              }
            })
              .filter((value): value is { $and: Filter<Book>[] } => value !== null)

            }
          : {};

      const book_list = await book_collection
        .find(query)
        .map((document) => {
          const book: Book = {
            id: document._id.toHexString(),
            name: document.name,
            image: document.image,
            price: document.price,
            author: document.author,
            description: document.description,
          };
          return book;
        })
        .toArray();

      ctx.body = book_list;
      await next();
    },
  });
}
