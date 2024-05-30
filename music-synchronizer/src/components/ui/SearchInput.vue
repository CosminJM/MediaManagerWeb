<template>
  <q-toolbar class="bg-primary text-white">
    <q-input
      :label="label"
      color="white"
      dark
      borderless
      v-model="searchText"
      input-class="text-middle"
      class="q-ml-md"
    >
      <template #append>
        <q-icon v-if="searchText === ''" name="search" />
        <q-icon
          v-else
          name="clear"
          class="cursor-pointer"
          @click="searchText = ''"
        />
      </template>
    </q-input>
  </q-toolbar>
</template>

<script>
export default {
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
  },
  computed: {
    searchText: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>
