<template>
  <div>
    <div class="col-12 d-flex justify-content-center">
      <div class="p-2" v-for="a in madds" :key="a">
        <img :src="a.banner" class="img-fluid rounded shadow" />
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, reactive } from "@vue/runtime-core";
import { maddsService } from "../services/MaddsService";
import { AppState } from "../AppState";

export default {
  props: { madds: { type: Object } },
  setup(props) {
    const state = reactive({ madds: computed(() => AppState.madds.banner) });
    onMounted(() => {
      maddsService.getMadd(props);
    });
    return {
      madds: computed(() => AppState.madds),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>