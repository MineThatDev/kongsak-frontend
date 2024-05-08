const state = {
  userInfo: {},
};

const getters = {
  userInfo: (state) => state.userInfo,
};

const mutations = {
  setUser(state, info) {
    state.userInfo = info;
  },
};

const actions = {
  logout({ commit }) {
    commit("setUser", {});
  },
  setUser({ commit }, info) {
    commit("setUser", info);
  },
};

export default { state, getters, mutations, actions };
