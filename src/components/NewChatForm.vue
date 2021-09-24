<template>
  <form>
    <input type="radio" id="regular" value="regular" v-model="mode" />
    <input type="radio" id="hard" value="hard" v-model="mode" />
    <input type="radio" id="soft" value="soft" v-model="mode" />
    <span> {{ mode }} mode</span>
    <textarea
      @keypress.enter.prevent="handleSubmit"
      placeholder="Type your message and hit enter here"
      v-model="message"
    >
    </textarea>
    <button class="sendButton" type="submit" @click.prevent="handleSubmit">
      Send
    </button>

    <div class="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import getUser from "../composables/getUser";
import useCollection from "../composables/useCollection";
import { timestamp } from "../firebase/config";
import arr from "../composables/getWord";
import arr2 from "../composables/getGoodWord";

export default {
  setup() {
    const message = ref("");
    const { user } = getUser();
    const { addDoc, error } = useCollection("messages");
    const mode = ref("regular");

    const handleSubmit = async () => {
      function getRandomWordFromArray() {
        if (mode.value === "hard") {
          const num = Math.trunc(Math.random() * arr.length);
          return arr[num];
        }
        if (mode.value === "soft") {
          const num = Math.trunc(Math.random() * arr2.length);
          return arr2[num];
        }
      }
      let finalMessage = "";
      if (message.value === "") return;
      finalMessage = message.value;

      if (mode.value !== "regular") {
        if (message.value.includes(",")) {
          const temp = finalMessage.split(",").map((el, i, array) => {
            if (i < array.length - 1)
              return `${el}, ${getRandomWordFromArray()},`;
            else return el;
          });
          finalMessage = temp.join(" ");
        }

        if (message.value.includes("!")) {
          const temp = finalMessage.split("!").map((el, i, array) => {
            if (i < array.length - 1)
              return `${el}, ${getRandomWordFromArray()}!`;
            else return el;
          });
          finalMessage = temp.join(" ");
        }
        if (message.value.includes("?")) {
          finalMessage = `${finalMessage.replaceAll(
            "?",
            ""
          )}, ${getRandomWordFromArray()}?`;
        }
        if (message.value.includes(".")) {
          const temp = finalMessage.split(".").map((el, i, array) => {
            if (i < array.length - 1)
              return `${el}, ${getRandomWordFromArray()}.`;
            else return el;
          });
          finalMessage = temp.join(" ");
        }
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

    return { message, handleSubmit, error, mode };
  },
};
</script>

<style scoped lang="scss">
.sendButton {
  position: absolute;
  right: 0;
}
form {
  position: relative;
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
