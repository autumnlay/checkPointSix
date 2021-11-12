<template class="posts row">
  <div class="card col-10 p-4 my-2 shadow">
    <p>
      <img
        class="profileImg img-fluid p-1"
        :src="post.creator.picture"
        alt=""
      />
      {{ post.creator.name }}
    </p>
    <img class="img-fluid" :src="post.imgUrl" />

    <h4>{{ post.body }}</h4>
  </div>
</template>
<script>
export default {
  props: { post: { type: Object, required: true } },
  setup(props) {
    return {};
  },
};
</script>
<style>
.profileImg {
  border-radius: 50%;
  /* border: 1px solid #ddd; */
  width: 80px;
  height: 80px;
}
.profileImg:hover {
  box-shadow: 0 0 3px 1px rgba(2, 21, 27, 0.5);
}
</style>