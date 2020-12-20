import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    _baseUrl: 'https://api.jsdelivr.com/v1/jsdelivr/libraries?name=',
  },
  getters: {
      getApiUrl: state => {
          return state._baseUrl
      }
  }
})
