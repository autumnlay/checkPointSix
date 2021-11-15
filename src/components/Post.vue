<template class="posts row">
  <div class="card col-10 p-4 my-2 shadow" id="activvePost">
    <button
      class="col-2 btn btn-primary"
      v-if="post.creator.id == account.id"
      @click="remove"
    >
      Delete
    </button>
    <router-link :to="{ name: 'Profile', params: { id: post.creator.id } }">
      <p>
        <img class="profileImg img-fluid p-1" :src="post.creator.picture" />
        {{ post.creator.name }}
      </p>
    </router-link>
    <img class="img-fluid" :src="post.imgUrl" />

    <h4>{{ post.body }}</h4>
    <div class="selectable mdi mdi-heart"></div>
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
  setup() {
    //const route = useRoute()
    // const router = useRouter();
    // return {
    //   activePost: computed(() => AppState.activePost),
    //   routeToProfile() {
    //     const postElem = document.getElementById("activvePost");
    //     Modal.getOrCreateInstance(postElem).toggle(),
    //       router.push({ name: "Profile" }, params: {id: AppState.activePost.creator.id})
    //   },
    //};
    return {
      // post: computed(() => AppState.activePost),
      profile: computed(() => AppState.profile),
      account: computed(() => AppState.account),
      async remove() {
        try {
          if (await Pop.confirm()) {
            await postsService.remove();
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
</style>