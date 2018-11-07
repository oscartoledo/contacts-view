<template>
  <v-flex pt-3 pb-3 xl6 xs12s>
    <v-card color="cyan darken-2" class="white--text">
      <v-layout row wrap>
        <v-flex xs7>
          <v-card-title primary-title>
            <div>
              <div class="headline">{{name}}</div>
            </div>
          </v-card-title>
        </v-flex>
        <v-flex xs5>
          <v-img
            :src="pictureUrl"
            height="125px"
            contain></v-img>
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'contacts',
  mounted: function () {},
  props: {
    name: String,
    pictureUrl: String
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
  computed: {},
  methods: {},
  components: {}
}
</script>

<style>

</style>
