import { defineStore } from 'pinia';
import {ref} from "vue";
import _ from "lodash";
import axios from "axios";

export const useListStore = defineStore('list', () => {


  const getData = async () => {
    try {
      console.log("ciao")
      const {data: result} = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );

      return result;
    } catch (e) {
      alert(e.message);
      console.log(JSON.stringify(e));
    }
  };
  const list = ref(getData());

  return { getData, list }
});
