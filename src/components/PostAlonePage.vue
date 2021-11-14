<template>
  <div class="post-details container-fluid">
    <div class="row mt-5">
      <div class="col text-center">
        <img :src="post.imgUrl" alt="" />
      </div>
      <div class="row mt-3 justify-content-center">
        <div class="col-md-8">
          <div class="bg-white rounded elevation-1 p-3">
            <h4>
              {{ post.title }} - {{ post.body }} - {{ post.creator.name }}
            </h4>
            <div class="d-flex align-items-center">
              <p class="m-0">
                <b>${{ post.title }}</b>
              </p>
            </div>
            <p>{{ post.description }}</p>
            <!-- adding the v-if prevents the content from trying to load before creator is defined -->
            <div class="user-tag d-flex align-items-center" v-if="post.creator">
              <img class="rounded-pill" :src="post.creator.imgUrl" alt="" />
              <p class="m-0 ps-3">{{ post.creator.name }}</p>
            </div>
            <!-- only render if the creatorId of the post is the person logged in -->
            <div
              v-if="post.creatorId === account.id"
              class="post-controls d-flex justify-content-end"
            >
              <!-- <button
                class="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#post-modal"
              >
                edit
              </button>
              <button class="btn btn-danger mx-3" @click="remove">
                delete
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- by passing the prop the post details should be filled in -->
  <CreatePost :post="post" />
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";
import Pop from "../utils/Pop";
export default {
  setup() {
    // NOTE the 'route' is the details object
    const route = useRoute();
    // NOTE the 'router' is the object with the functionality of the router
    const router = useRouter();
    onMounted(async () => {
      logger.log("post ID", route.params.id);
      try {
        // when this component loads get the id from the params and set that post as the active post
        await postsService.getById(route.params.id);
      } catch (error) {
        logger.error(error);
        Pop.toast("Could not get that post", "error");
        // change the route back to the main posts page
        router.push({ name: "Posts" });
      }
    });
    return {
      post: computed(() => AppState.activepost),
      postColor: computed(() => AppState.activepost.color || "#ffffff"),
      account: computed(() => AppState.account),

      async remove() {
        try {
          if (await Pop.confirm()) {
            await postsService.remove();
            // change the route back to the main posts page
            router.push({ name: "Posts" });
          }
        } catch (error) {
          logger.error(error);
          Pop.toast("Failed to Delete", "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.color-swatch {
  background-color: v-bind(carColor);
}

.user-tag {
  & img {
    height: 50px;
  }
}
</style>