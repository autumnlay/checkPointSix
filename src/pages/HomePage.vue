<template>
  <div class="home container-fluid">
    <Thread />
  </div>
</template>

<script>
  import { onMounted } from "@vue/runtime-core";
  import { logger } from "../utils/Logger";
  import Pop from "../utils/Pop";
  import { postsService } from "../services/PostsService";


  export default {
    name: "Home",
    setup() {
      onMounted(async () => {
        try {
          await postsService.getAll()
        } catch (error) {
          logger.error(error);
          Pop
        }
      })
    }
  }
</script>

<style scoped lang="scss">

</style>