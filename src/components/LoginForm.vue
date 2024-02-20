<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        type="email"
        v-model="email"
        label="Your email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Password"
        lazy-rules
        :rules="[
          val => val && val.length > 7 || 'Please enter a min of 8 char'
        ]"
      />

      <q-toggle v-model="accept" label="vendo i miei dati"/>

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
      </div>
    </q-form>

  </div>
</template>

<script setup>
import {useQuasar} from 'quasar'
import {ref} from 'vue'
import {useRouter} from "vue-router";
import {useSessionStore} from "stores/useSessionStore";
import {useProfileStore} from "stores/useProfileStore";


const log = useProfileStore();
const session = useSessionStore();
const router = useRouter();

const $q = useQuasar()

const email = ref(null)
const password = ref(null)
const accept = ref(false)

const onSubmit = () => {
  const result = log.userStartSession(email.value, password.value);
  console.log(result)
  if (accept.value !== true || typeof result === "number") {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Wrong field'
    })
  } else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    })

    session.login(result)
    router.push({
      name: "home"
    })
  }
}

const onReset = () => {
  email.value = null
  password.value = null
  accept.value = false
}

/*

export default {
  setup () {
    const $q = useQuasar()

    const email = ref(null)
    const password = ref(null)
    const accept = ref(false)

    return {
      email,
      password,
      accept,

      onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })


          router.push({
            name: "/"
          })
        }
      },

      onReset () {
        email.value = null
        password.value = null
        accept.value = false
      }
    }
  }
}
*/
</script>
