<template>
  <form >
      <textarea @keypress.enter.prevent="handleSubmit" placeholder="Type your message and hit enter here" v-model="message"></textarea>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import getUser from '../composables/getUser'
import { timestamp } from '../firebase/config'

export default {
    setup() {
        const message = ref('')
        const { user } = getUser()

        const handleSubmit = async () => {
            const chat = {
                name: user.value.displayName,
                message: message.value,
                cteatedAt: timestamp()
            }

            console.log(chat)
            message.value = ''
        }

        return { message, handleSubmit }
    }

}
</script>

<style>

</style>