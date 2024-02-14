<template>
  <q-page padding>
    <div class="q-pa-xs">
      <div class="q-pa-md">
        <q-input
          v-model="filter"
          borderless
          debounce="300"
          dense
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>

        <div class="q-gutter-y-md">
          <q-btn-toggle
            v-model="isGrid"
            :options="[
              { label: 'Grid', value: false },
              { label: 'List', value: true },
            ]"
            class="my-custom-toggle"
            color="white"
            no-caps
            rounded
            spread
            text-color="primary"
            toggle-color="primary"
            unelevated
          />
        </div>
      </div>
    </div>
    <q-table
      :columns="fields"
      :filter="filter"
      :grid="isGrid"
      :rows="message"
      @row-click="onRowClick"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
    />
  </q-page>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import {useRouter} from 'vue-router';
//import PostCard from "../components/PostCard.vue";
//import api from "../boot/axios.js";
import axios from "axios";

const router = useRouter();
const message = ref([]);
const fields = ref([
  {name: "index", label: "#", field: "index"},
  {name: "userId", label: "Userd Id", field: "userId"},
  {name: "id", label: "id", field: "id"},
  {name: "title", label: "Title", field: "title", align: "left"},
  {name: "body", label: "Body", field: "body", align: "left"},
]);

const filter = ref("");
const isGrid = ref(false);

const onRowClick = (event, row, index) => {
  postDetail(row)
};

const postDetail = (post) => {
  //console.log(post.id)
  router.push({
    name: "post-detail",
    params: {
      postId: post.id
    }
  })
}
const getPosts = async () => {
  try {
    const {data: result} = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    message.value = result;
  } catch (e) {
    alert(e.message);
    console.log(JSON.stringify(e));
  }
};

onBeforeMount(() => {
  getPosts();
});



const selected = ref([])



const getSelectedString =  () => {
    return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${message.value.length}`
  }

/**
 * { "userId": 1,
 * "id": 1,
 * "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
 * "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto" }
 */
</script>
