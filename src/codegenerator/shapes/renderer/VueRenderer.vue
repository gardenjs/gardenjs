<script setup>
import { componentMap } from '../component_import_map.js'
import { computed } from 'vue'
import { state } from './state.js'

const component = computed(() => {
  return componentMap[state.componentName]
})
</script>

<template>
  <component
    v-if="component"
    :is="component"
    v-bind="{ ...state.selectedExample.input }"
  />
  <h1 v-else>Ups</h1>
</template>
