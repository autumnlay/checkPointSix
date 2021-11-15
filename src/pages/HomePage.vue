<template>
  <div class="home container-fluid">
    <Search />
    <CreatePost v-if="account.id" />
    <Thread />
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";

export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await postsService.getAll();
      } catch (error) {
        logger.error(error);
        Pop;
      }
    });
    return {
      account: computed(() => AppState.account),
      //profile: computed(() => AppState.profile),
    };
  },
};
</script>

<style scoped lang="scss">
</style>