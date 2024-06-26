import CustomRouter from "../customRouter.js";

import sessionsRouter from "./sessions.router.api.js";
import usersRouter from "./users.router.api.js";
import productsRouter from "./products.router.api.js";
import ordersRouter from "./orders.router.api.js";
import paymentsRouter from "./payments.router.api.js";
import ticketsRouter from "./tickets.router.api.js";
import loggersRouter from "./loggers.router.api.js";

class Router extends CustomRouter {
  init() {
    this.use("/products", productsRouter);
    this.use("/users", usersRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/orders", ordersRouter);
    this.use("/payments", paymentsRouter);
    this.use("/tickets", ticketsRouter);
    this.use("/loggers", loggersRouter);
  }
}

const apiRouter = new Router().getRouter();
export default apiRouter;
