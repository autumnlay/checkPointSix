<template>
  <div class="profile container-fluid text-center">
    <div class="row">
      <div class="col-12 bg-primary elevation-2 p-2 my-2">
        <img :src="profile.coverImg" class="background imgPlace" />
        <h1>About Me:</h1>
        <img class="rounded" :src="profile.picture" alt="" />
        <h1>My name is {{ profile.name }}</h1>
        <p>My email is {{ profile.email }}</p>
        <div>{{ profile.bio }}</div>
        <div v-if="profile.graduated == true">I Have Graduated</div>
        <div v-else>I have not Graduated</div>
        <div>{{ profile.class }}</div>
        <i class="mdi mdi-github"></i>
        <i class="mdi mdi-linkedin"></i>
        <i class="mdi mdi-newspaper"></i>
        <!-- ProfileModal -->
        <div>
          <button
            class="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#profile-modal"
            v-if="account.id == profile.id"
            @click="editProfile"
          >
            <i class="mdi mdi-pencil">edit</i>
            <!-- <ProfileModal /> -->
          </button>
        </div>
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
    // const state = reactive({
    //   editProfile:
    // })
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
      async editProfile(profile) {
        await profilesService.editProfile(profile);
        return;
      },

      //method for the button for edit
    };
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
.imgPlace {
  width: 100vh;
}
</style>