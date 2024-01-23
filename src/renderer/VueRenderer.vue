<script setup>
import { computed, onMounted } from 'vue'

const props = defineProps([
  'selectedExample',
  'das',
  'componentName',
  'componentMap',
  'afterRenderHook',
])

const component = computed(() => {
  return props.componentMap?.[props.componentName]
})

onMounted(async () => {
  await props.afterRenderHook()
})
</script>

<template>
  <component
    v-if="component"
    :is="component"
    v-bind="{ ...props.selectedExample.input }"
  />
  <h1 v-else>Ups</h1>
</template>
