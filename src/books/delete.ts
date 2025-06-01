import { z } from "zod";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import zodRouter, { ZodRouter } from "koa-zod-router";
import { book_collection } from "../database_access";
import { ObjectId } from "mongodb";

export default function delete_book(router: ZodRouter) {
  router.register({
    name: "delete a book",
    method: "delete",
    path: "/books/:id",
    validate: {
      params: z.object({
        id: z.string(),
      }),
    },
    handler: async (ctx, next) => {
      const id = ctx.request.params.id;
      const objectId = ObjectId.createFromHexString(id);
      const result = await book_collection.deleteOne({
        _id: { $eq: objectId },
      });
      if (result.deletedCount == 1) {
        ctx.body = {};
      } else {
        ctx.statusCode = 404;
      }
      await next();
    },
  });
}
