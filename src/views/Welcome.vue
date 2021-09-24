<template>
  <div class="welcome container">
    <p>welcome</p>
    <div v-if="showLogin">
      <SignupForm @signup="enterChat" />
      <p>Already registered? <span @click="showLogin = false">Sign in</span></p>
    </div>
    <div v-else>
      <LoginForm @login="enterChat" />
      <p>No account yet? <span @click="showLogin = true">Sign up</span></p>
    </div>
  </div>
</template>

<script>
import SignupForm from "../components/SignupForm.vue";
import LoginForm from "../components/LoginForm.vue";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

export default {
  components: { SignupForm, LoginForm },

  setup() {
    const showLogin = ref(true);

    const router = useRouter();

    const enterChat = () => {
      router.push({ name: "Chatroom" });
    };

    return { showLogin, enterChat };
  },
};
</script>

<style>
.welcome {
  text-align: center;
  padding: 2rem 0;
}
/* form styles */
.welcome form {
  width: 30rem;
  margin: 2rem auto;
}
.welcome label {
  display: block;
  margin: 2rem 0 10px;
}

.welcome input {
  width: 100%;
  padding: 1rem;
  border-radius: 20px;
  border: 1px solid #eee;
  outline: none;
  color: #999;
  margin: 1rem auto;
}
.welcome span {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
.welcome button {
  margin: 2rem auto;
}
</style>
