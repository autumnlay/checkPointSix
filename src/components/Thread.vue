<template>
  <div class="thread row">
    <!-- only render this IF account.id (account having an id indicates someone is loggedin) -->
    <!-- <CreatePost v-if="account.id" /> -->
    <div v-for="p in posts" :key="p.id" class="col-12">
      <Post :post="p" />
    </div>
  </div>
</template>
<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
export default {
  setup() {
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
    };
  },
};
</script>
<style class="">
</style>