<template>
  <q-page class="flex flex-center">
    <router-link to="/posts"
      ><q-btn push color="primary" label="Posts" size="xl"
    /></router-link>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>
