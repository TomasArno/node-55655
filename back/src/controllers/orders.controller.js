import orders from "../services/orders.service.js";
import CustomError from "../utils/errors/customError.utils.js"
import errors from "../utils/errors/errorsLibrary.utils.js"

import addLog from "../utils/logs/addLog.utils.js"

class OrdersController {
  constructor() {
    // this.service = orders;
  }

  async create(req, res, next) {
    try {
      const data = await orders.create(req.body);

      addLog(req._user._id, "Orden creada")

      res.json({
        statusCode: 201,
        response: data,
      });
    } catch (e) {
      next(e);
    }
  }

  async report(req, res, next) {
    try {
      const { _id } = req._user;

      const user = await orders.report(_id);

      res.json({
        statusCode: 200,
        response: user,
      });
    } catch (e) {
      next(e);
    }
  }

  async read(req, res, next) {
    try {
      const { _id } = req._user;
      const { state, quantity, page, limit } = req.query;

      const filter = {};

      filter.userId = _id;
      if (state) filter.state = state;
      if (quantity) filter.quantity = quantity;

      const options = { page, limit };

      if (!page) options.page = 1;
      if (!limit) options.limit = 20;

      const userOrders = await orders.read({ filter, options });
      if (!userOrders?.docs.length) CustomError.new(errors.notFound)

      res.json({
        statusCode: 200,
        response: userOrders,
      });
    } catch (e) {
      next(e);
    }
  }

  async readOne(req, res, next) {
    try {
      const { _id } = req._user;
      const { orderId } = req.params;

      const userOrder = await orders.readOne(orderId);
      // if (userId = !id) CustomError.new(errors.forbidden)
      // if (!userOrders?.docs.length) CustomError.new(errors.notFound)

      res.json({
        statusCode: 200,
        response: userOrder,
      });
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { orderId } = req.params;

      const modifiedOrder = await orders.update(orderId, req.body);
      if (!modifiedOrder) CustomError.new(errors.notFound)

      addLog(req._user._id, `Orden ${orderId} modificada`)

      res.json({
        statusCode: 200,
        response: "Updated Order",
      });
    } catch (e) {
      next(e);
    }
  }

  async destroy(req, res, next) {
    try {
      const { orderId } = req.params;

      const deletedOrder = await orders.destroy(orderId);
      if (!deletedOrder) CustomError.new(errors.notFound)

      addLog(req._user._id, `Orden ${orderId} eliminada`)

      res.json({
        statusCode: 200,
        response: "Deleted Order",
      });
    } catch (e) {
      next(e);
    }
  }
}

const ordersController = new OrdersController();

const { create, read, report, readOne, update, destroy } = ordersController;

export { create, read, report, readOne, update, destroy };
