import { reactive } from 'vue'

export const state = reactive({ selectedExample: 'FOO' })

export function updateVueState({ selectedExample, das, componentName }) {
  state.selectedExample = selectedExample
  state.das = das
  state.componentName = componentName
}
