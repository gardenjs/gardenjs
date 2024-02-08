export default {
  name: 'GardenSvelteButton',
  description: './garden_button.svelte.md',
  file: './garden_button.svelte',
  in: [{ name: 'name', type: 'String' }],
  out: [{ name: 'click', type: 'String' }],
  examples: [
    {
      title: 'with text',
      input: {
        name: 'GardenButton',
      },
    },
    { title: 'no text', input: {} },
  ],
}
