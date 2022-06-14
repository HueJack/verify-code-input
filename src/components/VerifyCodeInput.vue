<template>
  <div>
    <div class="verify-code-inputs">
      <div
        class="verify-code-inputs-item"
        v-for="item of inputs"
        :key="item.id"
      >
        <input
          type="text"
          class="verify-code-input"
          :data-id="item.id"
          :value="item.value"
          @focusin="selectedInputIndex = item.id"
          v-focus="selectedInputIndex === item.id"
          @input.prevent="inputValue"
          @keydown.delete="removeValue"
          @paste="paste"
        />
      </div>
    </div>

    <div class="debug-info">
      <div>ver: 1.8</div>
      <span>Элемент в фокусе: {{ selectedInputIndex }}</span>
      <div>Готов {{ isComplete() }}</div>
      <div v-html="logs"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    countInputs: {
      type: String,
      require: true,
      default: "4",
    },
  },
  emits: ["completed"],
  data() {
    return {
      inputs: [],
      selectedInputIndex: 0,
      skipWatchByInputs: true,
      log: [],
    };
  },
  directives: {
    focus(el, binding) {
      if (binding.value) {
        el.focus();
      }
    },
  },
  created() {
    for (let i = 0; i < this.countInputs; i++) {
      this.inputs.push({ value: "", id: i });
    }
  },
  computed: {
    logs() {
      let r = "";
      for (let item of this.log) {
        r += "<br>" + Object.entries(item);
      }

      return r;
    },
  },

  methods: {
    inputValue(e) {
      this.setValue(e.target);
    },
    setValue(target) {
      let value = target.value,
        indexInput = target.dataset.id;

      if (value.length > 1) {
        value = value.charAt(1);
      }

      if (!this.validate(value)) {
        this.inputs[indexInput].value = target.value = "";

        return false;
      }

      this.inputs[indexInput].value = target.value = value;

      this.incrementInputIndex();

      this.complete();
    },
    paste(e) {
      let text = e.clipboardData.getData("text").split("");

      for (let index in text) {
        if (Number(index) > this.countInputs - 1) {
          break;
        }

        this.selectedInputIndex = index;

        this.setValue(text[index]);
      }
    },
    removeValue(e) {
      console.log("Keydown Delete");
      if (e.key === "Backspace") {
        this.decrementInputIndex();
      }

      this.inputs[this.selectedInputIndex].value = "";
    },
    validate(value) {
      let test = new RegExp(/([a-z]|[A-Z])/);

      return test.test(value);
    },
    incrementInputIndex() {
      if (this.selectedInputIndex < this.countInputs - 1) {
        this.selectedInputIndex++;
      }
    },
    decrementInputIndex() {
      if (this.selectedInputIndex > 0) {
        this.selectedInputIndex--;
      }
    },
    complete() {
      if (this.isComplete()) {
        this.$emit("completed", this.inputs.map((item) => item.value).join(""));
      }
    },
    isComplete() {
      return this.inputs.every((item) => item.value.length == 1);
    },
  },
};
</script>

<style scoped>
.verify-code-inputs {
  display: flex;
  justify-content: center;
}

.verify-code-inputs-item {
  margin: 0 8px;
  width: 30px;
  height: 30px;
}

.verify-code-input {
  max-width: 100%;

  min-height: 100%;
  text-align: center;
}
</style>
