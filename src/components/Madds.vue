<template>
  <div class="row">
    <div class="col-12">
      <!-- <div v-for="madds in madds.banner" :key="madds"> -->
      <img :src="madds" class="img-fluid" />
      My adds should be here, but they are not
      <!-- </div> -->
    </div>
  </div>
</template>


<script>
import { computed, onMounted, reactive } from "@vue/runtime-core";
import { maddsService } from "../services/MaddsService";
import { AppState } from "../AppState";

export default {
  //props: { madds: { type: Object } },
  setup(props) {
    const state = reactive({ madds: computed(() => AppState.madds.banner) });
    onMounted(() => {
      maddsService.getMadd();
    });
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>