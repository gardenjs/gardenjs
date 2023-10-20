import { reactive } from 'vue'

export const state = reactive({ selectedExample: 'FOO' })

export function updateVueState({ selectedExample, das, componentName }) {
  console.log('DEBUG', 'update vue state', das, componentName)
  state.selectedExample = selectedExample
  state.das = das
  state.componentName = componentName
}
