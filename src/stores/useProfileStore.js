import { defineStore } from 'pinia';
import {ref} from "vue";
import _ from "lodash";

export const useProfileStore = defineStore('profiles', () => {
  const users = ref([{
    id: 1,
    name: "marco",
    email: "marcorossi@yahooh.it",
    password: "ciaociao",
    likes: []
  }]);

  const userStartSession = (email, pass) => {
    var user = users.value.find((t) => { return t.email === email})
    if(typeof user === "undefined"){
      return 0;
    }
    if(user.password === pass){
      return user;
    }
    return -1;

  }

  const getUserById = (id) => {
    return _.find(users, function(o) { return o.id === id });
  }

  const updateUserById = (id, obj) => {
    return a.id === id ? obj : a;
  }


  return { userStartSession }
});
