<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center >

          <v-toolbar color="indigo" dark>
              <v-toolbar-title>Search</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field 
                label="Type to search" 
                v-model="filter.name"
                @change="search"></v-text-field>
              <v-btn icon @click="search">
                <v-icon>search</v-icon>
              </v-btn>
          </v-toolbar>

          <v-flex class="text-xs-right" xs7 offset-xs5 offset-md2 offset-lg10 > 
            <v-subheader class="pl-0">Select page size</v-subheader>
            <v-slider
              v-model="pagination.size"
              :min="1"
              :always-dirty="true"
              thumb-label="always"></v-slider>
          </v-flex>

          <v-container fluid grid-list-lg>
            <contact
              v-for="contact in contacts"
              :key="contact.id"
              :name="contact.name"
              :pictureUrl="contact.pictureUrl">
            </contact>
            <v-divider light></v-divider>
            <div class="text-xs-right">
              <span class="grey--text">You are seeing {{ contactPagination.elements }} of {{ contactPagination.totalElements }}</span>
            </div>
          </v-container>

          <div class="text-xs-center">
            <v-pagination
              circle
              v-model="currentPage"
              :length="contactPagination.totalPages"
              :total-visible="7"
              @input="goTo">
            </v-pagination>
          </div>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Contact from './Contact'

export default {
  name: 'contacts-list',
  mounted: function () {
    this.$store.dispatch('LOAD_CONTACTS', {
      filter: this.filter,
      pagination: this.pagination
    })
  },
  data: function () {
    return {
      filter: {
        name: ''
      },
      pagination: {
        page: 0,
        size: 20
      }
    }
  },
  computed: {
    ...mapGetters({
      contacts: 'getContacts',
      contactPagination: 'getPagination'
    }),
    currentPage: {
      set: function () {
        return this.pagination.pagination - 1
      },
      get: function () {
        return this.contactPagination.pageNumber + 1
      }
    }
  },
  methods: {
    restartPage: function () {
      this.pagination.page = 0
    },
    goTo: function (page) {
      this.pagination.page = (page - 1)
      this.loadContacts()
    },
    search: function (name) {
      if (name instanceof String) this.filter.name = name
      this.restartPage()
      this.loadContacts()
    },
    loadContacts: function () {
      this.$store.dispatch('LOAD_CONTACTS', {
        filter: this.filter,
        pagination: this.pagination
      })
    }
  },
  components: {
    Contact
  }
}
</script>
