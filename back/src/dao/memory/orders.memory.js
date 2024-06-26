class OrdersManager {
  static #orders = [];

  async create(data) {
    try {
      const propsList = ["pId", "uId", "quantity", "state"];
      const keyList = Object.keys(data);

      const missingProps = [];

      for (let i = 0; i < propsList.length; i++) {
        !keyList.includes(propsList[i])
          ? missingProps.push(propsList[i])
          : null;
      }

      if (missingProps.length) {
        return `Propiedades faltantes: ${missingProps.join()}`;
      } else {
        OrdersManager.#orders.push(data);

        const lastOrder = OrdersManager.#orders[OrdersManager.#orders - 1];

        return OrdersManager.#orders[lastOrder];
      }
    } catch (e) {
      throw e;
    }
  }

  async read() {
    try {
      return OrdersManager.#orders;
    } catch (e) {
      throw e;
    }
  }

  async readByUser(uId) {
    try {
      return OrdersManager.#orders.filter((el) => el.uId == uId);
    } catch (e) {
      throw e;
    }
  }

  async update(oId, quantity, state) {
    try {
      const orders = OrdersManager.#orders;

      const indexOrder = orders.findIndex((obj) => obj.id == oId);

      const searchedOrder = orders[indexOrder];
      if (!searchedOrder) return null;

      if (quantity) orders[indexOrder] = { ...orders[indexOrder], quantity };

      if (state) orders[indexOrder] = { ...orders[indexOrder], state };

      return true;
    } catch (e) {
      throw e;
    }
  }

  async destroy(oId) {
    try {
      const orders = await this.read();
      const newList = orders.filter((el) => el.id !== oId);

      if (orders.length == newList.length) return null;

      OrdersManager.#orders = newList;

      return true;
    } catch (e) {
      throw e;
    }
  }
}

const orders = new OrdersManager();
export default orders;

