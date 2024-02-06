<template>
  <q-page padding>
    <div class="q-pa-xs">
      <div class="q-pa-md">
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <div class="q-gutter-y-md">
          <q-btn-toggle
            v-model="isGrid"
            spread
            class="my-custom-toggle"
            no-caps
            rounded
            unelevated
            toggle-color="primary"
            color="white"
            text-color="primary"
            :options="[
          {label: 'Grid', value: false},
          {label: 'List', value: true}
        ]"
          />
        </div>
      </div>
    </div>
    <div v-if="!isGrid">
      <q-table
        :rows="message"
        :columns="fields"
        :grid="false"
        :filter="filter"
      />
    </div>

    <div v-if="isGrid">
      <PostCard :props="{message, fields, filter}"/>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import PostCard from "../components/PostCard.vue";
//import api from "../boot/axios.js";
import axios from "axios";


const message = ref([]);
const fields = ref([
  { name: "index", label: "#", field: "index" },
  { name: "userId", label: "Userd Id", field: "userId" },
  { name: "id", label: "id", field: "id" },
  { name: "title", label: "Title", field: "title", align: "left" },
  { name: "body", label: "Body", field: "body", align: "left"  },
]);

const filter = ref('');
const isGrid = ref(false);

const getPosts = async () => {
  try {
    const { data: result } = await axios.get("https://jsonplaceholder.typicode.com/posts");

    message.value = result;
  } catch (e) {
    alert(e.message);
    console.log(JSON.stringify(e));
  }
};

const changeMode = computed((state) => {
  return state === "grid" ? this.isGrid = true : this.isGrid = false
})

onMounted(() => {
  getPosts();
});

/**
 * { "userId": 1,
 * "id": 1,
 * "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
 * "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto" }
 */
</script>
