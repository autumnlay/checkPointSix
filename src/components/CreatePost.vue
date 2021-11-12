<template>
  <form @submit.prevent="createPost" class="p-3 m-2 card col-10">
    <div class="create-post row">
      <div>
        <label
          for="createForm"
          class="form-label"
          placeholder="Share what is happening"
          >Share What's Happening</label
        >
        <textarea
          class="form-control"
          id="createForm"
          rows="2"
          v-model="state.editable.body"
        ></textarea>
        <div class="col-md-8 mb-2">
          <label for="" class="form-label">insert an image</label>
          <input
            type="text"
            class="form-control"
            aria-describedby="helpId"
            v-model="state.editable.imgUrl"
          />
        </div>
        <div>
          <button
            type="submit"
            class="btn btn-primary d-flex justify-content-end"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  </form>
</template>


<script>
import { reactive } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const state = reactive({
      editable: {},
    });
    return {
      state,
      async createPost() {
        try {
          await postsService.create(state.editable);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>