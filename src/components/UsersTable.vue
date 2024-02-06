

<template>
  <div class="q-pa-md">
    <q-table
      :loading="loading"
      :columns="columns.value"
      :rows="rows"
      :grid="false"

    />
  </div>
</template>

<script setup>
import _ from "lodash";
import { ref } from "vue";

defineProps({
  fields: {
    type: Array,
    required: true,
    default: () => [],
  },
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const columns = ref(fields)
const seed = ref(items)

let rows = [];
for (let i = 0; i < 1000; i++) {
  rows = rows.concat(seed.value.slice(0).map((r) => ({ ...r })));
}
rows.forEach((row, index) => {
  row.index = index;
});

const pagination = ref({
  rowsPerPage: 0,
});
</script>
