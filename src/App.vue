<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <verify-code-input
    @completed="complete"
    class="huerify"
    count-inputs="5"
  ></verify-code-input>
</template>

<script>
import VerifyCodeInput from "./components/VerifyCodeInput";

export default {
  name: "App",
  components: {
    VerifyCodeInput,
  },
  methods: {
    complete(verifyCode) {
      console.log(verifyCode);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
