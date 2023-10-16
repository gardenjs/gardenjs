<script setup>
import { componentMap } from '../component_import_map.js'
import { ref, watch } from 'vue'
import { state } from './state.js'

const component = ref()

watch(state, (newState) => {
  component.value = componentMap[newState.componentName]
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
