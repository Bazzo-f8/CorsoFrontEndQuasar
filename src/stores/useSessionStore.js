import { defineStore } from 'pinia';
import {ref} from "vue";

export const useSessionStore = defineStore('session', () => {
  const user = ref({
    id: 0,
    name: "",
    email: "",
    password: "",
    likes: []
  })
  const userId = ref(user.value.id);
  const login = (...obj) => {
    user.value = obj;
  }
  const logout = () => {
    user.value = {
      id: 0,
      name: "",
      email: "",
      password: "",
      likes: []};
  }

  const isLogged = () => {
    return (user.value.id > 0);
  }


  return { userId, login, logout, isLogged}
}, {
  persist: true
});
