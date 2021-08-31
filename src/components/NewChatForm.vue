<template>
  <form>
    <textarea
      @keypress.enter.prevent="handleSubmit"
      placeholder="Type your message and hit enter here"
      v-model="message"
    ></textarea>
  </form>
  <div class="error">{{ error }}</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import getUser from "../composables/getUser";
import useCollection from "../composables/useCollection";
import { timestamp } from "../firebase/config";
import arr from "../composables/getWord";

export default {
  setup() {
    const message = ref("");
    const { user } = getUser();
    const { addDoc, error } = useCollection("messages");

    const handleSubmit = async () => {
      function getRandomArbitrary() {
        const num = Math.trunc(Math.random() * arr.length);
        return arr[num];
      }

      let finalMessage = "";
      if (message.value === "") return;
      finalMessage = message.value;

      if (message.value.includes(",")) {
        const temp = finalMessage.split(",").map((el, i, array) => {
          if (i < array.length - 1) return `${el}, ${getRandomArbitrary()},`;
          else return el;
        });
        finalMessage = temp.join(" ");
      }

      if (message.value.includes("!")) {
        const temp = finalMessage.split("!").map((el, i, array) => {
          if (i < array.length - 1) return `${el}, ${getRandomArbitrary()}!`;
          else return el;
        });
        finalMessage = temp.join(" ");
      }
      if (message.value.includes("?")) {
        finalMessage = `${finalMessage.replaceAll(
          "?",
          ""
        )}, ${getRandomArbitrary()}?`;
      }
      if (message.value.includes(".")) {
        const temp = finalMessage.split(".").map((el, i, array) => {
          if (i < array.length - 1) return `${el}, ${getRandomArbitrary()}.`;
          else return el;
        });
        finalMessage = temp.join(" ");
      }
      ///
      const chat = {
        name: user.value.displayName,
        message: finalMessage,
        createdAt: timestamp(),
      };

      await addDoc(chat);
      if (!error.value) {
        message.value = "";
      }
    };

    return { message, handleSubmit, error };
  },
};
</script>

<style scoped lang="scss">
form {
  margin: 10px;
}
textarea {
  width: 100%;
  max-width: 100%;
  margin-bottom: 6px;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  font-family: inherit;
  outline: none;
}
</style>
