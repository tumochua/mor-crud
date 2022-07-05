<template>
  <button :class="[dark ? 'dark' : 'light', 'baseBtn']">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  name: "CustomBtn",
  props: {
    buttonText: {
      type: String,
      default: "button",
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
};
</script>

<style scoped>
.baseBtn {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 6px;
}
.light {
  color: #fff;
  background-color: #3f51b5;
}
.dark {
  background: #d9534f;
  color: white;
}
</style>
