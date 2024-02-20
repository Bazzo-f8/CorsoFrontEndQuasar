<template>
  <q-page class="flex flex-center">
    <router-link to="/posts"
      ><q-btn push color="primary" label="Posts" size="xl"
    /></router-link>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
/*import _ from "lodash";

let arr = [{user: "ciao"}]

let ciao = _.find(arr, function(o) { return o.user === "bau"; });
console.log(ciao)*/
export default defineComponent({
  name: "IndexPage",
});
</script>
