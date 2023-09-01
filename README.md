# Component library explorer

Garden is a lightweight UI explorer for JavaScript frontend libraries that helps you build, test and display UI components and pages. Svelte, Vue and React are currently supported out of the box. Other libraries can also be easily connected to Garden.
<br><br>

## This is Garden

Garden is the showroom for what you grow. The explorer represents each component of your design system in isolation. The different states of the components are also shown. Garden is developed for JavaScript frontend projects of any size. Code changes are reflected at the speed of light by the build tool Vite. Garden is an MIT-licensed open source project.
<br><br>

## Getting Started (Examples for Svelte)

Install Garden inside your project root with NPM: [not yet, now: instead: checkout garden in garden base folder: 'npm link' or 'sudo npm link']

```console
npm install --save-dev garden
```

[not yet ...]
Follow the installation routine.

In the root directory you will now find your Garden configuration file 'garden.config.js' to adapt Garden to your project.
[... not yet!]

Svelte example configuration for your garden.config.js file:

```js
{
  "garden": {
    "serverport": 3010,
    "destination": "garden/",
    "structure": {
      "custom": {
        "components": "/src/components/"
      }
    },
    "watch": {
      "directories": [
        "./src"
      ],
      "include": [
        ".svelte", ".das.json", ".scss", ".css", ".js"
      ]
    }
  }
}
```

Add those directories to "structure" > "custom" that are to be displayed on the first level of the Garden Navigation.

### Initialize Garden

Initialize Garden in the root of the project directory:

```bash
run initGarden
```

### Run Garden

Run `serveGarden` from the root of the project. Or add it to your `package.json` there and run it via `npm run garden` :

```json
  "scripts": {
    "garden": "serveGarden",
  },
```

### Configure Garden with project-specific settings

With the garden.config.js you have various options to customize Garden to suit your project. Take a look at the file for a quick overview of the options already implemented. Here you can also make your own individual adjustments with JavaScript, e.g. to switch between your different themes.

### Open Garden

Open Garden in the browser via `http://localhost:<serverport>/garden`. The server port is defined in `garden.config.js`, the default setting is 3010.
<br><br>

## Output of components (and pages), add variants or states and add a documentation/description

In order to be able to output variants or states of components, you must create two additional files in the component directory:

With a `<component>.example.svelte` file you create all variants/states of the component. It then looks like this, for example:

```js
<script>
  import Button from './<component>.svelte'

  export let story
</script>

{#if story == 'story_1'}
<!-- code example -->

{:else if story == 'story_2'}
<!-- code example -->

{:else if story == 'story_3'}
<!-- code example -->

{/if}
```

Create a file `<component>.das.js` so that the variants/states are output in the panel and the navigation below the stage.

A description or documentation for the component can also be added here. This is shown in a separate tab in the panel. This text can also be created as markdown. Alternatively, a path can point to a markdown file, which is then rendered in the tab. The suffix <.md> triggers the linking.

It then looks like this, for example:

```js
export default {
  name: "<component>",
  file: "./<component>.example.svelte",
  description: "./<component>.md",
  examples: [
    {story: "<navigation title for story_1>", input: {story: "story_1"}},
    {story: "<navigation title for story_2>", input: {story: "story_2"}},
    {story: "<navigation title for story_3>", input: {story: "story_3"}},
  ]
}
```

<br>

## License

MIT
<br><br>

## Todo´s

### v1.0

* [feature] Collapse/expand panel button in sidebar and close btn in panel nav.
* [refactor] Move logic to own file. Handle user interaction.
* [task] Restructure and divide garden server and component server.
* [task] Remove express server, use iframe instead.
* [task] Add garden as dist with compiled js & scss files (vite?).
* [task] Make Garden compatible with Vue & React.
* [task] Public garden demo of project/marketing website.
* [task] Install script / commandline skeleton project (example component).
* [task] Set repository of project/marketing website public
* [task] Rabbit dev website.
* [task] Set garden repository public & make garden npm modul. (yarn?)

### v1.1

* [feature] Docker image for screenshot test.
* [task] Make garden docs link optional via garden.config.js.
* [feature] Show custom favicon.svg configured in garden.config.js.
* [feature] Screenshot test: automatic create test file & and folder (like init garden).
* [feature] Screenshot test: settings.
* [feature] switch from md to mdx.
* [task] Set stagesize values for "mobile, tablet, desktop" inside garden.config.js.
* [task] Integrate Svelte A11y features.
* [task] Improve Garden for smaller displays:
  * Sidebarnav is closed by default on narrow display devices.
  * ...
* [feature] Vertical dragbar to drag stage horizontical to show rwd behaviour. Already integrated staticly, just needs to be commented out in topbar.svelte: Show 'px' width/height of stage next to rwd-navi.
* [task] Build kickstarter "carrots". Define components for carrots.

<br><br><br><p align="center"><img src="src/assets/icons/logo.svg"></p>
