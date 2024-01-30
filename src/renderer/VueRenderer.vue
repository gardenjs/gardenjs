<script setup>
import { onMounted } from 'vue'

const props = defineProps([
  'selectedExample',
  'das',
  'component',
  'afterRenderHook',
])

onMounted(async () => {
  await props.afterRenderHook()
})
</script>

<template>
  <component
    v-if="props.component"
    :is="props.component"
    v-bind="{ ...props.selectedExample.input }"
  />
  <h1 v-else>No Component selected!</h1>
</template>
