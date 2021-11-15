<template>
  <div class="profile container-fluid text-center">
    <div class="row">
      <div class="col-4 bg-primary elevation-2 ms-2">
        <button
          class="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#profileModal"
        >
          <i class="mdi mdi-pencil"></i>
          <!-- <ProfileModal /> -->
        </button>
        <img :src="profile.coverImg" alt="" />
        profile stuff here
        <h1>{{ profile.name }}</h1>
        <img class="rounded" :src="profile.picture" alt="" />
        <p>{{ profile.email }}</p>
        <div>{{ profile.bio }}</div>
        <div>I Have Graduated: {{ profile.graduated }}</div>
      </div>
    </div>
    <CreatePost v-if="account.id == profile.id" />
    <Thread />
  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../AppState";
import { onMounted, watchEffect } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { profilesService } from "../services/ProfilesService";
import { useRoute } from "vue-router";
import { postsService } from "../services/PostsService";
import ProfileModal from "../components/ProfileModal.vue";
export default {
  components: { ProfileModal },
  name: "Profile",
  setup() {
    const route = useRoute();
    watchEffect(async () => {
      try {
        if (route.name == "Profile") {
          await profilesService.getProfile(route.params.id);
          await postsService.getAll("?creatorId=" + route.params.id);
        }
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
    };
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>