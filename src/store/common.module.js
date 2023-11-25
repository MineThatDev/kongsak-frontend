const state = {
  currentPage: "",
  breadCrumbs: [],
};

const getters = {
  currentPage: (state) => state.currentPage,
  breadCrumbs: (state) => state.breadCrumbs,
};

const mutations = {
  setCurrentPage(state, page) {
    state.currentPage = page;
  },
  setBreadCrumbs(state, pages) {
    state.breadCrumbs = pages;
  },
};

const actions = {
  updateCurrentPage({ commit }, page) {
    commit("setCurrentPage", page);
  },
  updateBreadCrumbs({ commit }, pages) {
    commit("setBreadCrumbs", pages);
  },
  clearBreadCrumbs({commit}) {
    commit("setBreadCrumbs", [])
  }
};

export default { state, getters, mutations, actions };
