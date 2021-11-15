<template>
  <div class="row">
    <div class="col-12">
      <img :src="madds" class="img-fluid" />
      hey madds
    </div>
  </div>
</template>


<script>
export default {
  props: { madds: { type: Array } },
  setup() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>