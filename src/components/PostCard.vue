<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      grid
      :rows="props.message"
      :columns="props.fields"
      :filter="props.filter"
      hide-header
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  props: Object
})

</script>
