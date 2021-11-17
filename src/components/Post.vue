<template class="posts rowd-flex justify-content-center">
  <div
    class="
      card
      bg-secondary
      col-12
      p-4
      my-2
      shadow
      d-flex
      justify-content-center
    "
    id="activvePost"
  >
    <button
      class="col-2 btn btn-primary"
      v-if="post.creator.id == account.id"
      @click="remove"
    >
      Delete
    </button>
    <router-link :to="{ name: 'Profile', params: { id: post.creator.id } }">
      <p>
        <img class="profileImg img-fluid p-2" :src="post.creator.picture" />
        {{ post.creator.name }}
      </p>
    </router-link>
    <p>{{ Date("post.createdAt") }}</p>
    <div class="d-flex justify-content-center">
      <img class="img-fluid imgLimit" :src="post.imgUrl" />
    </div>
    <h4>{{ post.body }}</h4>
    <!-- TODO need @click -->
    <button class="col-2">
      <i
        class="selectable mdi mdi-heart-outline"
        v-if="account.id"
        @click="like(post.likeIds.id)"
        >{{ post.likeIds.length }}</i
      >
      <i class="selectable mdi mdi-heart" v-else @click="like(post.id)">{{
        post.likeIds.length
      }}</i>
    </button>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import { computed } from "@vue/reactivity";
export default {
  //need to use an onclick, and the a useRouter() here!!!
  props: { post: { type: Object, required: true } },
  setup(props) {
    return {
      //TODO find arrary method to see if likeIds includes account Id
      liked: computed(() => {
        return AppState.posts.likeIds.includes(account.id);
      }),
      // liked: computed(() =>
      //   AppState.posts.find(m + m.id === props.post.likedIds.id)
      // ),
      //liked: computed(() => props.post.likeIds),
      profile: computed(() => AppState.profile),
      account: computed(() => AppState.account),
      // async getDate() {
      //   await postsService.getDate();
      // },

      async remove() {
        try {
          if (await Pop.confirm()) {
            await postsService.remove(props.post);
            //router.push({ name: "Post" });
          }
        } catch (error) {
          logger.error(error);
          Pop.toast("Failed to Delete", "error");
        }
      },
      async getAllLikes() {
        try {
          await postsService.getAllLikes();
        } catch (error) {}
      },
      async like(id) {
        try {
          await postsService.like(id);
        } catch (error) {
          logger.error(error);
        }
      },
    };
  },
};
</script>
<style>
.profileImg {
  border-radius: 50%;
  /* border: 1px solid #ddd; */
  width: 80px;
  height: 82px;
}
.profileImg:hover {
  box-shadow: 0 0 3px 1px rgba(2, 21, 27, 0.5);
}

.imgLimit {
  max-height: 50vh;
  max-width: 50vh;
}
</style>