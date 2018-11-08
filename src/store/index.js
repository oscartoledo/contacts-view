import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'
import axios from 'axios'

var apiUrl = process.env.BASE_URL

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: [],
    pagination: {
      totalPages: 0,
      totalElements: 0,
      elements: 0,
      offset: 0,
      pageNumber: 0,
      pageSize: 0
    }
  },
  actions: {
    LOAD_CONTACTS: ({
      commit
    }, {
      filter,
      pagination
    }) => {
      let nameFilter = filter.name.replace(' ', '_')
      axios.get(`${apiUrl}/contacts?search=name:*${nameFilter}*&page=${pagination.page}&size=${pagination.size}`)
        .then(response => {
          commit('ADD_CONTACTS', {
            contacts: response.data.content
          })
          commit('SET_PAGINATION', {
            totalPages: response.data.totalPages,
            totalElements: response.data.totalElements,
            elements: response.data.numberOfElements,
            pageable: response.data.pageable
          })
        })
    }
  },
  mutations: {
    ADD_CONTACTS: (state, {
      contacts
    }) => {
      state.contacts = contacts
    },
    SET_PAGINATION: (state, {
      totalPages,
      totalElements,
      elements,
      pageable
    }) => {
      state.pagination.totalPages = totalPages
      state.pagination.totalElements = totalElements
      state.pagination.elements = elements
      state.pagination.offset = pageable.offset
      state.pagination.pageNumber = pageable.pageNumber
      state.pagination.pageSize = pageable.pageSize
    }
  },
  getters: {
    getContacts: state => {
      return state.contacts
    },
    getPagination: state => {
      return state.pagination
    }
  }
})
