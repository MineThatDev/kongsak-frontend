const state = {
  cart: [],
};

const getters = {
  cart: (state) => state.cart,
};

const mutations = {
  addItemToCart(state, item) {
    const isProductAdded = state.cart.some((product) => product.id === item.id);
    if (isProductAdded) {
      state.cart = state.cart.map((product) => {
        if (product.id === item.id) {
          const newQty = product.quantity + item.quantity;
          delete item["quantity"];
          return { quantity: newQty, ...item };
        } else {
          return item;
        }
      });
    } else {
      state.cart.push(item);
    }
  },
  removeItemInCart(state, id) {
    state.cart = state.cart.filter((item) => item.id !== id);
  },
  increaseQuantity(state, id) {
    state.cart = state.cart.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + 1;
        delete item["quantity"];
        return { quantity: newQty, ...item };
      } else {
        return item;
      }
    });
  },
  decreaseQuantity(state, id) {
    state.cart = state.cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        const newQty = item.quantity - 1;
        delete item["quantity"];
        return { quantity: newQty, ...item };
      } else {
        return item;
      }
    });
  },
  clearCart(state) {
    state.cart = [];
  }
};

const actions = {
  addItemToCart({ commit }, item) {
    commit("addItemToCart", item);
  },
  removeItemInCart({ commit }, id) {
    commit("removeItemInCart", id);
  },
  increaseQuantity({ commit }, id) {
    commit("increaseQuantity", id);
  },
  decreaseQuantity({ commit }, id) {
    commit("decreaseQuantity", id);
  },
  clearCart({ commit }) {
    commit("clearCart")
  }
};

export default { state, getters, mutations, actions };
