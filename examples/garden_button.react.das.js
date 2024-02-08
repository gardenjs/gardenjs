export default {
  name: 'GardenReactButton',
  file: './garden_button.react.jsx',
  description: './garden_button.react.md',
  in: [{ name: 'name', type: 'String' }],
  out: [{ name: 'click', type: 'String' }],
  examples: [
    {
      title: 'with text',
      input: {
        name: 'GardenButton',
      },
    },
    { title: 'no text', input: { name: '' } },
  ],
}
