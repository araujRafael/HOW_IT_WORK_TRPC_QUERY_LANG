import * as trpcExpress from "@trpc/server/adapters/express";
import { expressHandler } from "trpc-playground/handlers/express";
import express, { json } from "express";
import { routerTrpc } from "./router";

// Config
const PORT = 3000;
const ENDPOINT = "/trpc";
const PLAYGROUND_ENDPOINT = "/playground";

const runApp = async () => {
  const APP = express();
  // Middlewares
  APP.use(json());
  APP.use(
    ENDPOINT,
    trpcExpress.createExpressMiddleware({
      router: routerTrpc,
    })
  );

  // Routes
  // all time to implement new function you need use APP.use()
  APP.get("/", (req, res) => {
    res.json({
      message: "Hello World!",
    });
  });

  APP.use(
    PLAYGROUND_ENDPOINT,
    await expressHandler({
      trpcApiEndpoint: ENDPOINT,
      playgroundEndpoint: PLAYGROUND_ENDPOINT,
      router: routerTrpc,
    })
  );

  // RUN
  APP.listen(PORT, () => {
    console.log(`🔥 Server is Running:: http://localhost:${PORT} 🔥`);
    console.log(`RUN PLAYGROUND IN:: http://localhost:${PORT}/playground `);
  });
};
runApp();
