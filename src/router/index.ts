import * as trpc from "@trpc/server";
import { z } from "zod";

const users = [
  { id: 1, name: "rafael" },
  { id: 1, name: "gabriel" },
];

export const routerTrpc = trpc
  .router()
  // like GET => /users
  .query("get-users", {
    output: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    ),
    resolve() {
      return users;
    },
  })
  // like GET => /user/:id
  .query("get-user", {
    // input is a parameter
    input: z.object({
      id: z.number(),
    }),
    // to get id from input just call a paramter in resolve
    // req.input.id
    resolve(req) {
      return users.find((x) => x.id === req.input.id);
    },
  });
