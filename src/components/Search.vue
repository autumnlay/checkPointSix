<template>
  <div class="search row px-5">
    <div class="col-12">
      <!-- NOTE submits searches when the form is submitted -->
      <form @submit.prevent="searchPosts" class="input-group">
        <!-- NOTE keypress submits on each keypress, ideally you don't want both of these on your search bar but can be helpful -->
        <input
          @keypress="searchPosts"
          v-model="searchText"
          class="form-control"
          placeholder="search posts"
          type="text"
          name=""
          id=""
        />
        <button class="btn btn-outline-primary">search</button>
      </form>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const searchText = ref("");
    return {
      searchText,
      async searchPosts() {
        try {
          await postsService.getAll("?query=" + searchText.value);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style scoped>
</style>
