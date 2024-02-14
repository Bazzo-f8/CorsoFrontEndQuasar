<template>
  <q-card class="my-card">
    <q-item>
      <q-item-section>
        <q-item-label>Title</q-item-label>
      </q-item-section>
    </q-item>
    <img src="https://cdn.quasar.dev/img/mountains.jpg">

    <q-card-section>
      <div class="text-h6">userId = {{ record.userId }}</div>
      <div class="text-subtitle2"> {{ record.title }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ record.body }}
    </q-card-section>
  </q-card>
</template>

<script setup>

import axios from "axios";
import {onBeforeMount, ref, watch} from "vue";
import {useRoute} from "vue-router";
import _ from "lodash";

const record = ref({})
const route = useRoute()
const userData = ref()

const getPosts = async () => {
  try {
    const {data: result} = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${route.params.postId}`
    );

    record.value = result;
  } catch (e) {
    alert(e.message);
    console.log(JSON.stringify(e));
  }
};

/*watch(
  () => route.params.postId,
  async newId => {
    userData.value = await fetchUser(newId)
  }
)*/

onBeforeMount(() => {
  getPosts();
  console.log(record);
});

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 800px
</style>
