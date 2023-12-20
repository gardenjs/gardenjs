export default {
  name: 'GardenSvelteButton',
  description: './garden_button.svelte.md',
  file: './garden_button.svelte',
  in: [{ name: 'name', type: 'String' }],
  out: [{ name: 'click', type: 'String' }],
  examples: [
    {
      story: 'with text',
      input: {
        name: 'GardenButton',
      },
    },
    { story: 'no text', input: {} },
  ],
}
