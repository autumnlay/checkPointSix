<template>
  <div class="thread row justify-content-center">
    <!-- only render this IF account.id (account having an id indicates someone is loggedin) -->
    <button
      class="btn btn-primary col-2 m-3"
      :disabled="!newer"
      @click="getPosts('newer')"
    >
      Newer
    </button>
    <button
      class="btn btn-primary col-2 m-3"
      :disabled="!older"
      @click="getPosts('older')"
    >
      Older
    </button>

    <div v-for="p in posts" :key="p.id" class="col-12">
      <Post :post="p" />
    </div>
  </div>
</template>
<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {
  setup() {
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      newer: computed(() => AppState.newer),
      older: computed(() => AppState.older),
      async getPosts(ref) {
        try {
          // pass the full url to the service to get the 'newer posts'
          await postsService.getAll("", AppState[ref]);
        } catch (error) {
          logger.log("Pagination error", error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>
<style class="">
</style>