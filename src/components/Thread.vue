<template>
  <div class="thread row">
    <!-- only render this IF account.id (account having an id indicates someone is loggedin) -->
    <!-- <CreatePost v-if="account.id" /> -->
    <!-- <button class="btn btn-primary" @click="newer">Newer</button>
    <button class="btn btn-primary" @click="older">Older</button> -->
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
      // newer(){
      //  // score.value = false
      //  // name.value = true
      // }
      // older(){
      //   //score.value = true
      //   //name.value = false
      // }
    };
  },
};
</script>
<style class="">
</style>