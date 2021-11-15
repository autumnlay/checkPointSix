<template>
  <ProfileModal id="ProfileModal">
    <template #modal-title class="bg-success">
      <h4>{{ profile.id ? "Edit" : "Create" }} Profile</h4>
    </template>
    <template #modal-body>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3 d-flex justify-content-between">
          <div>
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="name"
              aria-describedby="name"
              placeholder="name..."
              required
              v-model="editable.name"
            />
          </div>
          <div>
            <label for="graduation" class="form-label">graduation status</label>
            <input
              type="text"
              class="form-control"
              name="graduation"
              id="graduation"
              aria-describedby="graduation"
              placeholder="graduation..."
              required
              v-modal="editable.graduation"
            />
          </div>
        </div>

        <div class="mb-3">
          <div>
            <label for="CoverImgUrl" class="form-label">Cover Image Url</label>
            <input
              type="url"
              class="form-control"
              name="coverImgUrl"
              id="coverImgUrl"
              aria-describedby="coverImgUrl"
              placeholder="coverImage Url..."
              required
              v-model="editable.coverImg"
            />
          </div>
        </div>
        <div class="mb-3">
          <div>
            <label for="imgUrl" class="form-label">Profile Image Url</label>
            <input
              type="url"
              class="form-control"
              name="imgUrl"
              id="imgUrl"
              aria-describedby="imgUrl"
              placeholder="Image Url..."
              required
              v-model="editable.picture"
            />
          </div>
        </div>
        <div class="mb-3">
          <div>
            <label for="bio" class="form-label">Bio</label>
            <textarea
              type="text"
              class="form-control"
              name="bio"
              id="bio"
              aria-describedby="bio"
              placeholder="Bio..."
              min="5"
              max="250"
              required
              v-model="editable.bio"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" class="btn btn-primary">
            {{ car.id ? "Save" : "Create" }}
          </button>
        </div>
      </form>
    </template>
  </ProfileModal>
</template>


<script>
import { ref } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import { profilesService } from "../services/ProfilesService";
import Pop from "../utils/Pop";
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
import { watchEffect } from "@vue/runtime-core";

export default {
  props: {
    // profile: {
    //   type: Profile,
    //   default: () => new profile(),
    // },
  },
  setup(props) {
    const router = useRouter();
    const editable = ref({});

    // watchEffect is a method that runs anytime any of its values change
    watchEffect(() => {
      editable.value = { ...props.profile };
    });

    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            await profilesService.edit(editable.value);
          } else {
            await profilesService.create(editable.value);
          }
          // if successful close modal
          Modal.getOrCreateInstance(
            document.getElementById("profile-modal")
          ).hide();
          router.push({
            name: "Profile",
            params: { id: AppState.profile.id },
          });
          // change route to car details for this new car
        } catch (error) {
          logger.error(error);
          Pop.toast("Failed to Create", "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>